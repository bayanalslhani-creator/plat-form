import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer id="contact" dir="rtl" className="relative overflow-hidden bg-obsidian pt-24 md:pt-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="font-mono text-xs tracking-[0.4em] text-amber/70">
            READY FOR PRODUCTION?
          </span>
          <h2 className="mt-6 font-display text-4xl font-black leading-tight text-studio-silver transition-colors duration-300 hover:text-amber md:text-7xl lg:text-8xl">
            انضم لمجتمع
            <br />
            بلاتفورم ميديا
          </h2>
          <p className="mx-auto mt-8 max-w-lg font-body text-studio-silver/60">
            إن كنت ترغب في الانضمام إلى فريقنا أو التعرف علينا بشكل أعمق، فسيشرفنا تواصلك معنا.
          </p>
          <Link
            to="/join"
            className="mt-10 inline-flex items-center gap-3 border border-amber bg-amber px-8 py-4 font-mono text-sm font-bold tracking-wider text-obsidian transition-all duration-300 hover:bg-transparent hover:text-amber"
          >
            سجل معنا
            <span className="h-px w-6 bg-current" />
          </Link>
        </motion.div>

        {/* info grid */}
        <div className="mt-24 grid grid-cols-1 gap-12 border-t border-studio-silver/10 py-16 md:grid-cols-3">
          <div>
            <span className="font-display text-lg font-black text-studio-silver">
              PLAT<span className="text-amber">·</span>FORM
            </span>
            <p className="mt-4 font-body text-sm text-studio-silver/50">
              نصنع محتوى بصرياً سينمائياً يُلهم ويثير — من قلب المملكة العربية السعودية.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-[0.3em] text-studio-silver/40">تصفح</h4>
            <ul className="mt-5 space-y-3">
              {[
                { l: "الرئيسية", h: "#home" },
                { l: "عننا", h: "#about" },
                { l: "الخدمات", h: "#services" },
                { l: "مشاريعنا", h: "#projects" },
              ].map((item) => (
                <li key={item.h}>
                  <a href={item.h} className="font-body text-sm text-studio-silver/65 hover:text-amber">
                    {item.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-[0.3em] text-studio-silver/40">
              معلومات التواصل
            </h4>
            <ul className="mt-5 space-y-4">
              <li className="flex items-center gap-3 font-body text-sm text-studio-silver/65" dir="ltr">
                <Phone className="h-4 w-4 text-amber" />
                +966 556543321
              </li>
              <li className="flex items-center gap-3 font-body text-sm text-studio-silver/65" dir="ltr">
                <Mail className="h-4 w-4 text-amber" />
                info@platformm.sa
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-studio-silver/65">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                Riyadh 8124-12253 | AL-Wurud - King Abdullah Road
                <br />
                Kingdom of Saudi Arabia
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-studio-silver/10 py-8 md:flex-row md:justify-between">
          <span className="font-mono text-[10px] tracking-[0.3em] text-studio-silver/30">
            © {new Date().getFullYear()} PLAT · FORM MEDIA
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-studio-silver/30">
            RIYADH · NEOM · ALULA
          </span>
        </div>
      </div>
    </footer>
  );
}