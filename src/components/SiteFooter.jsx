import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const LOGO =
  "https://media.base44.com/images/public/6a6f7ad42956b021bd3930bf/a28a3753d_.svg";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/platformm.sa",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.309.975.975 1.247 2.242 1.309 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.309 3.608-.975.975-2.242 1.247-3.608 1.309-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.309-.975-.975-1.247-2.242-1.309-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.309-3.608.975-.975 2.242-1.247 3.608-1.309C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.143 0-3.5.012-4.74.068-.97.044-1.504.207-1.857.344-.467.182-.8.399-1.15.749-.35.35-.567.683-.749 1.15-.137.353-.3.887-.344 1.857-.056 1.24-.068 1.597-.068 4.74s.012 3.5.068 4.74c.044.97.207 1.504.344 1.857.182.467.399.8.749 1.15.35.35.683.567 1.15.749.353.137.887.3 1.857.344 1.24.056 1.597.068 4.74.068s3.5-.012 4.74-.068c.97-.044 1.504-.207 1.857-.344.467-.182.8-.399 1.15-.749.35-.35.567-.683.749-1.15.137-.353.3-.887.344-1.857.056-1.24.068-1.597.068-4.74s-.012-3.5-.068-4.74c-.044-.97-.207-1.504-.344-1.857a3.097 3.097 0 00-.749-1.15 3.098 3.098 0 00-1.15-.749c-.353-.137-.887-.3-1.857-.344-1.24-.056-1.597-.068-4.74-.068zm0 3.13a4.87 4.87 0 110 9.738 4.87 4.87 0 010-9.738zm0 8.03a3.162 3.162 0 100-6.325 3.162 3.162 0 000 6.325zm6.406-8.234a1.137 1.137 0 11-2.275 0 1.137 1.137 0 012.275 0z",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@platformm.sa",
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.34-3.44-3.42-5.79-.01-.34-.01-.67-.01-1 0-.01 0-.02 0-.03.07-1.99.93-3.94 2.34-5.21 1.31-1.18 3.06-1.85 4.83-1.86.04 1.43.04 2.86.04 4.29-.77-.25-1.65-.16-2.34.31-.69.46-1.14 1.24-1.14 2.06-.02 1.31 1.07 2.5 2.39 2.55 1.31.07 2.55-.94 2.66-2.25.02-.34.02-.69.02-1.04 0-3.66 0-7.32 0-10.98 0-.06 0-.13 0-.2z",
  },
  {
    label: "X",
    href: "https://x.com/platformm_sa",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
];

export default function SiteFooter() {
  const { content } = useSiteContent();
  const footer = content.footer;

  return (
    <footer
      id="contact"
      dir="rtl"
      className="relative overflow-hidden bg-obsidian pt-24 md:pt-32"
    >
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
            {footer.cta_eyebrow}
          </span>
          <h2 className="mt-6 font-display text-4xl font-black leading-tight text-studio-silver transition-colors duration-300 hover:text-amber md:text-7xl lg:text-8xl">
            {footer.cta_heading_line1}
            <br />
            {footer.cta_heading_line2}
          </h2>
          <p className="mx-auto mt-8 max-w-lg font-body text-studio-silver/60">
            {footer.cta_paragraph}
          </p>
          <Link
            to="/join"
            className="mt-10 inline-flex items-center gap-3 rounded-lg border border-white bg-white px-8 py-4 font-body text-sm font-bold tracking-wider text-obsidian transition-all duration-300 hover:bg-transparent hover:text-white"
          >
            {footer.cta_button}
            <span className="h-px w-6 bg-current" />
          </Link>
        </motion.div>

        {/* info grid */}
        <div className="mt-24 grid grid-cols-1 gap-12 border-t border-studio-silver/10 py-16 md:grid-cols-3">
          <div>
            <h4 className="font-mono text-xs tracking-[0.3em] text-studio-silver/40">من نحن</h4>
            <p className="mt-5 font-body text-sm leading-relaxed text-studio-silver/50">
              {footer.about_text}
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
                  <a
                    href={item.h}
                    className="font-body text-sm text-studio-silver/65 hover:text-amber"
                  >
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
            <ul className="mt-5 space-y-3">
              <li
                className="flex items-center gap-3 font-body text-sm text-studio-silver/65"
                dir="ltr"
              >
                <Phone className="h-4 w-4 text-amber" />
                {footer.phone}
              </li>
              <li
                className="flex items-center gap-3 font-body text-sm text-studio-silver/65"
                dir="ltr"
              >
                <Mail className="h-4 w-4 text-amber" />
                {footer.email}
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-studio-silver/65">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                <span style={{ whiteSpace: "pre-line" }}>{footer.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 border-t border-studio-silver/10 py-8 md:flex-row md:justify-between">
          <span className="font-mono text-[10px] tracking-[0.3em] text-studio-silver/30">
            © {new Date().getFullYear()} جميع الحقوق محفوظة
          </span>
          <div className="flex items-center gap-4">
            <img src={LOGO} alt="Plat Form Media" className="h-8 w-auto" />
            <span className="h-6 w-px bg-studio-silver/15" />
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-studio-silver/15 text-studio-silver/60 transition-colors hover:border-amber hover:text-amber"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}