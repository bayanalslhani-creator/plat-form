import { motion } from "framer-motion";
import { FileDown } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const POSTER = "https://media.base44.com/images/public/6a6f7ad42956b021bd3930bf/dddb81d9a_.jpg";

export default function AboutSection() {
  const { content } = useSiteContent();
  const about = content.about;

  return (
    <section
      id="about"
      dir="rtl"
      className="relative overflow-hidden bg-obsidian py-24 md:py-36"
    >
      <div className="mx-auto flex max-w-md flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full overflow-hidden rounded-2xl border border-studio-silver/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
        >
          <img
            src={POSTER}
            alt="Plat Form Profile"
            className="block h-auto w-full"
          />
        </motion.div>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          href={about.profile_url}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 font-body text-sm font-medium tracking-wide text-obsidian transition-transform duration-300 hover:scale-[1.03]"
        >
          <FileDown className="h-4 w-4" />
          تحميل الملف التعريفي
        </motion.a>
      </div>
    </section>
  );
}