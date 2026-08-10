import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const inputCls =
  "bg-slate-container border-studio-silver/15 text-studio-silver placeholder:text-studio-silver/30";

export function TextField({ label, value, onChange, ...props }) {
  return (
    <div className="space-y-2">
      {label && <Label className="text-studio-silver/60 text-xs">{label}</Label>}
      <Input
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        className={inputCls}
        {...props}
      />
    </div>
  );
}

export function TextAreaField({ label, value, onChange, rows = 4, ...props }) {
  return (
    <div className="space-y-2">
      {label && <Label className="text-studio-silver/60 text-xs">{label}</Label>}
      <Textarea
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        rows={rows}
        className={inputCls}
        {...props}
      />
    </div>
  );
}

export function SelectField({ label, value, onChange, options }) {
  return (
    <div className="space-y-2">
      {label && <Label className="text-studio-silver/60 text-xs">{label}</Label>}
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`${inputCls} flex h-10 w-full rounded-md border px-3 py-2 text-sm`}
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-slate-container">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}