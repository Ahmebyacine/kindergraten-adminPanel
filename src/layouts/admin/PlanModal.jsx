import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Zod schema for plan validation
const planSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  currency: z.enum(["DZD", "USD", "EUR"]),
  limits: z.object({
    students: z.number().min(1, "Minimum students limit is 1"),
    users: z.number().min(1, "Minimum users limit is 1"),
    classes: z.number().min(1, "Minimum classes limit is 1"),
    categories: z.number().min(1, "Minimum categories limit is 1"),
  }),
  isActive: z.boolean(),
});

export function PlanModal({ trigger, plan, onSubmit }) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: "",
      price: 0,
      currency: "DZD",
      limits: {
        students: 60,
        users: 5,
        classes: 3,
        categories: 2,
      },
      isActive: true,
    },
  });

  // Reset form when plan changes or dialog opens/closes
  useEffect(() => {
    if (open) {
      if (plan) {
        form.reset({
          name: plan.name,
          price: plan.price,
          currency: plan.currency,
          limits: { ...plan.limits },
          isActive: plan.isActive,
        });
      } else {
        form.reset({
          name: "",
          price: 0,
          currency: "DZD",
          limits: {
            students: 60,
            users: 5,
            classes: 3,
            categories: 2,
          },
          isActive: true,
        });
      }
    }
  }, [plan, open, form]);

  const handleFormSubmit = (data) => {
    if (plan) {
      onSubmit({
        ...plan,
        ...data,
        name: data.name.trim(),
      });
    } else {
      onSubmit({
        ...data,
        name: data.name.trim(),
      });
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{plan ? "Edit Plan" : "Create New Plan"}</DialogTitle>
          <DialogDescription>
            {plan
              ? "Update the plan details below"
              : "Fill in the details to create a new subscription plan"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4"
          >
            <div className="grid gap-4">
              {/* Plan Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="name">Plan Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="name"
                        placeholder="e.g., Basic, Standard, Premium"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                {/* Price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="price">Price</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="price"
                          type="number"
                          min="0"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Currency */}
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="currency">Currency</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DZD">
                            Algerian Dinar (DZD)
                          </SelectItem>
                          <SelectItem value="USD">US Dollar (USD)</SelectItem>
                          <SelectItem value="EUR">Euro (EUR)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Plan Limits */}
              <div className="space-y-3">
                <Label>Plan Limits</Label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Students Limit */}
                  <FormField
                    control={form.control}
                    name="limits.students"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="students">Students</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="students"
                            type="number"
                            min="1"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Users Limit */}
                  <FormField
                    control={form.control}
                    name="limits.users"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="users">Users</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="users"
                            type="number"
                            min="1"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Classes Limit */}
                  <FormField
                    control={form.control}
                    name="limits.classes"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="classes">Classes</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="classes"
                            type="number"
                            min="1"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Categories Limit */}
                  <FormField
                    control={form.control}
                    name="limits.categories"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="categories">Categories</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="categories"
                            type="number"
                            min="1"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Active Plan Switch */}
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        id="isActive"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel htmlFor="isActive">Plan is active</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {plan ? "Update Plan" : "Create Plan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
