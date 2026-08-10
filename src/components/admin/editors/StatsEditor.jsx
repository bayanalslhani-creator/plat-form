import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/admin/AdminField";
import { DEFAULT_CONTENT } from "@/lib/siteContentDefaults";
import { saveSection } from "@/lib/siteContentApi";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";

const KEY = "stats";

export default function StatsEditor() {
  const { toast } = useToast();
  const [items, setItems] = useState(() =>
    DEFAULT_CONTENT.stats.items.map((s) => ({ ...s }))
  );
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.SiteContent
      .filter({ key: KEY }, "-updated_date", 1)
      .then((recs) => {
        if (recs[0]?.data?.items) setItems(recs[0].data.items);
      })
      .finally(() => setLoading(false));
  }, []);

  const update = (i, k, v) =>
    setItems((arr) =>
      arr.map((it, idx) =>
        idx === i ? { ...it, [k]: k === "end" ? Number(v) : v } : it
      )
    );
  const add = () =>
    setItems((arr) => [...arr, { end: 0, suffix: "+", label: "عنصر جديد", sub: "New Stat" }]);
  const remove = (i) => setItems((arr) => arr.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSection(KEY, { items });
      toast({ title: "تم الحفظ", description: "تم تحديث الأرقام." });
    } catch (e) {
      toast({ title: "خطأ", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-studio-silver/50">جارٍ التحميل...</div>;

  return (
    <div className="space-y-6">
      {items.map((s, i) => (
        <div key={i} className="space-y-3 rounded-lg border border-studio-silver/10 bg-slate-container/50 p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-amber/70">
              رقم {String(i + 1).padStart(2, "0")}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => remove(i)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <TextField label="القيمة" type="number" value={s.end} onChange={(v) => update(i, "end", v)} />
            <TextField label="اللاحقة" value={s.suffix} onChange={(v) => update(i, "suffix", v)} />
          </div>
          <TextField label="الوصف" value={s.label} onChange={(v) => update(i, "label", v)} />
          <TextField label="النص الفرعي" value={s.sub} onChange={(v) => update(i, "sub", v)} />
        </div>
      ))}
      <Button variant="outline" onClick={add} className="border-studio-silver/20 text-studio-silver">
        <Plus className="ml-2 h-4 w-4" /> إضافة رقم
      </Button>
      <div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-amber text-obsidian hover:bg-amber/90"
        >
          {saving ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Save className="ml-2 h-4 w-4" />}
          حفظ
        </Button>
      </div>
    </div>
  );
}