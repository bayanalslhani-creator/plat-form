import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clapperboard,
  Video,
  Film,
  Share2,
  Palette,
  Megaphone,
} from "lucide-react";

const SERVICES = [
  {
    title: "قبل الإنتاج المرئي",
    desc: "هي مرحلة التخطيط والتجهيز، نبدأ فيها بفهم فكرة العميل وأهدافه، ثم نكتب السيناريو، ونرسم تصور المشاهد، ونحدد مواقع التصوير والمواهب المناسبة، مع تجهيز الجدول الزمني والتصاريح وكل ما يلزم قبل بدء التنفيذ.",
    icon: Clapperboard,
    tag: "01 · PRE-PRODUCTION",
  },
  {
    title: "التصوير و الإنتاج المرئي",
    desc: "في هذه المرحلة ننفذ الفكرة على أرض الواقع، من خلال التصوير والإخراج باستخدام معدات احترافية، مع متابعة دقيقة لكل مشهد لضمان الجودة وتحقيق رؤية العميل بشكل دقيق وجذاب.",
    icon: Video,
    tag: "02 · PRODUCTION",
  },
  {
    title: "صناعة المحتوى الإبداعي",
    desc: "نقوم بمنتجة المحتوى وتحريره بشكل احترافي، مع إضافة المؤثرات البصرية والصوتية، وتصحيح الألوان، ودمج العناصر بشكل متناسق لإخراج عمل نهائي يعبّر عن الرسالة بأفضل صورة.",
    icon: Film,
    tag: "03 · POST-PRODUCTION",
  },
  {
    title: "إدارة الحسابات التواصل الإجتماعي",
    desc: "ندير حضوركم الرقمي بشكل كامل، من إعداد خطة المحتوى وتصميم المنشورات، إلى الجدولة والردود وتحليل الأداء، لضمان تواصل فعال ومستمر مع الجمهور.",
    icon: Share2,
    tag: "04 · SOCIAL MANAGEMENT",
  },
  {
    title: "بناء العلامة والهوية التجارية",
    desc: "نصمم هوية متكاملة تعبر عن شخصية العلامة التجارية، تشمل الشعار، الألوان، الخطوط، والدليل الإرشادي، لنصنع انطباعًا بصريًا متماسكًا ومميزًا.",
    icon: Palette,
    tag: "05 · BRANDING",
  },
  {
    title: "التسويق الإلكتروني",
    desc: "نساعد في نشر المحتوى عبر المنصات المناسبة من خلال حملات مدروسة، نستهدف فيها الجمهور المطلوب، ونتابع الأداء لتحسين النتائج وزيادة التفاعل والانتشار.",
    icon: Megaphone,
    tag: "06 · DIGITAL MARKETING",
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % SERVICES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="services"
      dir="rtl"
      className="relative overflow-hidden bg-obsidian py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl md:mb-16">
          <span className="flex items-center gap-3 font-mono text-xs tracking-[0.4em] text-amber">
            <span className="h-px w-8 bg-amber/60" />
            خدماتنا
          </span>
          <h2 className="mt-4 font-display text-4xl font-black leading-tight text-studio-silver md:text-6xl">
            خدمات <span className="text-amber">شاملة</span> في مكان واحد
          </h2>
          <p className="mt-6 font-body text-lg text-studio-silver/65">
            في بلاتفورم ميديا نقدم لشركائنا خدمات شاملة، من مرحلة ما قبل الإنتاج
            والإنتاج إلى مرحلة ما بعد الإنتاج والإعلان والتسويق وما بعد ذلك.
          </p>
        </div>

        {/* horizontal moving strip */}
        <div className="flex snap-x items-stretch gap-3 overflow-x-auto pb-3 md:justify-center md:gap-4 [&::-webkit-scrollbar]:hidden">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === active;
            return (
              <button
                key={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`flex w-32 shrink-0 snap-start flex-col items-center gap-3 rounded-xl border px-4 py-6 text-center transition-all duration-500 md:w-36 ${
                  isActive
                    ? "scale-[1.04] border-amber/40 bg-slate-container opacity-100 blur-0"
                    : "border-studio-silver/10 bg-slate-container/40 opacity-50 blur-[2px] hover:opacity-70"
                }`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                    isActive
                      ? "bg-amber text-obsidian"
                      : "bg-studio-silver/5 text-studio-silver/50"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <span
                  className={`text-sm leading-tight transition-colors ${
                    isActive
                      ? "font-bold text-studio-silver"
                      : "font-normal text-studio-silver/55"
                  }`}
                >
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* active service detail */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 max-w-2xl"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-amber/70">
            {SERVICES[active].tag}
          </span>
          <h3 className="mt-3 font-display text-2xl font-black text-studio-silver md:text-4xl">
            {SERVICES[active].title}
          </h3>
          <p className="mt-4 font-body text-base leading-relaxed text-studio-silver/65">
            {SERVICES[active].desc}
          </p>
        </motion.div>
      </div>
    </section>
  );
}