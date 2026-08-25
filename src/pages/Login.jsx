import React, { useState } from "react"; import { Link, useNavigate } from "react-router-dom"; import { Button } from "@/components/ui/button"; import { Input } from "@/components/ui/input"; import { Label } from "@/components/ui/label"; import { Mail, Lock, Loader2 } from "lucide-react";
export default function Login() { const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false); const navigate = useNavigate();
const handleSubmit = (e) => { e.preventDefault(); setError(""); setLoading(true);
// تسجيل دخول المستخدم العادي
if (email && password) {
  localStorage.setItem("userAuthenticated", "true");
  setLoading(false);
  navigate("/");
} else {
  setError("يرجى إدخال البريد وكلمة المرور");
  setLoading(false);
}
};
return ( <div dir="rtl" className="min-h-screen flex items-center justify-center bg-obsidian p-4"> <div className="w-full max-w-md bg-slate-container border border-studio-silver/15 p-6 rounded-lg space-y-6"> <h2 className="text-xl font-bold text-center text-studio-silver">تسجيل الدخول</h2>
    {error && (
      <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label className="text-studio-silver/60">البريد الإلكتروني</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-obsidian border-studio-silver/15 text-studio-silver"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-studio-silver/60">كلمة المرور</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-obsidian border-studio-silver/15 text-studio-silver"
          required
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full h-12 bg-amber text-obsidian">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "دخول"}
      </Button>
    </form>
  </div>
</div>
); }