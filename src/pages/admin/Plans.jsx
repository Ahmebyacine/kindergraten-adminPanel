import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import { PlanModal } from "@/layouts/admin/PlanModal";
import DeleteAlertDialog from "@/components/DeleteAlertDialog";
import { toast } from "sonner";
import useFetch from "@/hooks/useFetch";
import { createPlan, deletePlan, fetchPlans, updatePlan } from "@/api/planApi";
import Loading from "../common/Loading";

export default function Plans() {
  const { data: plans, setData: setPlans, loading } = useFetch(fetchPlans);

  const handleCreatePlan = async (planData) => {
    try {
      const newPlan = await createPlan(planData);
      setPlans((prev) => [newPlan, ...prev]);
      toast.success("Adding successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add plan");
    }
  };

  const handleUpdatePlan = async (planData) => {
    try {
      const updated = await updatePlan(planData._id, planData);
      setPlans((prev) =>
        prev.map((plan) => (plan._id === updated._id ? updated : plan))
      );
      toast.success("The plan updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update plan");
    }
  };

  const handleDeletePlan = async (id) => {
    try {
      await deletePlan(id);
      setPlans((prev) => prev.filter((plan) => plan._id !== id));
      toast.success("The plan deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete plan");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subscription Plans</h1>
          <p className="text-muted-foreground">
            Manage your subscription plans and pricing
          </p>
        </div>
        <PlanModal
          onSubmit={handleCreatePlan}
          trigger={
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Plan
            </Button>
          }
        />
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan._id}
            className="p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>{plan.name}</CardTitle>
                <Badge variant={plan.isActive ? "default" : "secondary"}>
                  {plan.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <CardDescription>
                Created: {new Date(plan.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-semibold">
                {formatCurrencyDZD(plan.price, plan.currency)}
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>Students: {plan?.limits?.students}</div>
                <div>Users: {plan?.limits?.users}</div>
                <div>Classes: {plan?.limits?.classes}</div>
                <div>Categories: {plan?.limits?.categories}</div>
              </div>
            </CardContent>
            <CardFooter>
              <CardAction>
                <PlanModal
                  plan={plan}
                  onSubmit={handleUpdatePlan}
                  trigger={
                    <Button variant="ghost" size="sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  }
                />
                <DeleteAlertDialog
                  item={plan._id}
                  onDelete={handleDeletePlan}
                />
              </CardAction>
            </CardFooter>
          </Card>
        ))}
      </div>
      {plans.length === 0 && (
        <div>
          <Card className="p-8 text-center border-dashed border-2">
            <CardContent className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">No plans found</h3>
                <p className="text-muted-foreground">
                  Get started by creating your first subscription plan
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
