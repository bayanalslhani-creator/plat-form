import { motion } from "framer-motion";

export default function FinalFrame() {
  return (
    <footer className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-obsidian px-6 py-20" dir="rtl">
      <div className="text-center">
        <span className="font-mono text-xs tracking-[0.4em] text-amber/70">
          READY FOR PRODUCTION?
        </span>
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-4xl font-black leading-tight text-studio-silver transition-colors duration-300 hover:text-amber md:text-7xl lg:text-8xl"
        >
          هل أنت جاهز
          <br />
          للإنتاج؟
        </motion.h2>
        <p className="mx-auto mt-8 max-w-lg font-body text-studio-silver/60">
          تواصل مع بلات فورم لتحويل رؤيتك إلى عمل بصري سينمائي.
        </p>
        <a
          href="mailto:hello@platform.sa"
          className="mt-10 inline-flex items-center gap-3 border border-amber bg-amber px-8 py-4 font-mono text-sm font-bold tracking-wider text-obsidian transition-all duration-300 hover:bg-transparent hover:text-amber"
        >
          ابدأ مشروعك
          <span className="h-px w-6 bg-current" />
        </a>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2 px-6 md:flex-row md:justify-between">
        <span className="font-mono text-[10px] tracking-[0.3em] text-studio-silver/30">
          © {new Date().getFullYear()} PLAT · FORM
        </span>
        <span className="font-mono text-[10px] tracking-[0.3em] text-studio-silver/30">
          RIYADH · NEOM · ALULA
        </span>
      </div>
    </footer>
  );
}