import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  X,
  Calendar,
  MapPin,
  Tag,
  Users,
  Package,
  Search,
  ChevronDown,
  RotateCcw,
  CalendarDays,
} from "lucide-react";
import {
  regionsList,
  categoriesList,
  segmentsList,
  statusesList,
} from "../data/ecommerceData";

interface Filters {
  dateFrom: string;
  dateTo: string;
  regions: string[];
  categories: string[];
  segments: string[];
  statuses: string[];
  searchQuery: string;
}

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  minDate: string;
  maxDate: string;
}

function MultiSelectDropdown({
  label,
  icon: Icon,
  options,
  selected,
  onChange,
  color,
}: {
  label: string;
  icon: React.ElementType;
  options: string[];
  selected: string[];
  onChange: (vals: string[]) => void;
  color: string;
}) {
  const [open, setOpen] = useState(false);

  const toggle = (val: string) => {
    if (selected.includes(val)) {
      onChange(selected.filter((v) => v !== val));
    } else {
      onChange([...selected, val]);
    }
  };

  const colorMap: Record<string, string> = {
    blue: "border-blue-500/30 text-blue-400 hover:border-blue-400/50",
    emerald: "border-emerald-500/30 text-emerald-400 hover:border-emerald-400/50",
    amber: "border-amber-500/30 text-amber-400 hover:border-amber-400/50",
    rose: "border-rose-500/30 text-rose-400 hover:border-rose-400/50",
    violet: "border-violet-500/30 text-violet-400 hover:border-violet-400/50",
  };

  const checkboxColors: Record<string, string> = {
    blue: "#3b82f6",
    emerald: "#10b981",
    amber: "#f59e0b",
    rose: "#f43f5e",
    violet: "#8b5cf6",
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl border bg-slate-800/60 backdrop-blur-sm text-sm transition-all duration-200 ${
          selected.length > 0
            ? colorMap[color]
            : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300"
        }`}
      >
        <Icon size={14} />
        <span className="hidden sm:inline">{label}</span>
        {selected.length > 0 && (
          <span className="bg-slate-700 text-white text-xs px-1.5 py-0.5 rounded-md">
            {selected.length}
          </span>
        )}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 mt-2 w-64 max-h-72 overflow-y-auto rounded-xl border border-slate-700 bg-slate-800/95 backdrop-blur-xl shadow-2xl z-50 p-2"
            >
              {options.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors"
                >
                  <div
                    className="w-4 h-4 rounded border flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: selected.includes(opt)
                        ? checkboxColors[color]
                        : "transparent",
                      borderColor: selected.includes(opt)
                        ? checkboxColors[color]
                        : "#64748b",
                    }}
                  >
                    {selected.includes(opt) && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selected.includes(opt)}
                    onChange={() => toggle(opt)}
                  />
                  <span className="text-sm text-slate-300">{opt}</span>
                </label>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FilterBar({ filters, onChange, minDate, maxDate }: FilterBarProps) {
  const [showPresets, setShowPresets] = useState(false);

  const activeCount =
    (filters.dateFrom ? 1 : 0) +
    (filters.dateTo ? 1 : 0) +
    filters.regions.length +
    filters.categories.length +
    filters.segments.length +
    filters.statuses.length +
    (filters.searchQuery ? 1 : 0);

  const dateActive = !!(filters.dateFrom || filters.dateTo);

  const resetFilters = () => {
    onChange({
      dateFrom: "",
      dateTo: "",
      regions: [],
      categories: [],
      segments: [],
      statuses: [],
      searchQuery: "",
    });
  };

  const setDateRange = (from: string, to: string) => {
    onChange({ ...filters, dateFrom: from, dateTo: to });
  };

  const presets = [
    { label: "Jan", from: "2024-01-01", to: "2024-01-31" },
    { label: "Feb", from: "2024-02-01", to: "2024-02-29" },
    { label: "Mar", from: "2024-03-01", to: "2024-03-31" },
    { label: "Apr", from: "2024-04-01", to: "2024-04-30" },
    { label: "May", from: "2024-05-01", to: "2024-05-31" },
    { label: "Jun", from: "2024-06-01", to: "2024-06-30" },
    { label: "Jul", from: "2024-07-01", to: "2024-07-31" },
    { label: "Aug", from: "2024-08-01", to: "2024-08-31" },
    { label: "Sep", from: "2024-09-01", to: "2024-09-30" },
    { label: "Oct", from: "2024-10-01", to: "2024-10-31" },
    { label: "Nov", from: "2024-11-01", to: "2024-11-30" },
    { label: "Dec", from: "2024-12-01", to: "2024-12-31" },
  ];

  const quarterPresets = [
    { label: "Q1", from: "2024-01-01", to: "2024-03-31" },
    { label: "Q2", from: "2024-04-01", to: "2024-06-30" },
    { label: "Q3", from: "2024-07-01", to: "2024-09-30" },
    { label: "Q4", from: "2024-10-01", to: "2024-12-31" },
  ];

  const isPresetActive = (from: string, to: string) =>
    filters.dateFrom === from && filters.dateTo === to;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-50 rounded-2xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-xl p-4 mb-6"
    >
      <div className="flex flex-col gap-4">
        {/* Top row: filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-slate-300 mr-2">
              <Filter size={16} className="text-blue-400" />
              <span className="text-sm font-semibold">Filters</span>
              {activeCount > 0 && (
                <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full font-medium">
                  {activeCount} active
                </span>
              )}
            </div>

            {/* Date Range */}
            <div className="flex items-center gap-2">
              <Calendar size={14} className={dateActive ? "text-blue-400" : "text-slate-500"} />
              <div className={`flex items-center gap-1.5 rounded-xl border px-2 py-1.5 transition-all ${
                dateActive
                  ? "border-blue-500/40 bg-blue-500/10"
                  : "border-slate-700 bg-slate-900/60"
              }`}>
                <input
                  type="date"
                  min={minDate}
                  max={maxDate}
                  value={filters.dateFrom}
                  onChange={(e) => onChange({ ...filters, dateFrom: e.target.value })}
                  className="bg-transparent text-xs text-slate-300 focus:outline-none w-[110px]"
                />
                <span className="text-slate-500 text-xs">→</span>
                <input
                  type="date"
                  min={minDate}
                  max={maxDate}
                  value={filters.dateTo}
                  onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
                  className="bg-transparent text-xs text-slate-300 focus:outline-none w-[110px]"
                />
                {dateActive && (
                  <button
                    onClick={() => onChange({ ...filters, dateFrom: "", dateTo: "" })}
                    className="p-0.5 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              <button
                onClick={() => setShowPresets(!showPresets)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs transition-all ${
                  showPresets
                    ? "border-blue-500/40 bg-blue-500/10 text-blue-400"
                    : "border-slate-700 bg-slate-900/60 text-slate-400 hover:border-slate-500 hover:text-slate-300"
                }`}
              >
                <CalendarDays size={12} />
                <span>Presets</span>
                <ChevronDown size={12} className={`transition-transform ${showPresets ? "rotate-180" : ""}`} />
              </button>
            </div>

            <MultiSelectDropdown
              label="Region"
              icon={MapPin}
              options={regionsList}
              selected={filters.regions}
              onChange={(v) => onChange({ ...filters, regions: v })}
              color="blue"
            />
            <MultiSelectDropdown
              label="Category"
              icon={Tag}
              options={categoriesList}
              selected={filters.categories}
              onChange={(v) => onChange({ ...filters, categories: v })}
              color="emerald"
            />
            <MultiSelectDropdown
              label="Segment"
              icon={Users}
              selected={filters.segments}
              options={segmentsList}
              onChange={(v) => onChange({ ...filters, segments: v })}
              color="amber"
            />
            <MultiSelectDropdown
              label="Status"
              icon={Package}
              selected={filters.statuses}
              options={statusesList}
              onChange={(v) => onChange({ ...filters, statuses: v })}
              color="rose"
            />
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search orders, products..."
                value={filters.searchQuery}
                onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
                className="w-full lg:w-56 bg-slate-900/60 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => onChange({ ...filters, searchQuery: "" })}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {activeCount > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={resetFilters}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-all text-sm"
              >
                <RotateCcw size={14} />
                <span className="hidden sm:inline">Reset</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Date Presets */}
        <AnimatePresence>
          {showPresets && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-2 border-t border-slate-700/40">
                {/* Quarters */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold w-10">Qtrs</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {quarterPresets.map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => setDateRange(preset.from, preset.to)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                          isPresetActive(preset.from, preset.to)
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                            : "bg-slate-900/60 text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                    <button
                      onClick={() => setDateRange("2024-01-01", "2024-12-31")}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        isPresetActive("2024-01-01", "2024-12-31")
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : "bg-slate-900/60 text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-slate-300"
                      }`}
                    >
                      Full Year
                    </button>
                  </div>
                </div>

                {/* Months */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold w-10">Mos</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {presets.map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => setDateRange(preset.from, preset.to)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                          isPresetActive(preset.from, preset.to)
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                            : "bg-slate-900/60 text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
