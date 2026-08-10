import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { TextField, TextAreaField, SelectField } from "@/components/admin/AdminField";
import { DEFAULT_CONTENT } from "@/lib/siteContentDefaults";
import { saveSection } from "@/lib/siteContentApi";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";

const KEY = "services";
const ICONS = ["Clapperboard", "Video", "Film", "Share2", "Palette", "Megaphone"];

export default function ServicesEditor() {
  const { toast } = useToast();
  const [items, setItems] = useState(() =>
    DEFAULT_CONTENT.services.items.map((s) => ({ ...s }))
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
    setItems((arr) => arr.map((it, idx) => (idx === i ? { ...it, [k]: v } : it)));
  const add = () =>
    setItems((arr) => [
      ...arr,
      {
        title: "خدمة جديدة",
        desc: "",
        tag: `${String(arr.length + 1).padStart(2, "0")} · NEW`,
        icon: "Clapperboard",
      },
    ]);
  const remove = (i) => setItems((arr) => arr.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSection(KEY, { items });
      toast({ title: "تم الحفظ", description: "تم تحديث الخدمات." });
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
              خدمة {String(i + 1).padStart(2, "0")}
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
          <TextField label="العنوان" value={s.title} onChange={(v) => update(i, "title", v)} />
          <TextAreaField label="الوصف" value={s.desc} onChange={(v) => update(i, "desc", v)} rows={3} />
          <TextField label="الوسم" value={s.tag} onChange={(v) => update(i, "tag", v)} />
          <SelectField label="الأيقونة" value={s.icon} onChange={(v) => update(i, "icon", v)} options={ICONS} />
        </div>
      ))}
      <Button variant="outline" onClick={add} className="border-studio-silver/20 text-studio-silver">
        <Plus className="ml-2 h-4 w-4" /> إضافة خدمة
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