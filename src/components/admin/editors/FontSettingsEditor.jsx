import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { SelectField, TextField } from "@/components/admin/AdminField";
import { DEFAULT_CONTENT } from "@/lib/siteContentDefaults";
import { saveSection } from "@/lib/siteContentApi";
import { Save, Loader2, RotateCcw } from "lucide-react";

const KEY = "font";
const FAMILIES = ["SF Arabic", "Avenir", "GE SS Two", "29LT Zarid Slab"];

export default function FontSettingsEditor() {
  const { toast } = useToast();
  const [data, setData] = useState(() => ({ ...DEFAULT_CONTENT.font }));
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.SiteContent
      .filter({ key: KEY }, "-updated_date", 1)
      .then((recs) => {
        if (recs[0]?.data) setData({ ...DEFAULT_CONTENT.font, ...recs[0].data });
      })
      .finally(() => setLoading(false));
  }, []);

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSection(KEY, data);
      toast({ title: "تم الحفظ", description: "تم تحديث إعدادات الخط." });
    } catch (e) {
      toast({ title: "خطأ", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setData({ ...DEFAULT_CONTENT.font });
    toast({ title: "تمت الاستعادة", description: "ارجعت الإعدادات الافتراضية (احفظ لتطبيقها)." });
  };

  if (loading) return <div className="text-studio-silver/50">جارٍ التحميل...</div>;

  return (
    <div className="space-y-6">
      <p className="font-body text-sm text-studio-silver/60">
        تحكّم بنوع الخط وحجمه الأساسي وألوان النص والتمييز لكل الموقع. التغييرات تنعكس مباشرة على هذه اللوحة والموقع.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SelectField
          label="نوع الخط"
          value={data.family}
          onChange={(v) => set("family", v)}
          options={FAMILIES}
        />
        <TextField
          label="الحجم الأساسي (px)"
          type="number"
          value={data.base_size}
          onChange={(v) => set("base_size", Number(v))}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ColorField
          label="لون النص"
          value={data.text_color}
          onChange={(v) => set("text_color", v)}
        />
        <ColorField
          label="لون التمييز"
          value={data.accent_color}
          onChange={(v) => set("accent_color", v)}
        />
      </div>

      <div className="rounded-lg border border-studio-silver/10 bg-slate-container/50 p-5">
        <span className="font-mono text-[10px] tracking-[0.3em] text-studio-silver/40">معاينة</span>
        <h3 className="mt-3 font-display text-2xl font-black text-studio-silver md:text-3xl">
          عنوان تجريبي <span className="text-amber">للخط</span>
        </h3>
        <p className="mt-3 font-body text-sm leading-relaxed text-studio-silver/65">
          هذا نص لعرض شكل الخط الجديد على فقرات الموقع. بلاتفورم ميديا تصنع محتوى بصرياً سينمائياً يُلهم.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-amber text-obsidian hover:bg-amber/90"
        >
          {saving ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Save className="ml-2 h-4 w-4" />}
          حفظ
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          className="border-studio-silver/20 text-studio-silver"
        >
          <RotateCcw className="ml-2 h-4 w-4" /> استعادة الافتراضي
        </Button>
      </div>
    </div>
  );
}

function ColorField({ label, value, onChange }) {
  return (
    <div className="space-y-2">
      <span className="text-studio-silver/60 text-xs">{label}</span>
      <div className="flex items-center gap-3 rounded-md border border-studio-silver/15 bg-slate-container px-3 py-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-10 cursor-pointer rounded border-0 bg-transparent p-0"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent font-mono text-sm text-studio-silver outline-none"
        />
      </div>
    </div>
  );
}