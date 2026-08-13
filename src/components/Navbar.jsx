import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LogoTypeface from "@/components/LogoTypeface";

const LOGO = "https://media.base44.com/images/public/6a6f7ad42956b021bd3930bf/e53489781_.jpg";

const NAV = [
  { label: "الرئيسية", href: "#home" },
  { label: "عننا", href: "#about" },
  { label: "الخدمات", href: "#services" },
  { label: "مشاريعنا", href: "#projects" },
  { label: "شركاؤنا", href: "#partners" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      dir="rtl"
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-studio-silver/10 bg-obsidian/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={LOGO} alt="Plat Form Media" className="h-20 w-auto rounded-md mix-blend-screen" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-body text-sm text-studio-silver/70 transition-colors hover:text-amber"
            >
              {item.label}
            </a>
          ))}
        </div>

        <Link
          to="/join"
          className="rounded-lg border border-white/40 px-5 py-2 font-body text-xs tracking-wider text-white transition-colors hover:bg-white hover:text-obsidian"
        >
          سجل معنا
        </Link>
      </div>
    </motion.nav>
  );
}