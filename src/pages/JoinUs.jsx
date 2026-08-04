import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const LOGO = "https://platformm.sa/platform/images/platformmedia-white-trans.png";

const INTERESTS = [
  "التصوير الفوتوغرافي",
  "الإنتاج المرئي والفيديو",
  "إدارة حسابات التواصل",
  "بناء الهوية التجارية",
  "التسويق الإلكتروني",
  "أخرى",
];

const inputCls =
  "w-full border border-studio-silver/15 bg-slate-container px-4 py-3 text-studio-silver placeholder:text-studio-silver/30 focus:border-amber focus:outline-none transition-colors";

export default function JoinUs() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    interest: INTERESTS[0],
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await base44.entities.Registration.create(form);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err?.message || "حدث خطأ، حاول مرة أخرى");
    }
  };

  return (
    <main dir="rtl" className="relative min-h-screen overflow-hidden bg-obsidian pt-28 pb-20">
      <div className="absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-6">
        <Link to="/" className="inline-flex items-center">
          <img src={LOGO} alt="Plat Form Media" className="h-10 w-auto" />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 text-center"
        >
          <span className="font-mono text-xs tracking-[0.4em] text-amber">
            انضم إلى الفريق
          </span>
          <h1 className="mt-5 font-display text-4xl font-black leading-tight text-studio-silver md:text-6xl">
            سجّل <span className="text-amber">معنا</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md font-body text-studio-silver/60">
            إن كنت ترغب في الانضمام إلى فريقنا أو التعاون معنا، املأ بياناتك وسنتواصل معك في أقرب وقت.
          </p>
        </motion.div>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-14 flex flex-col items-center gap-6 border border-amber/30 bg-slate-container px-8 py-14 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber text-obsidian">
              <Check className="h-8 w-8" />
            </span>
            <h2 className="font-display text-2xl font-black text-studio-silver">
              تم استلام طلبك
            </h2>
            <p className="max-w-sm font-body text-studio-silver/60">
              شكراً لك! سنتواصل معك قريباً.
            </p>
            <Link
              to="/"
              className="mt-2 inline-flex items-center gap-2 rounded-lg border border-studio-silver/20 px-6 py-3 font-body text-sm tracking-wider text-studio-silver transition-colors hover:border-amber hover:text-amber"
            >
              العودة للرئيسية
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Link>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            <div>
              <label className="mb-2 block font-mono text-[11px] tracking-[0.2em] text-studio-silver/50">
                الاسم الكامل
              </label>
              <input
                required
                value={form.full_name}
                onChange={set("full_name")}
                placeholder="اكتب اسمك"
                className={inputCls}
              />
            </div>
            <div>
              <label className="mb-2 block font-mono text-[11px] tracking-[0.2em] text-studio-silver/50">
                رقم الجوال
              </label>
              <input
                required
                value={form.phone}
                onChange={set("phone")}
                placeholder="05xxxxxxxx"
                className={inputCls}
                dir="ltr"
              />
            </div>
            <div>
              <label className="mb-2 block font-mono text-[11px] tracking-[0.2em] text-studio-silver/50">
                البريد الإلكتروني
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="name@example.com"
                className={inputCls}
                dir="ltr"
              />
            </div>
            <div>
              <label className="mb-2 block font-mono text-[11px] tracking-[0.2em] text-studio-silver/50">
                مجال الاهتمام
              </label>
              <select
                value={form.interest}
                onChange={set("interest")}
                className={inputCls}
              >
                {INTERESTS.map((i) => (
                  <option key={i} value={i} className="bg-obsidian">
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block font-mono text-[11px] tracking-[0.2em] text-studio-silver/50">
                رسالة (اختياري)
              </label>
              <textarea
                value={form.message}
                onChange={set("message")}
                rows={4}
                placeholder="عرّفنا عن نفسك أو عن مشروعك"
                className={`${inputCls} resize-none`}
              />
            </div>

            {error && (
              <p className="md:col-span-2 text-sm text-destructive">{error}</p>
            )}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-lg border border-amber bg-amber px-8 py-4 font-body text-sm font-bold tracking-wider text-obsidian transition-all duration-300 hover:bg-transparent hover:text-amber md:w-auto"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    جارٍ الإرسال
                  </>
                ) : (
                  <>
                    إرسال الطلب
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </main>
  );
}