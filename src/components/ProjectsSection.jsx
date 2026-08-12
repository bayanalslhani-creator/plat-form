import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";

const PROJECTS = [
  {
    title: "Evennees Cafe",
    tag: "إدارة وتسويق",
    category: "تسويق",
    img: "https://media.base44.com/images/public/6a6f7ad42956b021bd3930bf/7dc015088_1.jpg",
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
    category: "تسويق",
    img: "https://media.base44.com/images/public/6a6f7ad42956b021bd3930bf/70b58eb29_2.jpg",
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
    category: "إعلانات",
    img: "https://media.base44.com/images/public/6a6f7ad42956b021bd3930bf/c94892e86_3.jpg",
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
    category: "وثائقي",
    img: "https://media.base44.com/images/public/6a6f7ad42956b021bd3930bf/80c0a4806_4.jpg",
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
    category: "إعلانات",
    img: "https://media.base44.com/images/public/6a6f7ad42956b021bd3930bf/e2e483d25_5.jpg",
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

function MediaFrame({ project, animated }) {
  if (project.videoUrl) {
    return (
      <video
        src={project.videoUrl}
        autoPlay={animated}
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      />
    );
  }
  if (project.video) {
    const params = animated
      ? "?autoplay=1&muted=1&loop=1&autopause=0&background=1"
      : "";
    return (
      <iframe
        src={`https://player.vimeo.com/video/${project.video}${params}`}
        title={project.title}
        className="h-full w-full"
        allow="autoplay; fullscreen"
        frameBorder="0"
      />
    );
  }
  return (
    <img
      src={project.img}
      alt={project.title}
      className="h-full w-full bg-black object-contain"
    />
  );
}

export default function ProjectsSection() {
  const [active, setActive] = useState(0);
  const [detail, setDetail] = useState(null);
  const detailProject = detail !== null ? PROJECTS[detail] : null;
  const scrollerRef = useRef(null);
  const cardRefs = useRef([]);

  const onScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const center =
      scroller.getBoundingClientRect().left + scroller.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const c = el.getBoundingClientRect().left + el.clientWidth / 2;
      const d = Math.abs(c - center);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setActive(nearest);
  }, []);

  const scrollTo = (i) => {
    const clamped = Math.max(0, Math.min(PROJECTS.length - 1, i));
    cardRefs.current[clamped]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const go = (dir) => scrollTo(active + dir);

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
        </div>

        {/* horizontal poster carousel */}
        <div className="relative">
          {/* edge blur */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 backdrop-blur-md md:w-40"
            style={{
              WebkitMaskImage: "linear-gradient(to left, black, transparent)",
              maskImage: "linear-gradient(to left, black, transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 backdrop-blur-md md:w-40"
            style={{
              WebkitMaskImage: "linear-gradient(to right, black, transparent)",
              maskImage: "linear-gradient(to right, black, transparent)",
            }}
          />
          {/* edge fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-16 bg-gradient-to-l from-obsidian to-transparent md:w-40" />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-16 bg-gradient-to-r from-obsidian to-transparent md:w-40" />

          <div
            ref={scrollerRef}
            onScroll={onScroll}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[14vw] pb-6 md:gap-8 md:px-[24vw]"
          >
            {PROJECTS.map((p, i) => (
              <button
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                onClick={() => setDetail(i)}
                aria-label={p.title}
                className="group relative flex h-[68vh] max-h-[680px] shrink-0 snap-center items-end"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-full w-auto max-w-none object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
                {/* text overlay */}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 text-right md:p-8">
                  <span className="block font-mono text-[10px] tracking-[0.3em] text-studio-silver/70">
                    {p.tag}
                  </span>
                  <span className="mt-1 block font-display text-2xl font-black text-white md:text-3xl">
                    {p.title}
                  </span>
                  <span className="mt-2 inline-flex items-center gap-2 font-body text-xs tracking-wide text-amber">
                    لمعرفة المزيد
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* position indicator + arrows */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            disabled={active === 0}
            aria-label="السابق"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-studio-silver/15 bg-white/5 text-studio-silver/70 transition-colors hover:border-amber hover:text-amber disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <span className="font-mono text-sm tracking-widest text-studio-silver/60">
            <span className="text-amber">{String(active + 1).padStart(2, "0")}</span> / {String(PROJECTS.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => go(1)}
            disabled={active === PROJECTS.length - 1}
            aria-label="التالي"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-studio-silver/15 bg-white/5 text-studio-silver/70 transition-colors hover:border-amber hover:text-amber disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* full detail modal */}
      <AnimatePresence>
        {detailProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] overflow-y-auto bg-obsidian/95 backdrop-blur-sm"
            onClick={() => setDetail(null)}
          >
            <div className="mx-auto max-w-5xl px-6 py-20" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setDetail(null)}
                className="absolute right-6 top-6 text-studio-silver/60 hover:text-amber"
              >
                <X className="h-7 w-7" />
              </button>

              <div className="relative mb-8 aspect-video w-full overflow-hidden border border-studio-silver/10">
                <MediaFrame project={detailProject} animated={false} />
              </div>

              <span className="font-mono text-xs tracking-[0.3em] text-amber/70">{detailProject.tag}</span>
              <h3 className="mt-3 font-display text-3xl font-black text-studio-silver md:text-5xl">
                {detailProject.title}
              </h3>

              <div className="mt-8">
                <h4 className="font-display text-lg font-black text-amber">عن العمل</h4>
                <p className="mt-3 font-body text-base leading-relaxed text-studio-silver/70">
                  {detailProject.about}
                </p>
              </div>

              <div className="mt-8">
                <h4 className="font-display text-lg font-black text-amber">المطلوب للمشروع</h4>
                <ul className="mt-3 space-y-2">
                  {detailProject.scope.map((s, idx) => (
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
                  {detailProject.result}
                </p>
              </div>

              {detailProject.link && (
                <a
                  href={detailProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-3 rounded-lg border border-amber bg-amber px-6 py-3 font-body text-sm tracking-wider text-white transition-colors hover:bg-transparent hover:text-amber"
                >
                  <Play className="h-4 w-4 fill-current" />
                  {detailProject.linkLabel}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}