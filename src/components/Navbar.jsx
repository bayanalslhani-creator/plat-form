import { useState, useEffect } from "react"; import { motion, AnimatePresence } from "framer-motion"; import { Link } from "react-router-dom"; import { Menu, X } from "lucide-react";
const LOGO = "https://media.base44.com/images/public/6a6f7ad42956b021bd3930bf/a59389754_.png";
const NAV = [ { label: "الرئيسية", href: "#home" }, { label: "عننا", href: "#about" }, { label: "الخدمات", href: "#services" }, { label: "مشاريعنا", href: "#projects" }, { label: "شركاؤنا", href: "#partners" }, ];
export default function Navbar() { const [scrolled, setScrolled] = useState(false); const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 80); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
return ( <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} dir="rtl" className={fixed top-0 z-50 w-full transition-all duration-500 ${ scrolled || mobileMenuOpen ? "border-b border-studio-silver/10 bg-obsidian/90 backdrop-blur-md" : "border-b border-transparent bg-transparent" }} > <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"> {/* الشعار */} <Link to="/" className="flex items-center gap-2.5"> <img src={LOGO} alt="Plat Form Media" className="h-16 w-auto rounded-md mix-blend-screen" /> </Link>
    {/* الروابط للشاشات الكبيرة */}
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

    {/* زر سجل معنا للشاشات الكبيرة */}
    <div className="hidden md:block">
      <Link
        to="/join"
        className="rounded-lg border border-white/40 px-5 py-2 font-body text-xs tracking-wider text-white transition-colors hover:bg-white hover:text-obsidian"
      >
        سجل معنا
      </Link>
    </div>

    {/* زر الهامبرغر للجوال فقط */}
    <button
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className="p-2 text-studio-silver hover:text-white md:hidden focus:outline-none"
      aria-label="Toggle Menu"
    >
      {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
    </button>
  </div>

  {/* القائمة المنسدلة للجوال */}
  <AnimatePresence>
    {mobileMenuOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="border-t border-studio-silver/10 bg-obsidian/95 px-6 py-6 md:hidden"
      >
        <div className="flex flex-col gap-5">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-body text-base text-studio-silver/80 transition-colors hover:text-amber"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <Link
              to="/join"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full rounded-lg border border-white/40 py-2.5 text-center font-body text-xs tracking-wider text-white transition-colors hover:bg-white hover:text-obsidian"
            >
              سجل معنا
            </Link>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</motion.nav>
); }