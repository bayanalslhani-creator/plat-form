import { createContext, useContext, useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { DEFAULT_CONTENT } from "@/lib/siteContentDefaults";

const SiteContentContext = createContext(null);

function hexToHsl(hex) {
  const m = hex?.replace("#", "");
  if (!m || m.length !== 6) return "0 0% 88.6%";
  const r = parseInt(m.slice(0, 2), 16) / 255;
  const g = parseInt(m.slice(2, 4), 16) / 255;
  const b = parseInt(m.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    base44.entities.SiteContent
      .list()
      .then((records) => {
        if (!mounted) return;
        setContent((prev) => {
          const merged = { ...prev };
          (records || []).forEach((r) => {
            if (r.key && r.data) {
              merged[r.key] = { ...DEFAULT_CONTENT[r.key], ...r.data };
            }
          });
          return merged;
        });
        setLoaded(true);
      })
      .catch(() => setLoaded(true));

    const unsubscribe = base44.entities.SiteContent.subscribe((event) => {
      setContent((prev) => {
        const next = { ...prev };
        const key = event.data?.key;
        if (!key) return prev;
        if (event.type === "delete") {
          next[key] = DEFAULT_CONTENT[key];
        } else {
          next[key] = { ...DEFAULT_CONTENT[key], ...(event.data?.data || {}) };
        }
        return next;
      });
    });

    return () => {
      mounted = false;
      unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    const f = content.font;
    if (!f) return;
    let el = document.getElementById("global-font-settings");
    if (!el) {
      el = document.createElement("style");
      el.id = "global-font-settings";
      document.head.appendChild(el);
    }
    const stack = `"${f.family}", "SF Compact", "MyCustomAvenir", ui-sans-serif, system-ui, sans-serif`;
    const hsl = hexToHsl(f.text_color);
    el.textContent = `
      * { font-family: ${stack} !important; }
      html { font-size: ${f.base_size || 16}px; }
      :root { --foreground: ${hsl}; }
      .text-amber { color: ${f.accent_color} !important; }
      .bg-amber { background-color: ${f.accent_color} !important; }
      .border-amber { border-color: ${f.accent_color} !important; }
    `;
  }, [content.font]);

  return (
    <SiteContentContext.Provider value={{ content, loaded }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  }
  return ctx;
}