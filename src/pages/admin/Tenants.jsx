import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Tenants() {
  const [filters, setFilters] = useState({
    status: "all",
    startDate: "",
    endDate: "",
    page: 1,
    limit: 10,
  });

  const {
    data: tenantsResponse,
    loading,
    refetch,
  } = useFetch(() => fetchTenants(filters));

  const tenants = tenantsResponse?.data || [];
  const pagination = tenantsResponse?.pagination || {};

  const { data: plans } = useFetch(fetchPlans);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    refetch(() => fetchTenants(newFilters));
  };

  const handlePageChange = (newPage) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);
    refetch(() => fetchTenants(newFilters));
  };

  const handleCreateTenant = async (tenantData) => {
    try {
      await createTenant(tenantData);
      refetch(() => fetchTenants(filters));
      toast.success("Tenant added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add tenant");
    }
  };

  const handleUpdateTenant = async (tenantData) => {
    try {
      await updateTenant(tenantData._id, tenantData);
      refetch(() => fetchTenants(filters));
      toast.success("Tenant updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update tenant");
    }
  };

  const handleChangePlanTenant = async (tenantData) => {
    try {
      await changePlanTenant(tenantData._id, tenantData);
      refetch(() => fetchTenants(filters));
      toast.success("Tenant updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update tenant");
    }
  };

  const handleDeleteTenant = async (id) => {
    try {
      await deleteTenant(id);
      refetch(() => fetchTenants(filters));
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

      {/* Filters */}
      <div className="mb-4 grid grid-cols-4 gap-3">
        <Select
          value={filters.status}
          onValueChange={(v) => handleFilterChange("status", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="trial">Trial</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={filters.startDate}
          onChange={(e) => handleFilterChange("startDate", e.target.value)}
        />

        <Input
          type="date"
          value={filters.endDate}
          onChange={(e) => handleFilterChange("endDate", e.target.value)}
        />

        <Button
          variant="outline"
          onClick={() => {
            setFilters({
              status: "all",
              startDate: "",
              endDate: "",
              page: 1,
              limit: 10,
            });
            refetch(() =>
              fetchTenants({
                status: "all",
                startDate: "",
                endDate: "",
                page: 1,
                limit: 10,
              })
            );
          }}
        >
          Reset Filters
        </Button>
      </div>

      <Card>
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
              ) : tenants.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No tenants found.
                  </TableCell>
                </TableRow>
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
                        <div>Students: {tenant.limits.students}</div>
                        <div>Users: {tenant.limits.users}</div>
                        <div>Classes: {tenant.limits.classes}</div>
                        <div>Categories: {tenant.limits.categories}</div>
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

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <Button
          disabled={filters.page === 1}
          onClick={() => handlePageChange(filters.page - 1)}
        >
          Previous
        </Button>

        <div>
          Page {pagination.page} of {pagination.totalPages || 1}
        </div>

        <Button
          disabled={filters.page >= (pagination.totalPages || 1)}
          onClick={() => handlePageChange(filters.page + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
}
