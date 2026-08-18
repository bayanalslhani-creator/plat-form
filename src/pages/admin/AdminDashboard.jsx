import { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import HeroEditor from "@/components/admin/editors/HeroEditor";
import AboutEditor from "@/components/admin/editors/AboutEditor";
import ServicesEditor from "@/components/admin/editors/ServicesEditor";
import StatsEditor from "@/components/admin/editors/StatsEditor";
import FooterEditor from "@/components/admin/editors/FooterEditor";
import RegistrationsEditor from "@/components/admin/editors/RegistrationsEditor";
import ProjectsEditor from "@/components/admin/editors/ProjectsEditor";
import FontSettingsEditor from "@/components/admin/editors/FontSettingsEditor";
import { LayoutDashboard, LogOut, ExternalLink, Menu, X } from "lucide-react";

const LOGO =
  "https://media.base44.com/images/public/6a6f7ad42956b021bd3930bf/a28a3753d_.svg";

const TABS = [
  { id: "hero", label: "الرئيسية", Editor: HeroEditor },
  { id: "about", label: "عننا", Editor: AboutEditor },
  { id: "services", label: "الخدمات", Editor: ServicesEditor },
  { id: "stats", label: "الأرقام", Editor: StatsEditor },
  { id: "projects", label: "المشاريع", Editor: ProjectsEditor },
  { id: "footer", label: "الفوتر", Editor: FooterEditor },
  { id: "font", label: "الخط", Editor: FontSettingsEditor },
  { id: "registrations", label: "الطلبات", Editor: RegistrationsEditor },
];

export default function AdminDashboard() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const ActiveEditor = TABS.find((t) => t.id === active)?.Editor || HeroEditor;
  const select = (id) => {
    setActive(id);
    setMenuOpen(false);
  };

  const handleLogout = () => base44.auth.logout("/admin/login");

  return (
    <div dir="rtl" className="min-h-screen bg-obsidian text-studio-silver">
      <header className="sticky top-0 z-40 border-b border-studio-silver/10 bg-obsidian/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="Plat Form" className="h-8 w-auto" />
            <span className="font-mono text-xs tracking-[0.3em] text-amber/70">
              ADMIN
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-lg border border-studio-silver/15 px-4 py-2 font-body text-xs text-studio-silver/70 transition-colors hover:border-amber hover:text-amber"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />} الأقسام
            </button>
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-2 rounded-lg border border-studio-silver/15 px-4 py-2 font-body text-xs text-studio-silver/70 transition-colors hover:border-amber hover:text-amber"
            >
              <ExternalLink className="h-4 w-4" /> عرض الموقع
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-studio-silver/15 px-4 py-2 font-body text-xs text-studio-silver/70 transition-colors hover:border-destructive hover:text-destructive"
            >
              <LogOut className="h-4 w-4" /> خروج
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-8 px-6 py-10">
        {menuOpen && (
          <aside className="w-48 shrink-0">
            <div className="mb-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-studio-silver/40">
              <LayoutDashboard className="h-3 w-3" /> الأقسام
            </div>
            <nav className="space-y-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => select(t.id)}
                  className={`block w-full rounded-lg px-4 py-2.5 text-right font-body text-sm transition-colors ${
                    active === t.id
                      ? "bg-amber/10 text-amber"
                      : "text-studio-silver/60 hover:bg-slate-container hover:text-studio-silver"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </aside>
        )}

        <main className="flex-1">
          <h1 className="mb-6 font-display text-2xl font-black text-studio-silver">
            {TABS.find((t) => t.id === active)?.label}
          </h1>
          <div className="rounded-xl border border-studio-silver/10 bg-slate-container/30 p-6">
            <ActiveEditor />
          </div>
        </main>
      </div>
    </div>
  );
}