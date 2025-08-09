import { fetchTenantCount } from "@/api/planApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/useFetch";
import { Chart1, Danger } from "iconsax-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export default function TenantsByPlanChart() {
  const { data, loading, error } = useFetch(fetchTenantCount);

  const rows = [
    { label: "Basic Plan", count: 12 },
    { label: "Pro Plan", count: 25 },
    { label: "Enterprise Plan", count: 8 },
    { label: "Custom Plan", count: 5 },
  ];

  const barColors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
  ];

  const chartConfig = {
    tenantCount: {
      label: "Tenants",
    },
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Tenants by Plan</CardTitle>
        <CardDescription>Current plan distribution</CardDescription>
      </CardHeader>
      {error ? (
        <CardContent className="flex flex-col items-center justify-center py-12 px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="rounded-full text-destructive bg-muted">
              <Danger size={36} color="currentColor" />
              <h3 className="text-lg font-medium text-destructive">
                {error?.status}
              </h3>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-destructive">
                An error occurred while loading data.
              </h3>
              <p className="text-sm text-destructive max-w-sm">
                {error?.message}
              </p>
            </div>
          </div>
        </CardContent>
      ) : loading ? (
        <div className="space-y-4 mx-4">
          <Skeleton className="h-4 w-full rounded-xl" />
          <Skeleton className="h-70 w-full rounded-xl" />
          <div className="flex space-x-4">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ) : data?.length === 0 ? (
        <CardContent className="flex flex-col items-center justify-center py-12 px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="rounded-full text-muted-foreground bg-muted">
              <Chart1 size={36} color="currentColor" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">
                No data available
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                No attendance data was found for the specified period. Please
                try again later.
              </p>
            </div>
          </div>
        </CardContent>
      ) : (
        <CardContent className="h-[320px] overflow-x-auto">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={250}>
              <BarChart data={data} margin={{ left: 12, right: 12 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="planName"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  height={48}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis allowDecimals={false} width={36} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="tenantCount" radius={[4, 4, 0, 0]}>
                  {rows.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={barColors[index % barColors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
}
