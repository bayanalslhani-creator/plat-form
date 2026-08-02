import { motion } from "framer-motion";

const SERVICES = [
  {
    title: "قبل الإنتاج المرئي",
    desc: "هي مرحلة التخطيط والتجهيز، نبدأ فيها بفهم فكرة العميل وأهدافه، ثم نكتب السيناريو، ونرسم تصور المشاهد، ونحدد مواقع التصوير والمواهب المناسبة، مع تجهيز الجدول الزمني والتصاريح وكل ما يلزم قبل بدء التنفيذ.",
    img: "https://platformm.sa/platform/images/services/before-entag.png?v=1",
    tag: "01 · PRE-PRODUCTION",
  },
  {
    title: "التصوير و الإنتاج المرئي",
    desc: "في هذه المرحلة ننفذ الفكرة على أرض الواقع، من خلال التصوير والإخراج باستخدام معدات احترافية، مع متابعة دقيقة لكل مشهد لضمان الجودة وتحقيق رؤية العميل بشكل دقيق وجذاب.",
    img: "https://platformm.sa/platform/images/services/entag.png?v=1",
    tag: "02 · PRODUCTION",
  },
  {
    title: "صناعة المحتوى الإبداعي",
    desc: "نقوم بمنتجة المحتوى وتحريره بشكل احترافي، مع إضافة المؤثرات البصرية والصوتية، وتصحيح الألوان، ودمج العناصر بشكل متناسق لإخراج عمل نهائي يعبّر عن الرسالة بأفضل صورة.",
    img: "https://platformm.sa/platform/images/services/content-write.png?v=1",
    tag: "03 · POST-PRODUCTION",
  },
  {
    title: "إدارة الحسابات التواصل الإجتماعي",
    desc: "ندير حضوركم الرقمي بشكل كامل، من إعداد خطة المحتوى وتصميم المنشورات، إلى الجدولة والردود وتحليل الأداء، لضمان تواصل فعال ومستمر مع الجمهور.",
    img: "https://platformm.sa/platform/images/services/social.png?v=1",
    tag: "04 · SOCIAL MANAGEMENT",
  },
  {
    title: "بناء العلامة والهوية التجارية",
    desc: "نصمم هوية متكاملة تعبر عن شخصية العلامة التجارية، تشمل الشعار، الألوان، الخطوط، والدليل الإرشادي، لنصنع انطباعًا بصريًا متماسكًا ومميزًا.",
    img: "https://platformm.sa/platform/images/services/id.png?v=1",
    tag: "05 · BRANDING",
  },
  {
    title: "التسويق الإلكتروني",
    desc: "نساعد في نشر المحتوى عبر المنصات المناسبة من خلال حملات مدروسة، نستهدف فيها الجمهور المطلوب، ونتابع الأداء لتحسين النتائج وزيادة التفاعل والانتشار.",
    img: "https://platformm.sa/platform/images/services/market.png?v=1",
    tag: "06 · DIGITAL MARKETING",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" dir="rtl" className="relative bg-obsidian py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl md:mb-20">
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

        <div className="grid grid-cols-1 gap-px bg-studio-silver/10 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="group relative flex flex-col overflow-hidden bg-slate-container p-8 transition-colors hover:bg-obsidian md:p-10"
            >
              <div className="relative mb-6 h-28 overflow-hidden rounded-lg border border-studio-silver/10">
                <img
                  src={s.img}
                  alt={s.title}
                  className="h-full w-full object-cover opacity-75 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-obsidian/40" />
              </div>
              <span className="mb-3 font-mono text-[10px] tracking-[0.3em] text-amber/70">
                {s.tag}
              </span>
              <h3 className="font-display text-xl font-black text-studio-silver md:text-2xl">
                {s.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-studio-silver/55">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}