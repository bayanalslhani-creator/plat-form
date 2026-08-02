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
    end: 1000,
    suffix: "+",
    label: "مشروع وإنتاج منجز",
    sub: "Productions Delivered",
    ghost: "1K",
  },
  {
    end: 50,
    suffix: "+",
    label: "عميل واثق بنا",
    sub: "Trusted Clients",
    ghost: "50",
  },
  {
    end: 50,
    suffix: "+",
    label: "طاقم عمل متخصص",
    sub: "Specialist Crew",
    ghost: "50",
  },
];

function StatCard({ stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden border border-studio-silver/10 bg-slate-container p-8 md:min-h-[340px] md:p-10"
    >
      {/* corner crop marks */}
      <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-amber/40" />
      <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-amber/40" />
      <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-amber/40" />
      <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-amber/40" />

      {/* ghost background number */}
      <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 font-display text-[7rem] font-black leading-none text-studio-silver/[0.04] md:text-[10rem]">
        {stat.ghost}
      </span>

      {/* index tag */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.3em] text-studio-silver/40">
        <span>0{index + 1}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-amber/60" />
      </div>

      {/* number */}
      <div className="relative z-10">
        <div className="font-mono text-4xl font-bold text-studio-silver md:text-6xl">
          <CountUp end={stat.end} suffix={stat.suffix} />
        </div>
        <div className="mt-4 text-lg font-semibold text-studio-silver md:text-xl">
          {stat.label}
        </div>
        <div className="mt-1 font-mono text-[11px] tracking-[0.25em] text-studio-silver/40">
          {stat.sub}
        </div>
      </div>

      {/* hover sweep */}
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
  const ghostY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-obsidian py-24 md:py-36"
      dir="rtl"
    >
      {/* parallax ghost number */}
      <motion.div
        style={{ y: ghostY }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[18rem] font-black leading-none text-studio-silver/[0.025] md:text-[30rem]"
      >
        2M+
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* header */}
        <div className="mb-14 flex flex-col items-start gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="flex items-center gap-3 font-mono text-xs tracking-[0.4em] text-amber">
              <span className="h-px w-8 bg-amber/60" />
              أرقام بلات فورم
            </span>
            <h2 className="mt-4 font-display text-4xl font-black leading-tight text-studio-silver md:text-6xl">
              الحجم الذي تصنعه
              <br />
              <span className="text-amber">الكاميرا</span> بالأرقام
            </h2>
          </div>
          <p className="max-w-md font-body text-base text-studio-silver/60">
            من المشاهدات إلى طاقم العمل — كل رقم يمثل لحظة صنعتها بلات فورم
            بإتقان واحترافية.
          </p>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 gap-px bg-studio-silver/10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>

        {/* shooting hours strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-px flex flex-col items-center justify-between gap-6 border border-studio-silver/10 bg-slate-container p-8 md:flex-row md:p-12"
        >
          <div className="flex items-center gap-4">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber" />
            <span className="font-mono text-xs tracking-[0.3em] text-studio-silver/50">
              ACROSS THE KINGDOM
            </span>
          </div>
          <div className="text-center md:text-right">
            <div className="font-display text-3xl font-black text-studio-silver md:text-5xl">
              ساعات التصوير
            </div>
            <div className="mt-2 font-body text-studio-silver/60">
              في أكثر من مكان حول المملكة العربية السعودية — من نيوما إلى الرياض
              والعلا.
            </div>
          </div>
          <div className="font-mono text-5xl font-bold text-amber md:text-7xl">
            <CountUp end={10000} suffix="+" duration={2600} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}