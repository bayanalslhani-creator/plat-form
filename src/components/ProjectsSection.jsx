import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpLeft, X, Play } from "lucide-react";

const PROJECTS = [
  {
    title: "Evennees Cafe",
    tag: "إدارة وتسويق",
    img: "https://platformm.sa/storage/media/f7147bf4-89a6-498a-9ec5-d1a8a9c44971.png",
    about:
      "ضمن شراكة تسويقية مع كوفي إيفينس، تولّت منصة بلاتفورم إدارة الحسابات الرقمية والتصوير والتسويق، عبر تطوير استراتيجية محتوى مدروسة تعكس هوية العلامة وتقدّمها بصورة متناسقة، مع تخطيط سنوي يضمن حضورًا رقميًا مستمرًا ومحتوى بصري عالي الجودة.",
    scope: [
      "إدارة حسابات التواصل الاجتماعي باحترافية",
      "إعداد وتنفيذ خطة تسويق سنوية متكاملة",
      "إنتاج محتوى بصري راقٍ يشمل التصوير الفوتوغرافي والفيديو",
      "صياغة رسائل تسويقية تعكس هوية العلامة",
      "تعزيز التفاعل ونمو قاعدة المتابعين",
    ],
    result:
      "حضور رقمي متناسق، وانتظام في المحتوى، وارتفاع ملحوظ في التفاعل، مع صورة ذهنية راقية تعكس احترافية العلامة.",
    link: "https://www.instagram.com/evenness.sa",
    linkLabel: "حساب الانستقرام",
  },
  {
    title: "Brewing Cafe",
    tag: "إطلاق علامة",
    img: "https://platformm.sa/storage/media/57e40624-c022-45a8-8d28-4b5042620881.png",
    about:
      "شراكة تسويقية مع براوينق تولّت فيها منصتنا إدارة الحسابات الرقمية والتصوير والتسويق، من المراحل الأولى لتكوين العلامة، عبر استراتيجية محتوى سنوية تعزّز الهوية وتحفّز التفاعل.",
    scope: [
      "إدارة الحسابات الرقمية منذ الإطلاق",
      "إعداد وتنفيذ خطة تسويق سنوية",
      "إنتاج محتوى بصري احترافي",
      "بناء رسائل تسويقية وهوية واضحة",
    ],
    result:
      "محتوى منظم، تفاعل متصاعد، وصورة علامة واضحة تعكس قوة براوينق.",
  },
  {
    title: "Sarhah",
    tag: "إعلان بصري",
    img: "https://platformm.sa/storage/media/3615275a-9ac9-429e-b75f-23930086ee12.png",
    about:
      "تعاون إبداعي مع سرحه تولّت فيه منصتنا تطوير وتنفيذ مقطع إعلاني بصري يعكس جوهر العلامة ويترجم هويتها إلى تجربة مشاهدة أنيقة، قائمة على فكرة إبداعية مدروسة ولمسة إخراجية عالية.",
    scope: [
      "إنتاج مقطع إعلاني بمستوى بصري راقٍ",
      "تنفيذ التصوير والإخراج باحترافية عالية",
      "صياغة رسالة تعزز مكانة علامة سرحه",
    ],
    result:
      "مقطع إعلاني أنيق ومؤثر يعبّر عن هوية سرحه، ويمنح العلامة حضورًا بصريًا يليق بمكانتها.",
    video: "1149125668",
    link: "https://vimeo.com/1149125668",
    linkLabel: "رابط الفيديو",
  },
  {
    title: "King Abdulaziz Quality Award",
    tag: "فيديو تعريفي",
    img: "https://platformm.sa/storage/media/f85dc60b-5fa5-4c88-8833-6f77ab654d69.png",
    about:
      "جائزة الملك عبد العزيز للجودة هي جائزة سعودية تهدف إلى تعزيز الجودة في مختلف القطاعات الحكومية والخاصة في المملكة العربية السعودية. أطلقت أمانة منطقة حائل فيديو تعريفيًا يُبرز مشاركتها في الدورة السابعة للجائزة لعام 2024.",
    scope: [
      "تحويل ملف الخدمات والإنجازات إلى سيناريو مرئي",
      "تصوير في 20+ موقعًا مختلفًا",
      "استخدام فويس أوفر (التعليق الصوتي)",
      "إضافة موشن جرافيك لإثراء المحتوى",
    ],
    result:
      "تم إنتاج فيديو مرئي مدته 51 دقيقة، تضمن جميع المتطلبات بشكل احترافي وعالي الجودة. حصلت الأمانة على المستوى البرونزي في الجائزة.",
  },
  {
    title: "Shdad",
    tag: "إعلان سردي",
    img: "https://platformm.sa/storage/media/bb7a9a0e-9791-4f03-bce6-dfb972df6d0e.png",
    about:
      "في إطار حملة دعائية مبتكرة، تم إنتاج فيديو إعلاني لمحل الشاي شداد بالتعاون مع الراوي السعودي المعروف محمد الشهران، بهدف إيصال رسالة العلامة التجارية بطريقة عفوية وأصيلة، دون الإفصاح المباشر عن نوع النشاط.",
    scope: [
      "إنتاج فيديو إعلاني بأسلوب سردي",
      "عدم الإفصاح عن نوع النشاط التجاري",
      "الاستعانة بصوت الراوي محمد الشهران",
      "تنفيذ العمل بالكامل بدون استخدام موسيقى",
    ],
    result:
      "تم تنفيذ فيديو إعلاني احترافي بمدة قصيرة، حقق تفاعلًا لافتًا عبر منصات التواصل الاجتماعي.",
    video: "1032864715",
    link: "https://vimeo.com/1032864715",
    linkLabel: "رابط المشاهدة",
  },
];

