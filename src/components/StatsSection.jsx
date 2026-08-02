import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "@/components/CountUp";

const STATS = [
  {
    end: 2000000,
    suffix: "+",
    label: "مشاهدة على منصات التواصل",
    sub: "Social Media Views",
    ghost: "2M",
  },
  {
    end: 50,
    suffix: "+",
    label: "عدد عملائنا",
    sub: "Trusted Clients",
    ghost: "50",
  },
  {
    end: 50,
    suffix: "+",
    label: "طاقم العمل الذين عملوا مع بلاتفورم",
    sub: "Specialist Crew",
    ghost: "50",
  },
  {
    end: 1000,
    suffix: "+",
    label: "ساعات التصوير في أكثر من مكان في المملكة",
    sub: "Shooting Hours",
    ghost: "1K",
  },
  {
    end: 10,
    suffix: "+",
    label: "سنوات الخبرة في سوق العمل",
    sub: "Years of Experience",
    ghost: "10",
  },
];

function StatCard({ stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex min-h-[240px] flex-col justify-between overflow-hidden border border-studio-silver/10 bg-slate-container p-7 md:min-h-[300px] md:p-9"
    >
      <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-amber/40" />
      <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-amber/40" />
      <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-amber/40" />
      <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-amber/40" />

      <span className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 font-display text-[5rem] font-black leading-none text-studio-silver/[0.04] md:text-[8rem]">
        {stat.ghost}
      </span>

      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.3em] text-studio-silver/40">
        <span>0{index + 1}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-amber/60" />
      </div>

      <div className="relative z-10">
        <div className="font-mono text-4xl font-bold text-studio-silver md:text-5xl">
          <CountUp end={stat.end} suffix={stat.suffix} />
        </div>
        <div className="mt-3 text-base font-semibold text-studio-silver md:text-lg">
          {stat.label}
        </div>
        <div className="mt-1 font-mono text-[10px] tracking-[0.25em] text-studio-silver/40">
          {stat.sub}
        </div>
      </div>

      <div className="absolute inset-0 -z-0 bg-gradient-to-t from-amber/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  return (
    <section ref={ref} dir="rtl" className="relative overflow-hidden bg-obsidian py-24 md:py-32">
      <motion.div
        style={{ y: ghostY }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[16rem] font-black leading-none text-studio-silver/[0.025] md:text-[26rem]"
      >
        2M+
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-14 md:mb-20">
          <span className="flex items-center gap-3 font-mono text-xs tracking-[0.4em] text-amber">
            <span className="h-px w-8 bg-amber/60" />
            أرقام بلاتفورم
          </span>
          <h2 className="mt-4 font-display text-4xl font-black leading-tight text-studio-silver md:text-6xl">
            الحجم الذي تصنعه
            <span className="text-amber"> الكاميرا</span> بالأرقام
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-studio-silver/10 sm:grid-cols-2 lg:grid-cols-3">
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}