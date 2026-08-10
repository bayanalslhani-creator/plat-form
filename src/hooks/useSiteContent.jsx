import { createContext, useContext, useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { DEFAULT_CONTENT } from "@/lib/siteContentDefaults";

const SiteContentContext = createContext(null);

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