export default function ProjectsSection() {
  const [active, setActive] = useState(null);
  const project = active !== null ? PROJECTS[active] : null;

  return (
    <section id="projects" dir="rtl" className="relative bg-obsidian py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col items-start gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="flex items-center gap-3 font-mono text-xs tracking-[0.4em] text-amber">
              <span className="h-px w-8 bg-amber/60" />
              مشاريعنا الأخيرة
            </span>
            <h2 className="mt-4 font-display text-4xl font-black leading-tight text-studio-silver md:text-6xl">
              أعمال <span className="text-amber">صنعتها</span> الكاميرا
            </h2>
          </div>
          <span className="font-mono text-sm text-studio-silver/40">{PROJECTS.length} PROJECTS</span>
        </div>

        <div className="flex flex-col gap-px bg-studio-silver/10">
          {PROJECTS.map((p, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group grid w-full grid-cols-12 items-center gap-4 bg-slate-container p-5 text-right transition-colors hover:bg-obsidian md:gap-8 md:p-8"
            >
              <span className="col-span-2 font-mono text-sm text-studio-silver/40 md:col-span-1">
                0{i + 1}
              </span>
              <div className="col-span-10 flex items-center gap-4 md:col-span-4 md:gap-6">
                <div className="relative h-16 w-24 shrink-0 overflow-hidden border border-studio-silver/10 md:h-20 md:w-32">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div>
                  <h3 className="font-display text-lg font-black text-studio-silver md:text-2xl">
                    {p.title}
                  </h3>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-amber/70">
                    {p.tag}
                  </span>
                </div>
              </div>
              <p className="col-span-12 hidden truncate font-body text-sm text-studio-silver/50 md:col-span-5 md:block">
                {p.about}
              </p>
              <div className="col-span-12 flex justify-end md:col-span-2">
                <span className="flex items-center gap-2 font-mono text-xs tracking-wider text-studio-silver/50 transition-colors group-hover:text-amber">
                  التفاصيل
                  <ArrowUpLeft className="h-4 w-4" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {project && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] overflow-y-auto bg-obsidian/95 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <div className="mx-auto max-w-5xl px-6 py-20" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setActive(null)}
                className="absolute right-6 top-6 text-studio-silver/60 hover:text-amber"
              >
                <X className="h-7 w-7" />
              </button>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative mb-8 aspect-video w-full overflow-hidden border border-studio-silver/10"
              >
                {project.video ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${project.video}`}
                    title={project.title}
                    className="h-full w-full"
                    allow="autoplay; fullscreen"
                    frameBorder="0"
                  />
                ) : (
                  <img src={project.img} alt={project.title} className="h-full w-full object-cover" />
                )}
              </motion.div>

              <span className="font-mono text-xs tracking-[0.3em] text-amber/70">{project.tag}</span>
              <h3 className="mt-3 font-display text-3xl font-black text-studio-silver md:text-5xl">
                {project.title}
              </h3>

              <div className="mt-8">
                <h4 className="font-display text-lg font-black text-amber">عن العمل</h4>
                <p className="mt-3 font-body text-base leading-relaxed text-studio-silver/70">
                  {project.about}
                </p>
              </div>

              <div className="mt-8">
                <h4 className="font-display text-lg font-black text-amber">المطلوب للمشروع</h4>
                <ul className="mt-3 space-y-2">
                  {project.scope.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-3 font-body text-studio-silver/70">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-amber" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <h4 className="font-display text-lg font-black text-amber">النتيجة</h4>
                <p className="mt-3 font-body text-base leading-relaxed text-studio-silver/70">
                  {project.result}
                </p>
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-3 border border-amber bg-amber px-6 py-3 font-mono text-sm tracking-wider text-obsidian transition-colors hover:bg-transparent hover:text-amber"
                >
                  <Play className="h-4 w-4 fill-current" />
                  {project.linkLabel}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}