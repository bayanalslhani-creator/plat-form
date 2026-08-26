import { useState } from "react"; import { Button } from "@/components/ui/button"; import { Input } from "@/components/ui/input"; import { Label } from "@/components/ui/label"; import { Lock, Mail, Loader2 } from "lucide-react"; import { Link } from "react-router-dom";
const LOGO = "https://media.base44.com/images/public/6a6f7ad42956b021bd3930bf/a28a3753d_.svg";
export default function AdminLogin() { const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
const handleSubmit = (e) => { e.preventDefault(); setError(""); setLoading(true);
// تنظيف الحقول وتحويل البريد لحروف صغيرة لتفادي خطأ Capital/Small
const cleanEmail = email.trim().toLowerCase();
const cleanPassword = password.trim();

// قبول البريد سواء كتب بالـ i أو الـ l مع الباسوورد الثابت
const isValidEmail = cleanEmail === "info@platformm.sa" || cleanEmail === "lnfo@platformm.sa";
const isValidPassword = cleanPassword === "A5613qwsa";

if (isValidEmail && isValidPassword) {
  // حفظ الجلسة في المتصفح لتجاوز الحماية والتوجيه
  localStorage.setItem("isAdminAuthenticated", "true");
  localStorage.setItem("adminEmail", cleanEmail);

  // التوجيه المباشر للمسار الصحيح دون إيقاف الـ loading
window.location.href = "/admin/dashboard";
} else {
  setError("بيانات الدخول غير صحيحة");
  setLoading(false);
}
};
return ( <div dir="rtl" className="flex min-h-screen items-center justify-center bg-obsidian px-6"> <div className="w-full max-w-md rounded-2xl border border-studio-silver/10 bg-slate-container/50 p-8"> <div className="mb-8 flex flex-col items-center text-center"> <img src={LOGO} alt="Plat Form" className="h-12 w-auto" /> <h1 className="mt-6 font-display text-2xl font-black text-studio-silver"> لوحة التحكم </h1> <p className="mt-2 font-body text-sm text-studio-silver/50"> تسجيل دخول الأدمن </p> </div>
    {error && (
      <div className="mb-4 rounded-lg bg-destructive/10 p-3 font-body text-sm text-destructive">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label className="text-studio-silver/60">البريد الإلكتروني</Label>
        <div className="relative">
          <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-studio-silver/40" />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-obsidian border-studio-silver/15 text-studio-silver pr-10"
            required
            autoFocus
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-studio-silver/60">كلمة المرور</Label>
        <div className="relative">
          <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-studio-silver/40" />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-obsidian border-studio-silver/15 text-studio-silver pr-10"
            required
          />
        </div>
        <div className="flex justify-end pt-1">
          <Link
            to="/forgot-password"
            className="text-xs text-studio-silver/70 hover:text-studio-silver transition-colors underline cursor-pointer"
          >
            نسيت كلمة المرور؟
          </Link>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="h-12 w-full bg-amber text-obsidian hover:bg-amber/90"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "دخول"}
      </Button>
    </form>
  </div>
</div>
); }