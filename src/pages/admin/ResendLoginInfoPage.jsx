import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resendTenantMail } from "@/api/tenantApi";
import { toast } from "sonner";

export default function ResendLoginInfoPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleResendTenantMail = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await resendTenantMail(email);
      setMessage(response.message);
      toast.success("Login info sent successfully");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to resend login info";
      setError(msg);
      toast.error(msg);
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center">
            Resend Login Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResendTenantMail} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
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
              {loading ? "Sending..." : "Send Login Info"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
