import { fetchPlans } from "@/api/planApi";
import {
  changePlanTenant,
  createTenant,
  deleteTenant,
  fetchTenants,
  updateTenant,
} from "@/api/tenantApi";
import DeleteAlertDialog from "@/components/DeleteAlertDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetch from "@/hooks/useFetch";
import { EditTenantModal } from "@/layouts/admin/EditTenantModal";
import { AddTenantModal } from "@/layouts/admin/AddTenantModal";
import { formatDate } from "@/utils/dateFormatter";
import { getStatusBadge } from "@/utils/getBadges";
import { toast } from "sonner";
import { ChangePlanTenantModal } from "@/layouts/admin/ChangePlanTenantModal";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import LoadingRow from "@/components/LoadingRow";
import { Trash2 } from "lucide-react";
import { isSoonExpired } from "@/utils/isSoonExpired";

export default function Tenants() {
  const {
    data: tenants,
    setData: setTenants,
    loading,
  } = useFetch(fetchTenants);
  const { data: plans } = useFetch(fetchPlans);

  const handleCreateTenant = async (tenantData) => {
    try {
      const newTenant = await createTenant(tenantData);
      setTenants((prev) => [newTenant, ...prev]);
      toast.success("Tenant added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add tenant");
    }
  };

  const handleUpdateTenant = async (tenantData) => {
    try {
      const updated = await updateTenant(tenantData._id, tenantData);
      setTenants((prev) =>
        prev.map((tenant) => (tenant._id === updated._id ? updated : tenant))
      );
      toast.success("Tenant updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update tenant");
      console.error(error);
    }
  };
  const handleChangePlanTenant = async (tenantData) => {
    try {
      const updated = await changePlanTenant(tenantData._id, tenantData);
      setTenants((prev) =>
        prev.map((tenant) => (tenant._id === updated._id ? updated : tenant))
      );
      toast.success("Tenant updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update tenant");
    }
  };

  const handleDeleteTenant = async (id) => {
    try {
      await deleteTenant(id);
      setTenants((prev) => prev.filter((tenant) => tenant._id !== id));
      toast.success("Tenant deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete tenant");
    }
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Tenant Management</h1>
          <AddTenantModal plans={plans} onAdd={handleCreateTenant} />
        </div>
        <p className="text-muted-foreground mt-2">
          Manage kindergarten tenants and subscriptions
        </p>
      </div>

      <Card className="max-w-267">
        <CardHeader>
          <CardTitle>Subscription Management</CardTitle>
          <CardDescription>
            Manage user subscriptions, limits, and account status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Info</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Subscription Period</TableHead>
                <TableHead>Limits</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <LoadingRow />
              ) : (
                tenants.map((tenant) => (
                  <TableRow
                    key={tenant._id}
                    className={
                      tenant.status === "trial"
                        ? "bg-chart-2/15"
                        : isSoonExpired(tenant.endSubscription)
                        ? "bg-destructive/15"
                        : "bg-primary/15"
                    }
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{tenant.name}</div>
                        <div className="text-sm text-muted-foreground">
                          @{tenant.username}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{tenant.email}</div>
                        <div className="text-sm text-muted-foreground">
                          {tenant.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(tenant.status)}</TableCell>
                    <TableCell>{tenant.plan?.name}</TableCell>
                    <TableCell>{formatCurrencyDZD(tenant?.amount)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Start:</span>{" "}
                          {formatDate(tenant.startSubscription)}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">End:</span>{" "}
                          {formatDate(tenant.endSubscription)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="min-w-40">
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <div>
                          <span className="text-muted-foreground">
                            Students:
                          </span>{" "}
                          {tenant.limits.students}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Users:</span>{" "}
                          {tenant.limits.users}
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Classes:
                          </span>{" "}
                          {tenant.limits.classes}
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Categories:
                          </span>{" "}
                          {tenant.limits.categories}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <EditTenantModal
                        tenant={tenant}
                        onSave={handleUpdateTenant}
                      />
                      <ChangePlanTenantModal
                        tenant={tenant}
                        plans={plans}
                        onSave={handleChangePlanTenant}
                      />
                      <DeleteAlertDialog
                        trigger={<Trash2 />}
                        item={tenant._id}
                        onDelete={handleDeleteTenant}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
