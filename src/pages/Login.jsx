import React, { useState } from "react"; import { Link, useNavigate } from "react-router-dom"; import { Button } from "@/components/ui/button"; import { Input } from "@/components/ui/input"; import { Label } from "@/components/ui/label"; import { Mail, Lock, Loader2 } from "lucide-react"; import AuthLayout from "@/components/AuthLayout";
export default function Login() { const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false); const navigate = useNavigate();
const handleSubmit = (e) => { e.preventDefault(); setError(""); setLoading(true);
// البيانات الثابتة لتسجيل الدخول
const ADMIN_EMAIL = "lnfo@platformm.sa";
const ADMIN_PASSWORD = "A5613qwsa";

if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
  setLoading(false);
  // التوجيه بعد نجاح تسجيل الدخول
  navigate("/admin");
} else {
  setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
  setLoading(false);
}
};
return ( <AuthLayout icon={Mail} title="Welcome back"> {error && ( <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center"> {error} </div> )}
  <form onSubmit={handleSubmit} className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
        <Input
          id="email"
          type="email"
          autoComplete="email"
          autoFocus
          placeholder="lnfo@platformm.sa"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 h-12"
          required
        />
      </div>
    </div>

    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="password">Password</Label>
        <Link to="/forgot-password" className="text-xs text-primary hover:underline">
          نسيت كلمة المرور؟
        </Link>
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="pl-10 h-12"
          required
        />
      </div>
    </div>

    <Button
      type="submit"
      disabled={loading}
      className="h-12 w-full font-medium"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "دخول"}
    </Button>
  </form>
</AuthLayout>
); }