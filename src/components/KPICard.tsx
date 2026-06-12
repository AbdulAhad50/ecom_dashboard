import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  color: string;
  delay?: number;
  previousValue?: number;
  format?: "number" | "currency" | "percent";
}

function formatValue(value: number, format?: string, prefix?: string, suffix?: string): string {
  let formatted = "";
  if (format === "currency") {
    if (value >= 1_000_000) formatted = `${prefix || "$"}${(value / 1_000_000).toFixed(2)}M`;
    else if (value >= 1_000) formatted = `${prefix || "$"}${(value / 1_000).toFixed(1)}K`;
    else formatted = `${prefix || "$"}${value.toLocaleString()}`;
  } else if (format === "percent") {
    formatted = `${value.toFixed(1)}%`;
  } else {
    if (value >= 1_000_000) formatted = `${(value / 1_000_000).toFixed(2)}M`;
    else if (value >= 1_000) formatted = `${(value / 1_000).toFixed(1)}K`;
    else formatted = value.toLocaleString();
  }
  return formatted + (suffix || "");
}

function useCountUp(end: number, duration: number = 1500, start: boolean = true) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(end * easeOut);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [end, duration, start]);

  return count;
}

export default function KPICard({
  title,
  value,
  prefix,
  suffix,
  icon: Icon,
  color,
  delay = 0,
  format = "number",
}: KPICardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const count = useCountUp(value, 1800, isVisible);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const colorMap: Record<string, { gradient: string; border: string; text: string; bg: string }> = {
    emerald: { gradient: "from-emerald-500/20 to-emerald-600/5", border: "border-emerald-500/30", text: "text-emerald-400", bg: "bg-emerald-500" },
    blue: { gradient: "from-blue-500/20 to-blue-600/5", border: "border-blue-500/30", text: "text-blue-400", bg: "bg-blue-500" },
    amber: { gradient: "from-amber-500/20 to-amber-600/5", border: "border-amber-500/30", text: "text-amber-400", bg: "bg-amber-500" },
    rose: { gradient: "from-rose-500/20 to-rose-600/5", border: "border-rose-500/30", text: "text-rose-400", bg: "bg-rose-500" },
    violet: { gradient: "from-violet-500/20 to-violet-600/5", border: "border-violet-500/30", text: "text-violet-400", bg: "bg-violet-500" },
    cyan: { gradient: "from-cyan-500/20 to-cyan-600/5", border: "border-cyan-500/30", text: "text-cyan-400", bg: "bg-cyan-500" },
    orange: { gradient: "from-orange-500/20 to-orange-600/5", border: "border-orange-500/30", text: "text-orange-400", bg: "bg-orange-500" },
    pink: { gradient: "from-pink-500/20 to-pink-600/5", border: "border-pink-500/30", text: "text-pink-400", bg: "bg-pink-500" },
  };

  const c = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-2xl border ${c.border} bg-gradient-to-br ${c.gradient} backdrop-blur-sm p-5 group hover:scale-[1.02] transition-transform duration-300`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors duration-500" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <div className={`p-2 rounded-xl ${c.bg}/10`}>
            <Icon size={18} className={c.text} />
          </div>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          {formatValue(count, format, prefix, suffix)}
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <div className={`h-1.5 w-1.5 rounded-full ${c.bg}`} />
          <span className="text-xs text-slate-500">Live data</span>
        </div>
      </div>
    </motion.div>
  );
}
