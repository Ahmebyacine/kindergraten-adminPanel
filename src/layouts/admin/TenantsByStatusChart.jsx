import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fetchTenantsStats } from "@/api/tenantApi";
import useFetch from "@/hooks/useFetch";
import { Chart1, Danger } from "iconsax-react";
import { Skeleton } from "@/components/ui/skeleton";


export function TenantsByStatusPie() {
  const { data, loading, error } = useFetch(fetchTenantsStats);

  // Chart config with colors & labels
  const chartConfig = {
    tenants: { label: "Tenants" },
    active: { label: "Active", color: "var(--chart-4)" },
    trial: { label: "Trial", color: "var(--chart-3)" },
    suspend: { label: "Suspended", color: "var(--chart-2)" },
    expired: { label: "Expired", color: "var(--chart-1)" },
  };

  // Transform rows into pie chart data
  const chartData = Object.keys(data).map((key) => ({
    status: chartConfig[key].label,
    tenants: data[key],
    fill: chartConfig[key].color,
  }));
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Tenants by Status</CardTitle>
        <CardDescription>Current status distribution</CardDescription>
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
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="tenants"
                nameKey="status"
                stroke="0"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      )}
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium"></div>
        <div className="text-muted-foreground leading-none">
          Showing current tenants grouped by status
        </div>
      </CardFooter>
    </Card>
  );
}
