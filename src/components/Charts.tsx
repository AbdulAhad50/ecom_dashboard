import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  TrendingUp,
  Globe,
  Package,
  Users,
  CreditCard,
  Activity,
} from "lucide-react";
import {
  aggregateByRegion,
  aggregateByCategory,
  aggregateByMonth,
  getTopProducts,
  getTopSalesReps,
  getSegmentDistribution,
  getPaymentDistribution,
  getStatusDistribution,
  Transaction,
} from "../data/ecommerceData";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#f43f5e",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#f97316",
  "#84cc16",
  "#6366f1",
];

const PIE_COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#f43f5e",
  "#8b5cf6",
  "#06b6d4",
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900/95 border border-slate-700 rounded-xl px-4 py-3 shadow-2xl backdrop-blur-xl">
      <p className="text-slate-300 text-sm font-medium mb-1.5">{label}</p>
      {payload.map((entry: any, idx: number) => (
        <div key={idx} className="flex items-center gap-2 text-xs">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-400">{entry.name}:</span>
          <span className="text-white font-semibold">
            {entry.name?.toLowerCase().includes("revenue") ||
            entry.name?.toLowerCase().includes("profit")
              ? `$${entry.value?.toLocaleString()}`
              : entry.value?.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

function ChartCard({
  title,
  icon: Icon,
  children,
  delay = 0,
  className = "",
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`rounded-2xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-xl overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2.5 px-5 pt-5 pb-2">
        <div className="p-1.5 rounded-lg bg-blue-500/10">
          <Icon size={16} className="text-blue-400" />
        </div>
        <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
      </div>
      <div className="px-2 pb-2">{children}</div>
    </motion.div>
  );
}

export function RevenueByRegionChart({ data }: { data: Transaction[] }) {
  const chartData = aggregateByRegion(data);
  return (
    <ChartCard title="Revenue by Region" icon={Globe} delay={0.15}>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={{ stroke: "#334155" }}
            tickLine={false}
            angle={-20}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Revenue" />
          <Bar dataKey="profit" fill="#10b981" radius={[6, 6, 0, 0]} name="Profit" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function MonthlyTrendChart({ data }: { data: Transaction[] }) {
  const chartData = aggregateByMonth(data);
  return (
    <ChartCard title="Monthly Revenue & Profit Trend" icon={TrendingUp} delay={0.2}>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={{ stroke: "#334155" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 11, color: "#94a3b8" }}
            iconType="circle"
            iconSize={8}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={2.5}
            fill="url(#revGrad)"
            name="Revenue"
          />
          <Area
            type="monotone"
            dataKey="profit"
            stroke="#10b981"
            strokeWidth={2.5}
            fill="url(#profGrad)"
            name="Profit"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function TopProductsChart({ data }: { data: Transaction[] }) {
  const chartData = getTopProducts(data, 5);
  return (
    <ChartCard title="Top 5 Products by Revenue" icon={Package} delay={0.25}>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "#94a3b8", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={130}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="revenue" radius={[0, 6, 6, 0]} name="Revenue">
            {chartData.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function CategoryDistributionChart({ data }: { data: Transaction[] }) {
  const chartData = aggregateByCategory(data);
  return (
    <ChartCard title="Revenue by Category" icon={Activity} delay={0.3}>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="revenue"
            nameKey="name"
            stroke="none"
          >
            {chartData.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 11, color: "#94a3b8" }}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function SegmentDistributionChart({ data }: { data: Transaction[] }) {
  const chartData = getSegmentDistribution(data);
  return (
    <ChartCard title="Revenue by Customer Segment" icon={Users} delay={0.35}>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
            stroke="none"
          >
            {chartData.map((_, idx) => (
              <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 11, color: "#94a3b8" }}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function PaymentMethodChart({ data }: { data: Transaction[] }) {
  const chartData = getPaymentDistribution(data);
  return (
    <ChartCard title="Orders by Payment Method" icon={CreditCard} delay={0.4}>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={{ stroke: "#334155" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} name="Orders">
            {chartData.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function SalesRepChart({ data }: { data: Transaction[] }) {
  const chartData = getTopSalesReps(data, 8);
  return (
    <ChartCard title="Top Sales Representatives" icon={Users} delay={0.45} className="lg:col-span-2">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={{ stroke: "#334155" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="revenue" radius={[6, 6, 0, 0]} name="Revenue" fill="#8b5cf6" />
          <Bar dataKey="orders" radius={[6, 6, 0, 0]} name="Orders" fill="#06b6d4" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function OrderStatusChart({ data }: { data: Transaction[] }) {
  const chartData = getStatusDistribution(data);
  return (
    <ChartCard title="Order Status Distribution" icon={Activity} delay={0.5}>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
            nameKey="name"
            stroke="none"
          >
            {chartData.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 11, color: "#94a3b8" }}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
