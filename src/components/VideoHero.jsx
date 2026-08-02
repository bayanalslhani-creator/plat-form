import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HERO_IMAGE =
  "https://media.base44.com/images/public/6a6f7ad42956b021bd3930bf/651afcaeb_generated_e27ad996.png";

export default function VideoHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-obsidian"
      dir="ltr"
    >
      {/* background (placeholder for company video) */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <img
          src={HERO_IMAGE}
          alt="Plat Form production"
          className="h-full w-full object-cover"
        />
        {/* cinematic gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-obsidian/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-transparent to-obsidian/70" />
      </motion.div>

      {/* center content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.4em] text-amber"
        >
          <span className="h-px w-8 bg-amber/60" />
          PLAT · FORM PRODUCTIONS
          <span className="h-px w-8 bg-amber/60" />
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl font-black leading-[0.95] text-studio-silver sm:text-7xl md:text-8xl lg:text-9xl"
        >
          THE FRAME
          <br />
          <span className="text-amber">BEHIND</span> THE STORY
        </motion.h1>

        <motion.p
          dir="rtl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-8 max-w-xl font-body text-base text-studio-silver/70 md:text-lg"
        >
          نصنع محتوى بصرياً سينمائياً يُلهم ويثير — من قلب المملكة العربية السعودية
        </motion.p>
      </motion.div>

      {/* scroll prompt */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] text-studio-silver/50">
            SCROLL
          </span>
          <ChevronDown className="h-4 w-4 text-studio-silver/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}