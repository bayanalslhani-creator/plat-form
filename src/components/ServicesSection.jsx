import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Clapperboard,
  Video,
  Film,
  Share2,
  Palette,
  Megaphone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const ICONS = { Clapperboard, Video, Film, Share2, Palette, Megaphone };

export default function ServicesSection() {
  const { content } = useSiteContent();
  const services = content.services.items;
  const [active, setActive] = useState(0);
  const btnRefs = useRef([]);

  const safeActive = Math.min(active, services.length - 1);
  const current = services[safeActive] || services[0];

  const go = (dir) => {
    const next = Math.max(0, Math.min(services.length - 1, safeActive + dir));
    setActive(next);
    btnRefs.current[next]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <section
      id="services"
      dir="rtl"
      className="relative overflow-hidden bg-obsidian py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl md:mb-16">
          <span className="flex items-center gap-3 font-mono text-xs tracking-[0.4em] text-amber">
            <span className="h-px w-8 bg-amber/60" />
            خدماتنا
          </span>
          <h2 className="mt-4 font-display text-4xl font-black leading-tight text-studio-silver md:text-6xl">
            خدمات <span className="text-amber">شاملة</span> في مكان واحد
          </h2>
          <p className="mt-6 font-body text-lg text-studio-silver/65">
            في بلاتفورم ميديا نقدم لشركائنا خدمات شاملة، من مرحلة ما قبل الإنتاج
            والإنتاج إلى مرحلة ما بعد الإنتاج والإعلان والتسويق وما بعد ذلك.
          </p>
        </div>

        {/* horizontal moving strip */}
        <div className="flex snap-x items-stretch gap-3 overflow-x-auto pb-3 md:justify-center md:gap-4 [&::-webkit-scrollbar]:hidden">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon] || Clapperboard;
            const isActive = i === safeActive;
            return (
              <button
                key={i}
                ref={(el) => {
                  btnRefs.current[i] = el;
                }}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`flex w-32 shrink-0 snap-start flex-col items-center gap-3 rounded-xl border px-4 py-6 text-center transition-all duration-500 md:w-36 ${
                  isActive
                    ? "scale-[1.04] border-amber/40 bg-slate-container opacity-100 blur-0"
                    : "border-studio-silver/10 bg-slate-container/40 opacity-50 blur-[2px] hover:opacity-70"
                }`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                    isActive
                      ? "bg-amber text-white"
                      : "bg-studio-silver/5 text-studio-silver/50"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <span
                  className={`text-sm leading-tight transition-colors ${
                    isActive
                      ? "font-bold text-studio-silver"
                      : "font-normal text-studio-silver/55"
                  }`}
                >
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* navigation arrows */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={() => go(-1)}
            disabled={safeActive === 0}
            aria-label="السابق"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-studio-silver/15 bg-white/5 text-studio-silver/70 transition-colors hover:border-amber hover:text-amber disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            disabled={safeActive === services.length - 1}
            aria-label="التالي"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-studio-silver/15 bg-white/5 text-studio-silver/70 transition-colors hover:border-amber hover:text-amber disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
        {current && (
          <motion.div
            key={safeActive}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 max-w-2xl"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] text-amber/70">
              {current.tag}
            </span>
            <h3 className="mt-3 font-display text-2xl font-black text-studio-silver md:text-4xl">
              {current.title}
            </h3>
            <p className="mt-4 font-body text-base leading-relaxed text-studio-silver/65">
              {current.desc}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}