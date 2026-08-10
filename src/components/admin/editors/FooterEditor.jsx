import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { TextField, TextAreaField } from "@/components/admin/AdminField";
import { DEFAULT_CONTENT } from "@/lib/siteContentDefaults";
import { saveSection } from "@/lib/siteContentApi";
import { Save, Loader2 } from "lucide-react";

const KEY = "footer";

export default function FooterEditor() {
  const { toast } = useToast();
  const [form, setForm] = useState(() => ({ ...DEFAULT_CONTENT.footer }));
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.SiteContent
      .filter({ key: KEY }, "-updated_date", 1)
      .then((recs) => {
        if (recs[0]?.data) setForm({ ...DEFAULT_CONTENT.footer, ...recs[0].data });
      })
      .finally(() => setLoading(false));
  }, []);

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSection(KEY, form);
      toast({ title: "تم الحفظ", description: "تم تحديث الفوتر." });
    } catch (e) {
      toast({ title: "خطأ", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-studio-silver/50">جارٍ التحميل...</div>;

  return (
    <div className="space-y-5">
      <TextField label="الوسم العلوي" value={form.cta_eyebrow} onChange={set("cta_eyebrow")} />
      <TextField label="العنوان (السطر الأول)" value={form.cta_heading_line1} onChange={set("cta_heading_line1")} />
      <TextField label="العنوان (السطر الثاني)" value={form.cta_heading_line2} onChange={set("cta_heading_line2")} />
      <TextAreaField label="الفقرة" value={form.cta_paragraph} onChange={set("cta_paragraph")} rows={3} />
      <TextField label="نص الزر" value={form.cta_button} onChange={set("cta_button")} />
      <TextAreaField label="نبذة عن الشركة" value={form.about_text} onChange={set("about_text")} rows={3} />
      <TextField label="رقم الهاتف" value={form.phone} onChange={set("phone")} />
      <TextField label="البريد الإلكتروني" value={form.email} onChange={set("email")} />
      <TextAreaField label="العنوان" value={form.address} onChange={set("address")} rows={3} />
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