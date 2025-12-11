import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formatDate } from "@/utils/dateFormatter";
import { Edit } from "lucide-react";

// Zod schema for validation
const tenantSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().optional(),
  status: z.enum(["active", "trial", "suspended"], {
    errorMap: () => ({ message: "Select a status" }),
  }),
  amount: z.coerce.number().optional(),
  endSubscription: z.string().optional(),
  limits: z.object({
    students: z.coerce.number().min(0),
    users: z.coerce.number().min(0),
    classes: z.coerce.number().min(0),
    categories: z.coerce.number().min(0),
  }),
});

export function EditTenantModal({ tenant, onSave }) {
  const [open, setOpen] = useState(false);
  const formatDateForInput = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };
  const form = useForm({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      ...tenant,
      endSubscription: formatDateForInput(tenant.endSubscription),
      limits: { ...tenant.limits },
    },
  });

  const onSubmit = async (values) => {
    await onSave({ ...tenant, ...values });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="underline">
          <Edit className="hidden md:block" />
          <span className="md:hidden">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Tenant</DialogTitle>
          <DialogDescription>
            Make changes to the tenant information. Username and start
            subscription cannot be modified.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-h-[65vh] overflow-y-auto"
          >
            {/* Grid layout for inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Username (read-only) */}
              <div>
                <Label>Username</Label>
                <Input value={tenant.username} disabled className="bg-muted" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" value={tenant.email} disabled className="bg-muted" />
              </div>

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="trial">Trial</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">Amount:*</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Start Subscription (read-only) */}
              <div>
                <Label>Start Date</Label>
                <Input
                  value={formatDate(tenant.startSubscription)}
                  disabled
                  className="bg-muted"
                />
              </div>

              {/* End Subscription */}
              <FormField
                control={form.control}
                name="endSubscription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Limits Section */}
            <div>
              <Label className="text-sm font-medium">Limits</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {["students", "users", "classes", "categories"].map((limit) => (
                  <FormField
                    key={limit}
                    control={form.control}
                    name={`limits.${limit}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize">{limit}</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>
          </form>
        </Form>

        {/* Actions */}
        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={!form.formState.isDirty}
            onClick={form.handleSubmit(onSubmit)}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
