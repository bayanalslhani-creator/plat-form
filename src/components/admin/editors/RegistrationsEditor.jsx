import { useEffect, useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Check, X, Loader2, Mail, Phone, RefreshCw } from "lucide-react";

const STATUS_META = {
  pending: { label: "قيد الانتظار", cls: "text-amber border-amber/40 bg-amber/10" },
  accepted: { label: "مقبول", cls: "text-green-400 border-green-400/40 bg-green-400/10" },
  rejected: { label: "مرفوض", cls: "text-destructive border-destructive/40 bg-destructive/10" },
};

export default function RegistrationsEditor() {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");

  const load = useCallback(() => {
    setLoading(true);
    base44.entities.Registration
      .filter(filter === "all" ? {} : { status: filter }, "-created_date", 200)
      .then(setItems)
      .catch((e) => toast({ title: "خطأ", description: e.message, variant: "destructive" }))
      .finally(() => setLoading(false));
  }, [filter, toast]);

  useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (id, status) => {
    try {
      await base44.entities.Registration.update(id, { status });
      setItems((arr) => arr.map((r) => (r.id === id ? { ...r, status } : r)));
      toast({ title: "تم التحديث", description: STATUS_META[status].label, duration: 2000 });
    } catch (e) {
      toast({ title: "خطأ", description: e.message, variant: "destructive", duration: 2000 });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {["pending", "accepted", "rejected", "all"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg border px-3 py-1.5 font-body text-xs transition-colors ${
                filter === f
                  ? "border-amber bg-amber/10 text-amber"
                  : "border-studio-silver/15 text-studio-silver/60 hover:text-studio-silver"
              }`}
            >
              {f === "all" ? "الكل" : STATUS_META[f].label}
            </button>
          ))}
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 rounded-lg border border-studio-silver/15 px-3 py-1.5 font-body text-xs text-studio-silver/60 hover:text-amber"
        >
          <RefreshCw className="h-3.5 w-3.5" /> تحديث
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-studio-silver/50">
          <Loader2 className="h-4 w-4 animate-spin" /> جارٍ التحميل...
        </div>
      ) : items.length === 0 ? (
        <div className="py-12 text-center font-body text-studio-silver/40">
          لا توجد طلبات في هذا التصنيف.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((r) => {
            const meta = STATUS_META[r.status || "pending"] || STATUS_META.pending;
            return (
              <div
                key={r.id}
                className="rounded-lg border border-studio-silver/10 bg-slate-container/50 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-lg font-black text-studio-silver">
                        {r.full_name}
                      </h3>
                      <span className={`rounded border px-2 py-0.5 font-mono text-[10px] ${meta.cls}`}>
                        {meta.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 font-body text-xs text-studio-silver/60">
                      <span className="flex items-center gap-1.5" dir="ltr">
                        <Phone className="h-3.5 w-3.5 text-amber" /> {r.phone}
                      </span>
                      <span className="flex items-center gap-1.5" dir="ltr">
                        <Mail className="h-3.5 w-3.5 text-amber" /> {r.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setStatus(r.id, "accepted")}
                      className="flex items-center gap-1.5 rounded-lg border border-green-400/30 bg-green-400/10 px-3 py-1.5 font-body text-xs text-green-400 hover:bg-green-400/20"
                    >
                      <Check className="h-3.5 w-3.5" /> قبول
                    </button>
                    <button
                      onClick={() => setStatus(r.id, "rejected")}
                      className="flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-1.5 font-body text-xs text-destructive hover:bg-destructive/20"
                    >
                      <X className="h-3.5 w-3.5" /> رفض
                    </button>
                  </div>
                </div>

                {r.interest && (
                  <p className="mt-3 font-body text-xs text-studio-silver/50">
                    <span className="text-amber/70">مجال الاهتمام:</span> {r.interest}
                  </p>
                )}
                {r.message && (
                  <p className="mt-2 rounded-md border border-studio-silver/10 bg-obsidian/40 p-3 font-body text-sm text-studio-silver/70">
                    {r.message}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}