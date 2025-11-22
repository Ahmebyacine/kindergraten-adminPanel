import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateTenantEmail } from "@/api/tenantApi";
import { toast } from "sonner";

export default function UpdateTenantEmailPage() {
  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleUpdateEmail = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await updateTenantEmail({ oldEmail, newEmail });

      setMessage(response.message);
      toast.success("Email updated successfully");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update email";
      setError(msg);
      toast.error(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center">Update Tenant Email</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleUpdateEmail} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Old Email</label>
              <Input
                type="email"
                value={oldEmail}
                onChange={(e) => setOldEmail(e.target.value)}
                placeholder="Enter old email"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">New Email</label>
              <Input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {message && (
              <p className="text-green-600 text-sm text-center">{message}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Updating..." : "Update Email"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
