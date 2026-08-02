import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

const VIMEO_ID = "1081002337";
const POSTER =
  "https://media.base44.com/images/public/6a6f7ad42956b021bd3930bf/651afcaeb_generated_e27ad996.png";

export default function VideoHero() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-obsidian"
      dir="rtl"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={POSTER} alt="Plat Form production" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/70" />
        <div className="absolute inset-0 bg-obsidian/30" />
      </motion.div>

      {/* letterbox bars */}
      <div className="absolute top-0 z-20 h-16 w-full bg-obsidian" />
      <div className="absolute bottom-0 z-20 h-16 w-full bg-obsidian" />

      <motion.div style={{ opacity }} className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.4em] text-amber"
        >
          <span className="h-px w-8 bg-amber/60" />
          PLAT · FORM MEDIA
          <span className="h-px w-8 bg-amber/60" />
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl font-black leading-[0.9] text-studio-silver sm:text-7xl md:text-8xl lg:text-9xl"
        >
          نصنع
          <br />
          <span className="text-amber">الإبداع</span> البصري
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 flex flex-col items-center gap-6 sm:flex-row"
        >
          <button
            onClick={() => setOpen(true)}
            className="group flex items-center gap-3 border border-studio-silver/30 bg-obsidian/40 px-7 py-4 backdrop-blur-sm transition-colors hover:border-amber"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber text-obsidian">
              <Play className="h-4 w-4 fill-current" />
            </span>
            <span className="font-body text-base text-studio-silver">شاهد أعمالنا</span>
          </button>
          <a
            href="#about"
            className="font-mono text-sm tracking-wider text-studio-silver/60 transition-colors hover:text-amber"
          >
            تعرّف علينا ↓
          </a>
        </motion.div>
      </motion.div>

      {/* metadata strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-24 left-0 right-0 z-10 flex justify-center gap-8 font-mono text-[10px] tracking-[0.3em] text-studio-silver/40"
        dir="ltr"
      >
        <span>ISO 800</span>
        <span>f/2.8</span>
        <span>1/200s</span>
        <span>4K · 24FPS</span>
      </motion.div>

      {/* video lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-obsidian/95 p-4"
            onClick={() => setOpen(false)}
          >
            <button className="absolute right-6 top-6 text-studio-silver/60 hover:text-amber">
              <X className="h-7 w-7" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="aspect-video w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1`}
                title="Plat Form Showreel"
                className="h-full w-full"
                allow="autoplay; fullscreen"
                frameBorder="0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}