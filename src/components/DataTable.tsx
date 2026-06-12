import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Download,
  Table,
} from "lucide-react";
import { Transaction } from "../data/ecommerceData";
import * as XLSX from "xlsx";

type SortKey = keyof Transaction;
type SortDir = "asc" | "desc";

interface DataTableProps {
  data: Transaction[];
}

export default function DataTable({ data }: DataTableProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const totalPages = Math.ceil(data.length / pageSize);

  const sorted = [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    }
    return sortDir === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
    setPage(1);
  };

  const SortIcon = ({ colKey }: { colKey: SortKey }) => {
    if (sortKey !== colKey) return <ArrowUpDown size={12} className="text-slate-600" />;
    return sortDir === "asc" ? (
      <ArrowUp size={12} className="text-blue-400" />
    ) : (
      <ArrowDown size={12} className="text-blue-400" />
    );
  };

  const exportToExcel = () => {
    const exportData = data.map((d) => ({
      "Order ID": d.id,
      Date: d.date,
      Region: d.region,
      Country: d.country,
      Category: d.category,
      Product: d.product,
      Quantity: d.quantity,
      "Unit Price": d.unitPrice,
      Revenue: d.revenue,
      Cost: d.cost,
      Profit: d.profit,
      "Profit Margin %": d.profitMargin,
      "Customer Segment": d.customerSegment,
      "Payment Method": d.paymentMethod,
      "Discount %": d.discount,
      "Shipping Cost": d.shippingCost,
      "Order Status": d.orderStatus,
      "Sales Rep": d.salesRep,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "E-Commerce Data");
    XLSX.writeFile(wb, "ecommerce_dashboard_data.xlsx");
  };

  const statusColors: Record<string, string> = {
    Delivered: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Shipped: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    Processing: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    Cancelled: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    Returned: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  };

  const columns: { key: SortKey; label: string; width: string }[] = [
    { key: "id", label: "Order ID", width: "w-32" },
    { key: "date", label: "Date", width: "w-24" },
    { key: "region", label: "Region", width: "w-32" },
    { key: "product", label: "Product", width: "w-48" },
    { key: "category", label: "Category", width: "w-32" },
    { key: "quantity", label: "Qty", width: "w-16" },
    { key: "revenue", label: "Revenue", width: "w-24" },
    { key: "profit", label: "Profit", width: "w-24" },
    { key: "profitMargin", label: "Margin", width: "w-20" },
    { key: "orderStatus", label: "Status", width: "w-24" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="rounded-2xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-xl overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/60">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-500/10">
            <Table size={16} className="text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Transaction Data</h3>
            <p className="text-xs text-slate-500">{data.length.toLocaleString()} records</p>
          </div>
        </div>
        <button
          onClick={exportToExcel}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all text-sm font-medium"
        >
          <Download size={14} />
          Export Excel
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-700/60 bg-slate-900/30">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`${col.width} px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-200 transition-colors select-none`}
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    <SortIcon colKey={col.key} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, idx) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.015 }}
                className="border-b border-slate-800/50 hover:bg-slate-700/20 transition-colors"
              >
                <td className="px-4 py-2.5 text-xs font-mono text-slate-400">{row.id}</td>
                <td className="px-4 py-2.5 text-xs text-slate-300">{row.date}</td>
                <td className="px-4 py-2.5 text-xs text-slate-300">{row.region}</td>
                <td className="px-4 py-2.5 text-xs text-slate-200 font-medium truncate max-w-[180px]">
                  {row.product}
                </td>
                <td className="px-4 py-2.5 text-xs text-slate-400">{row.category}</td>
                <td className="px-4 py-2.5 text-xs text-slate-300">{row.quantity}</td>
                <td className="px-4 py-2.5 text-xs text-emerald-400 font-medium">
                  ${row.revenue.toLocaleString()}
                </td>
                <td className="px-4 py-2.5 text-xs text-blue-400 font-medium">
                  ${row.profit.toLocaleString()}
                </td>
                <td className="px-4 py-2.5 text-xs text-amber-400">{row.profitMargin}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                      statusColors[row.orderStatus] || "bg-slate-700 text-slate-400 border-slate-600"
                    }`}
                  >
                    {row.orderStatus}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {paginated.length === 0 && (
        <div className="py-16 text-center text-slate-500 text-sm">No records found matching your filters.</div>
      )}

      <div className="flex items-center justify-between px-5 py-3 border-t border-slate-700/60">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">
            Page {page} of {totalPages}
          </span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="bg-slate-900/60 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50"
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-xs text-slate-500">per page</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronsLeft size={14} />
          </button>
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft size={14} />
          </button>

          <div className="flex items-center gap-0.5 mx-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                    page === pageNum
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight size={14} />
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronsRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
