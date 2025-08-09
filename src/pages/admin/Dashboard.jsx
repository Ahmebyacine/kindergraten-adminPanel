import { CardReceive, Money2, TicketExpired, TickSquare } from "iconsax-react";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import StatCard from "@/components/StatCard";
import useFetch from "@/hooks/useFetch";
import TenantsByPlanChart from "@/layouts/admin/TenantsByPlanChart";
import { TenantsByStatusPie } from "@/layouts/admin/TenantsByStatusChart";
import { fetchDashboardStats } from "@/api/tenantApi";

export default function Dashboard() {
  const { data, loading, error } = useFetch(fetchDashboardStats);
  const stats = [
    {
      title: "Number of shared kindergartens",
      value: `${data?.tenants || 0} kindergraten`,
      icon: TickSquare,
      iconColor: "#7008E7",
      bgColor: "bg-[#EDE9FE]",
      subLabel: "Currently active kindergartens on the system",
    },
    {
      title: "Current monthly income",
      value: formatCurrencyDZD(data?.monthIncome || 0),
      icon: CardReceive,
      iconColor: "#00C951",
      bgColor: "bg-[#B9F8CF]",
      subLabel: "Subscriptions renewed this month.",
    },
    {
      title: "Current yearly income",
      value: formatCurrencyDZD(data?.yearIncome || 0),
      icon: Money2,
      iconColor: "#00A6F4",
      bgColor: "bg-[#A2F4FD]",
      subLabel: "Subscriptions renewed this year.",
    },
    {
      title: "Kindergartens in need of renovation",
      value: `${data?.expired || 0} kindergraten`,
      icon: TicketExpired,
      iconColor: "#FB2C36",
      bgColor: "bg-[#FFC9C9]",
      subLabel: "Her subscriptions have expired and have not been renewed.",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array(4)
              .fill(null)
              .map((_, idx) => (
                <StatCard key={idx} loading={loading} error={error} />
              ))
          : stats.map((stat, idx) => <StatCard key={idx} stat={stat} />)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TenantsByPlanChart />
        <TenantsByStatusPie />
      </div>
    </div>
  );
}
