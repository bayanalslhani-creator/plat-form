import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/admin/AdminField";
import { DEFAULT_CONTENT } from "@/lib/siteContentDefaults";
import { saveSection } from "@/lib/siteContentApi";
import { Save, Loader2 } from "lucide-react";

const KEY = "hero";

export default function HeroEditor() {
  const { toast } = useToast();
  const [form, setForm] = useState(() => ({ ...DEFAULT_CONTENT.hero }));
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.SiteContent
      .filter({ key: KEY }, "-updated_date", 1)
      .then((recs) => {
        if (recs[0]?.data) setForm({ ...DEFAULT_CONTENT.hero, ...recs[0].data });
      })
      .finally(() => setLoading(false));
  }, []);

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSection(KEY, form);
      toast({ title: "تم الحفظ", description: "تم تحديث القسم الرئيسي." });
    } catch (e) {
      toast({ title: "خطأ", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-studio-silver/50">جارٍ التحميل...</div>;

  return (
    <div className="space-y-5">
      <TextField label="العنوان (السطر الأول)" value={form.title_pre} onChange={set("title_pre")} />
      <TextField label="الكلمة المميزة" value={form.title_highlight} onChange={set("title_highlight")} />
      <TextField label="تكملة العنوان" value={form.title_post} onChange={set("title_post")} />
      <TextField label="زر التشغيل" value={form.cta_play} onChange={set("cta_play")} />
      <TextField label="نص الرابط" value={form.cta_stats} onChange={set("cta_stats")} />
      <TextField label="معرّف الفيديو (Vimeo ID)" value={form.vimeo_id} onChange={set("vimeo_id")} />
      <Button
        onClick={handleSave}
        disabled={saving}
        className="bg-amber text-obsidian hover:bg-amber/90"
      >
        {saving ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Save className="ml-2 h-4 w-4" />}
        حفظ
      </Button>
    </div>
  );
}