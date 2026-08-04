import { motion } from "framer-motion";
import { FileDown } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="about"
      dir="rtl"
      className="relative overflow-hidden bg-obsidian py-24 md:py-36"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 font-mono text-xs tracking-[0.4em] text-amber"
          >
            <span className="h-px w-8 bg-amber/60" />
            عن بلاتفورم ميديا
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-6 font-display text-4xl font-black leading-tight text-studio-silver md:text-6xl"
          >
            نحوّل الأفكار
            <br />
            إلى <span className="text-amber">واقع</span> مرئي
          </motion.h2>
        </div>

        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-body text-lg leading-relaxed text-studio-silver/75 md:text-xl"
          >
            نهدف إلى تمكين شركائنا عبر تبني الأفكار، وتطويرها المستمر، وتحويلها إلى واقع،
            مستفيدين من خبراتنا المتنوعة في القطاعين الحكومي والخاص، لتقديم خدمات
            متكاملة في مكان واحد.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            href="https://drive.google.com/file/d/1XdZHVCkXgblK7cM-G7eevXiizXcuApc3/view"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-lg border border-studio-silver/20 px-6 py-3 font-body text-sm tracking-wider text-studio-silver transition-colors hover:border-amber hover:text-amber"
          >
            <FileDown className="h-4 w-4" />
            تحميل الملف التعريفي
          </motion.a>
        </div>
      </div>
    </section>
  );
}