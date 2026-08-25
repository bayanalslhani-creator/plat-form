import { motion } from "framer-motion";

const PARTNERS = [
"001", "002", "003", "004", "005", "006", "007", "008",
"010", "011", "012", "013", "014", "015", "016", "017", "018"];


const BASE = "https://platformm.sa/platform/images/partners/white/";

export default function PartnersSection() {
  return (
    <section id="partners" dir="rtl" className="relative bg-obsidian py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <h2 className="text-3xl leading-tight text-studio-silver md:text-5xl [font-family:'SF_Arabic',_sans-serif] font-medium">
            شركاء <span className="text-white">بلاتفورم</span>
          </h2>
          <p className="mt-6 font-body text-base leading-relaxed text-studio-silver/60">
            في مؤسسة بلاتفورم، نعتبر شراكتنا معكم خطوة أساسية نحو تحقيق أهدافنا المشتركة.
            التعاون بيننا هو محرك رئيسي للابتكار والنمو المستدام، ونحن على يقين أن جهودنا
            المشتركة ستثمر عن نتائج إيجابية تسهم في تحقيق تطلعاتنا وتطلعاتكم.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-px bg-studio-silver/10 sm:grid-cols-4 md:grid-cols-6">
          {PARTNERS.map((id, i) =>
          <motion.div
            key={id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i % 6 * 0.06 }}
            className="flex aspect-[3/2] items-center justify-center bg-obsidian p-5 transition-colors hover:bg-stale-container
            ">
            
            
            
              <img
  src={`${BASE}${id}.png${id === "003" ? "?v=1" : ""}`}
  alt={`Partner ${id}`}
  className="h-12 w-auto object-contain brightness-100 opacity-100 grayscale-0 transition-all duration-300 hover:brightness-50 hover:opacity-60 hover:grayscale active:opacity-50"
/>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}