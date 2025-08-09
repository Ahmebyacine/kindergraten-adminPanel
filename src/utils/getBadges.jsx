import { Badge } from "@/components/ui/badge"

export const getStatusBadge = (status) => {
  const variants = {
    active: "default",
    suspended: "destructive",
    trial: "secondary",
  }

  return (
    <Badge variant={variants[status] || "default"}>
      {status?.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}