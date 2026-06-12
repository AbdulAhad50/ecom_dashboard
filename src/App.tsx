import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  Percent,
  Truck,
  Activity,
  RefreshCw,
} from "lucide-react";
import {
  allData,
  getFilteredData,
  calculateKPIs,
  getDateRange,
} from "./data/ecommerceData";
import KPICard from "./components/KPICard";
import FilterBar from "./components/FilterBar";
import {
  RevenueByRegionChart,
  MonthlyTrendChart,
  TopProductsChart,
  CategoryDistributionChart,
  SegmentDistributionChart,
  PaymentMethodChart,
  SalesRepChart,
  OrderStatusChart,
} from "./components/Charts";
import DataTable from "./components/DataTable";

interface Filters {
  dateFrom: string;
  dateTo: string;
  regions: string[];
  categories: string[];
  segments: string[];
  statuses: string[];
  searchQuery: string;
}

export default function App() {
  const [filters, setFilters] = useState<Filters>({
    dateFrom: "",
    dateTo: "",
    regions: [],
    categories: [],
    segments: [],
    statuses: [],
    searchQuery: "",
  });

  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredData = useMemo(() => getFilteredData(allData, filters), [filters]);
  const kpis = useMemo(() => calculateKPIs(filteredData), [filteredData]);
  const { minDate, maxDate } = useMemo(() => getDateRange(allData), []);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <BarChart3 size={24} className="text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                E-Commerce Analytics
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time dashboard · {allData.length.toLocaleString()} transactions · {filteredData.length.toLocaleString()} filtered
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-400">
              <Activity size={12} className="text-emerald-400" />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-400 hover:text-white hover:border-slate-500 transition-all disabled:opacity-50"
            >
              <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
            </button>
          </div>
        </motion.header>

        {/* Filters */}
        <FilterBar filters={filters} onChange={setFilters} minDate={minDate} maxDate={maxDate} />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-6">
          <KPICard
            title="Total Revenue"
            value={kpis.totalRevenue}
            prefix="$"
            icon={DollarSign}
            color="emerald"
            delay={0}
            format="currency"
          />
          <KPICard
            title="Total Profit"
            value={kpis.totalProfit}
            prefix="$"
            icon={TrendingUp}
            color="blue"
            delay={100}
            format="currency"
          />
          <KPICard
            title="Total Orders"
            value={kpis.totalOrders}
            icon={ShoppingCart}
            color="violet"
            delay={200}
          />
          <KPICard
            title="Avg Order Value"
            value={kpis.avgOrderValue}
            prefix="$"
            icon={Package}
            color="amber"
            delay={300}
            format="currency"
          />
          <KPICard
            title="Profit Margin"
            value={kpis.avgProfitMargin}
            suffix="%"
            icon={Percent}
            color="rose"
            delay={400}
            format="percent"
          />
          <KPICard
            title="Units Sold"
            value={kpis.totalQuantity}
            icon={Package}
            color="cyan"
            delay={500}
          />
          <KPICard
            title="Shipping Cost"
            value={kpis.totalShipping}
            prefix="$"
            icon={Truck}
            color="orange"
            delay={600}
            format="currency"
          />
          <KPICard
            title="Active Customers"
            value={kpis.uniqueCustomers}
            icon={Users}
            color="pink"
            delay={700}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <RevenueByRegionChart data={filteredData} />
          <MonthlyTrendChart data={filteredData} />
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <TopProductsChart data={filteredData} />
          <CategoryDistributionChart data={filteredData} />
          <SegmentDistributionChart data={filteredData} />
        </div>

        {/* Charts Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <PaymentMethodChart data={filteredData} />
          <SalesRepChart data={filteredData} />
          <OrderStatusChart data={filteredData} />
        </div>

        {/* Data Table */}
        <DataTable data={filteredData} />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 py-6 border-t border-slate-800 text-center"
        >
          <p className="text-xs text-slate-600">
            E-Commerce Analytics Dashboard · Built with React, Recharts & Tailwind CSS · {allData.length.toLocaleString()} records
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
