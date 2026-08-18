import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";
import { useSiteContent } from "@/hooks/useSiteContent";

function StatCard({ stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex min-h-[230px] flex-col overflow-hidden border border-studio-silver/10 bg-slate-container p-8 transition-colors duration-500 hover:border-amber/30 md:p-10">
      
      <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-amber/40" />
      <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-amber/40" />
      <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-amber/40" />
      <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-amber/40" />

      <div className="relative z-10">
        <span className="font-mono text-[11px] tracking-[0.3em] text-studio-silver/35">
          0{index + 1}
        </span>
        <div className="mt-6 font-mono text-4xl font-bold leading-none text-studio-silver md:text-5xl">
          <CountUp end={stat.end} suffix={stat.suffix} />
        </div>
        <div className="mt-4 text-base font-semibold text-studio-silver md:text-lg">
          {stat.label}
        </div>
        <div className="mt-1.5 font-mono text-[10px] tracking-[0.25em] text-amber/50">
          {stat.sub}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-amber/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>);

}

export default function StatsSection() {
  const { content } = useSiteContent();
  const stats = content.stats.items;

  return (
    <section id="stats" dir="rtl" className="relative bg-obsidian py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 md:mb-20">
          <span className="block h-px w-8 bg-amber/60" />
          <span className="mt-4 block tracking-[0.4em] text-studio-silver [font-family:'SF_Arabic',_sans-serif] font-medium text-lg md:text-xl">أرقام بلاتفورم</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, i) =>
          <StatCard key={i} stat={stat} index={i} />
          )}
        </div>
      </div>
    </section>);

}