import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { TextField, TextAreaField } from "@/components/admin/AdminField";
import { DEFAULT_CONTENT } from "@/lib/siteContentDefaults";
import { saveSection } from "@/lib/siteContentApi";
import { Save, Loader2 } from "lucide-react";

const KEY = "about";

export default function AboutEditor() {
  const { toast } = useToast();
  const [form, setForm] = useState(() => ({ ...DEFAULT_CONTENT.about }));
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.SiteContent
      .filter({ key: KEY }, "-updated_date", 1)
      .then((recs) => {
        if (recs[0]?.data) setForm({ ...DEFAULT_CONTENT.about, ...recs[0].data });
      })
      .finally(() => setLoading(false));
  }, []);

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSection(KEY, form);
      toast({ title: "تم الحفظ", description: "تم تحديث قسم (عننا)." });
    } catch (e) {
      toast({ title: "خطأ", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-studio-silver/50">جارٍ التحميل...</div>;

  return (
    <div className="space-y-5">
      <TextField label="الوسم العلوي" value={form.eyebrow} onChange={set("eyebrow")} />
      <TextField label="العنوان (السطر الأول)" value={form.heading_line1} onChange={set("heading_line1")} />
      <TextField label="ما قبل الكلمة المميزة" value={form.heading_line2_pre} onChange={set("heading_line2_pre")} />
      <TextField label="الكلمة المميزة" value={form.heading_line2_highlight} onChange={set("heading_line2_highlight")} />
      <TextField label="ما بعد الكلمة المميزة" value={form.heading_line2_post} onChange={set("heading_line2_post")} />
      <TextAreaField label="الفقرة" value={form.paragraph} onChange={set("paragraph")} rows={4} />
      <TextField label="نص الزر" value={form.cta} onChange={set("cta")} />
      <TextField label="رابط الملف التعريفي" value={form.profile_url} onChange={set("profile_url")} />
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