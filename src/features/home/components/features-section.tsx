"use client";
import { Activity, Map as MapIcon, MessageCircle } from "lucide-react";
import DottedMap from "dotted-map";
import { Area, AreaChart, CartesianGrid } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function FeaturesSection() {
  return (
    <section className="mb-24 px-4">
      <div className="mx-auto grid max-w-7xl border md:grid-cols-2">
        <div>
          <div className="p-6 sm:p-12">
            <span className="text-muted-foreground flex items-center gap-2">
              <MapIcon className="size-4" />
              Global Investment Network
            </span>

            <p className="mt-8 text-2xl font-semibold">
              Support Ukrainian businesses, build international partnerships.
            </p>
          </div>

          <div aria-hidden className="relative">
            <div className="absolute inset-0 z-10 m-auto size-fit">
              <div className="bg-background dark:bg-muted relative z-10 flex size-fit w-fit items-center gap-2 rounded-2xl border px-3 py-1 text-xs font-medium shadow-md shadow-zinc-950/5">
                <span className="text-lg">🇺🇦</span> Latest investment: Kyiv,
                Ukraine
              </div>
              <div className="bg-background absolute inset-2 -bottom-2 mx-auto rounded-2xl border px-3 py-4 text-xs font-medium shadow-md shadow-zinc-950/5 dark:bg-zinc-900"></div>
            </div>

            <div className="relative overflow-hidden">
              <div className="to-background absolute inset-0 z-1 bg-radial from-transparent to-75%" />
              <Map />
            </div>
          </div>
        </div>

        <div className="overflow-hidden border-t bg-zinc-50 p-6 sm:p-12 md:border-0 md:border-l dark:bg-transparent">
          <div className="relative z-10">
            <span className="text-muted-foreground flex items-center gap-2">
              <MessageCircle className="size-4" />
              Investor & Business Support
            </span>

            <p className="my-8 text-2xl font-semibold">
              Connect directly with businesses and track your investments.
            </p>
          </div>

          <div aria-hidden className="flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs">
                  Tue 15 Apr
                </span>
              </div>
              <div className="bg-background mt-1.5 w-3/5 rounded-2xl border p-3 text-xs">
                Hello, we are looking for partners to rebuild our factory.
              </div>
            </div>

            <div>
              <div className="bg-primary mb-1 ml-auto w-3/5 rounded-2xl p-3 text-xs text-white">
                Thank you! We are interested in supporting your project.
              </div>
              <span className="text-muted-foreground block text-right text-xs">
                Now
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-full border-y p-12">
          <p className="text-center text-4xl font-semibold lg:text-7xl">
            Empower Recovery. Share Success.
          </p>
        </div>

        <div className="relative col-span-full">
          <div className="absolute z-10 max-w-lg px-6 pt-6 pr-12 md:px-12 md:pt-12">
            <span className="text-muted-foreground flex items-center gap-2">
              <Activity className="size-4" />
              Investment Activity
            </span>

            <p className="my-8 text-2xl font-semibold">
              Monitor project funding and dividend returns in real-time.{" "}
              <span className="text-muted-foreground">
                Transparent. Fast. Impactful.
              </span>
            </p>
          </div>
          <MonitoringChart />
        </div>
      </div>
    </section>
  );
}

const map = new DottedMap({ height: 55, grid: "diagonal" });

map.addPin({
  lat: 50.4501,
  lng: 30.5234,
  svgOptions: { color: "#ff0000", radius: 1 },
});

const points = map.getPoints();

const svgOptions = {
  backgroundColor: "var(--color-background)",
  color: "currentColor",
  radius: 0.15,
};

const Map = () => {
  const viewBox = `0 0 120 60`;
  return (
    <svg viewBox={viewBox} style={{ background: svgOptions.backgroundColor }}>
      {points.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={point.svgOptions?.radius ?? svgOptions.radius}
          fill={point.svgOptions?.color ?? svgOptions.color}
        />
      ))}
    </svg>
  );
};

const chartConfig = {
  investments: {
    label: "Investments",
    color: "#ff4030",
  },
  returns: {
    label: "Dividends",
    color: "rgba(255,111,97,0.51)",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "November", investments: 100, returns: 10 },
  { month: "December", investments: 200, returns: 25 },
  { month: "January", investments: 350, returns: 50 },
  { month: "February", investments: 500, returns: 90 },
  { month: "March", investments: 800, returns: 160 },
  { month: "April", investments: 1200, returns: 250 },
];

const MonitoringChart = () => {
  return (
    <ChartContainer className="aspect-auto h-120 md:h-96" config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 0,
          right: 0,
        }}
      >
        <defs>
          <linearGradient id="fillInvestments" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-investments)"
              stopOpacity={0.8}
            />
            <stop
              offset="55%"
              stopColor="var(--color-investments)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillReturns" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-returns)"
              stopOpacity={0.8}
            />
            <stop
              offset="55%"
              stopColor="var(--color-returns)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <ChartTooltip
          active
          cursor={false}
          content={<ChartTooltipContent className="dark:bg-muted" />}
        />
        <Area
          strokeWidth={2}
          dataKey="returns"
          type="stepBefore"
          fill="url(#fillReturns)"
          fillOpacity={0.1}
          stroke="var(--color-returns)"
          stackId="a"
        />
        <Area
          strokeWidth={2}
          dataKey="investments"
          type="stepBefore"
          fill="url(#fillInvestments)"
          fillOpacity={0.1}
          stroke="var(--color-investments)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};
