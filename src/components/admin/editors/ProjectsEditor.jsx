import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TextField, TextAreaField } from "@/components/admin/AdminField";
import { DEFAULT_CONTENT } from "@/lib/siteContentDefaults";
import { saveSection } from "@/lib/siteContentApi";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";

const KEY = "projects";

const emptyScope = "نقطة جديدة";

export default function ProjectsEditor() {
  const { toast } = useToast();
  const [items, setItems] = useState(() =>
    DEFAULT_CONTENT.projects.items.map((p) => ({
      ...p,
      scope: [...(p.scope || [])],
    }))
  );
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.SiteContent
      .filter({ key: KEY }, "-updated_date", 1)
      .then((recs) => {
        if (recs[0]?.data?.items) {
          setItems(
            recs[0].data.items.map((p) => ({
              ...p,
              scope: [...(p.scope || [])],
            }))
          );
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const update = (i, k, v) =>
    setItems((arr) => arr.map((it, idx) => (idx === i ? { ...it, [k]: v } : it)));

  const updateScope = (i, si, v) =>
    setItems((arr) =>
      arr.map((it, idx) =>
        idx === i
          ? { ...it, scope: it.scope.map((s, sidx) => (sidx === si ? v : s)) }
          : it
      )
    );

  const addScope = (i) =>
    setItems((arr) =>
      arr.map((it, idx) =>
        idx === i ? { ...it, scope: [...it.scope, emptyScope] } : it
      )
    );

  const removeScope = (i, si) =>
    setItems((arr) =>
      arr.map((it, idx) =>
        idx === i ? { ...it, scope: it.scope.filter((_, sidx) => sidx !== si) } : it
      )
    );

  const add = () =>
    setItems((arr) => [
      ...arr,
      {
        title: "مشروع جديد",
        tag: "تصنيف",
        category: "",
        img: "",
        about: "",
        scope: [],
        result: "",
      },
    ]);

  const remove = (i) => setItems((arr) => arr.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSection(KEY, { items });
      toast({ title: "تم الحفظ", description: "تم تحديث المشاريع." });
    } catch (e) {
      toast({ title: "خطأ", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-studio-silver/50">جارٍ التحميل...</div>;

  return (
    <div className="space-y-6">
      {items.map((p, i) => (
        <div
          key={i}
          className="space-y-3 rounded-lg border border-studio-silver/10 bg-slate-container/50 p-4"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-amber/70">
              مشروع {String(i + 1).padStart(2, "0")}
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
            <TextField label="العنوان" value={p.title} onChange={(v) => update(i, "title", v)} />
            <TextField label="التصنيف (tag)" value={p.tag} onChange={(v) => update(i, "tag", v)} />
          </div>
          <div className="space-y-2">
  <label className="text-studio-silver/60 text-xs">رفع الصورة</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        set("image")(file);
      }
    }}
    className="w-full text-xs text-studio-silver bg-slate-container border border-studio-silver/15 rounded p-2 file:bg-studio-silver/20 file:text-studio-silver file:border-0 file:rounded file:px-3 file:py-1 file:ml-3 hover:file:bg-studio-silver/30 cursor-pointer"
  />
</div>
          <TextAreaField label="عن العمل" value={p.about} onChange={(v) => update(i, "about", v)} rows={3} />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-studio-silver/60 text-xs">المطلوب للمشروع</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => addScope(i)}
                className="text-amber hover:text-amber"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {p.scope.map((s, si) => (
              <div key={si} className="flex items-center gap-2">
                <Input
                  value={s}
                  onChange={(e) => updateScope(i, si, e.target.value)}
                  className="bg-slate-container border-studio-silver/15 text-studio-silver"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeScope(i, si)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <TextAreaField label="النتيجة" value={p.result} onChange={(v) => update(i, "result", v)} rows={2} />
          <div className="grid grid-cols-2 gap-3">
            <TextField label="معرف Vimeo (اختياري)" value={p.video || ""} onChange={(v) => update(i, "video", v)} />
            <TextField label="رابط خارجي (اختياري)" value={p.link || ""} onChange={(v) => update(i, "link", v)} />
          </div>
          <TextField label="نص الرابط" value={p.linkLabel || ""} onChange={(v) => update(i, "linkLabel", v)} />
        </div>
      ))}

      <Button variant="outline" onClick={add} className="border-studio-silver/20 text-studio-silver">
        <Plus className="ml-2 h-4 w-4" /> إضافة مشروع
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