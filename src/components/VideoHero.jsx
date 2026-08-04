import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

const VIMEO_ID = "1081002337";

export default function VideoHero() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-obsidian"
      dir="rtl"
    >
      {/* background video (covers viewport, 16:9) */}
      <div className="absolute inset-0">
        <iframe
          src={`https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1&muted=1&loop=1&background=1&autopause=0`}
          title="Platform Media Showreel"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-[100vh] w-[177.78vh] min-w-[100vw] -translate-x-1/2 -translate-y-1/2"
          frameBorder="0"
          allow="autoplay; fullscreen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/45 to-obsidian/75" />
        <div className="absolute inset-0 bg-obsidian/15" />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 flex flex-col items-center px-6 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl font-black leading-[1.05] text-studio-silver sm:text-6xl md:text-7xl lg:text-8xl"
        >
          نصنع
          <br />
          <span className="text-amber">الإبداع</span> البصري
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-12 flex flex-col items-center gap-6 sm:flex-row"
        >
          <button
            onClick={() => setOpen(true)}
            className="group flex items-center gap-3 rounded-lg border border-studio-silver/25 bg-obsidian/30 px-7 py-4 backdrop-blur-sm transition-all hover:border-amber hover:bg-obsidian/50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber text-obsidian transition-transform group-hover:scale-110">
              <Play className="h-4 w-4 fill-current" />
            </span>
            <span className="font-body text-base text-studio-silver">شاهد أعمالنا</span>
          </button>
          <a
            href="#stats"
            className="font-mono text-sm tracking-wider text-studio-silver/60 transition-colors hover:text-amber"
          >
            الأرقام تتحدث ↓
          </a>
        </motion.div>
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