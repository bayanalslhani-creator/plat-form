import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";


function MediaFrame({ project, animated }) {
  if (project.videoUrl) {
    return (
      <video
        src={project.videoUrl}
        autoPlay={animated}
        muted
        loop
        playsInline
        className="h-full w-full object-cover" />);


  }
  if (project.video) {
    const params = animated ?
    "?autoplay=1&muted=1&loop=1&autopause=0&background=1" :
    "";
    return (
      <iframe
        src={`https://player.vimeo.com/video/${project.video}${params}`}
        title={project.title}
        className="h-full w-full"
        allow="autoplay; fullscreen"
        frameBorder="0" />);


  }
  return (
    <img
      src={project.img}
      alt={project.title}
      className="h-full w-full object-cover" />);


}

export default function ProjectsSection() {
  const { content } = useSiteContent();
  const PROJECTS = content.projects.items;
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
      block: "nearest"
    });
  };

  const go = (dir) => scrollTo(active + dir);

  return (
    <section id="projects" dir="rtl" className="relative bg-obsidian py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col items-start gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="block h-px w-8 bg-amber/60" />
            <span className="mt-4 block font-mono tracking-[0.4em] text-studio-silver text-lg md:text-xl">مشاريعنا الأخيرة</span>
            <h2 className="mt-3 text-3xl leading-tight text-studio-silver md:text-5xl [font-family:'SF_Arabic',_sans-serif] font-medium">
              أعمال <span className="text-amber">صنعتها</span> الكاميرا
            </h2>
          </div>
        </div>

        {/* horizontal poster carousel */}
        <div className="relative">
          {/* edge fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-16 bg-gradient-to-l from-obsidian to-transparent md:w-40" />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-16 bg-gradient-to-r from-obsidian to-transparent md:w-40" />

          <div
            ref={scrollerRef}
            onScroll={onScroll}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[14vw] pb-6 md:gap-8 md:px-[24vw]">
            
            {PROJECTS.map((p, i) =>
            <button
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onClick={() => setDetail(i)}
              aria-label={p.title}
              className="group relative flex h-[68vh] max-h-[680px] shrink-0 snap-center items-end">
              
                <img
                src={p.img}
                alt={p.title}
                className="h-full w-auto max-w-none object-contain transition-transform duration-500 group-hover:scale-[1.02]" />
              
                {/* top gradient */}
                <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/40 to-transparent" />
                {/* text overlay */}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 text-right md:p-5">
                  <span className="block font-mono text-[9px] tracking-[0.25em] text-white">
                    {p.tag}
                  </span>
                  <span className="mt-1 block font-display text-xl font-black leading-tight text-white md:text-3xl">
                    {p.title}
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1.5 font-body text-[10px] tracking-wide text-white">
                    لمعرفة المزيد
                    <ChevronLeft className="h-3 w-3" />
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>

        {/* position indicator + arrows */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            disabled={active === 0}
            aria-label="السابق"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-studio-silver/15 bg-white/5 text-studio-silver/70 transition-colors hover:border-amber hover:text-amber disabled:opacity-30">
            
            <ChevronRight className="h-5 w-5" />
          </button>
          <span className="font-mono text-sm tracking-widest text-studio-silver/60">
            <span className="text-amber">{String(active + 1).padStart(2, "0")}</span> / {String(PROJECTS.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => go(1)}
            disabled={active === PROJECTS.length - 1}
            aria-label="التالي"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-studio-silver/15 bg-white/5 text-studio-silver/70 transition-colors hover:border-amber hover:text-amber disabled:opacity-30">
            
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* full detail modal */}
      <AnimatePresence>
        {detailProject &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] overflow-y-auto bg-obsidian/95 backdrop-blur-sm"
          onClick={() => setDetail(null)}>
          
            <div className="mx-auto max-w-5xl px-6 py-20" onClick={(e) => e.stopPropagation()}>
              <button
              onClick={() => setDetail(null)}
              className="absolute right-6 top-6 text-studio-silver/60 hover:text-white">
              
                <X className="h-7 w-7" />
              </button>

              {detailProject.video || detailProject.videoUrl ?
            <div className="relative mb-8 aspect-video w-full overflow-hidden">
                  <MediaFrame project={detailProject} animated={false} />
                </div> :

            <img src={detailProject.img} alt={detailProject.title} className="mb-8 block h-auto w-full" />
            }

              <span className="font-mono tracking-[0.3em] text-white/70 text-base">{detailProject.tag}</span>
              <h3 className="mt-3 font-display text-4xl font-black text-white md:text-6xl">
                {detailProject.title}
              </h3>

              <div className="mt-8">
                <h4 className="font-display font-black text-white text-3xl">عن العمل</h4>
                <p className="mt-3 font-body text-base leading-relaxed text-white/90">
                  {detailProject.about}
                </p>
              </div>

              <div className="mt-8">
                <h4 className="font-display font-black text-white text-3xl">المطلوب للمشروع</h4>
                <ul className="mt-3 space-y-2">
                  {detailProject.scope.map((s, idx) =>
                <li key={idx} className="flex items-start gap-3 font-body text-white/90">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-white" />
                      {s}
                    </li>
                )}
                </ul>
              </div>

              <div className="mt-8">
                <h4 className="font-display font-black text-white text-3xl">النتيجة</h4>
                <p className="mt-3 font-body text-base leading-relaxed text-studio-silver/70">
                  {detailProject.result}
                </p>
              </div>

              {detailProject.link &&
            <a
              href={detailProject.link}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-lg border border-white bg-white px-6 py-3 font-body text-sm tracking-wider text-obsidian transition-colors hover:bg-transparent hover:text-white">
              
                  <Play className="h-4 w-4 fill-current" />
                  {detailProject.linkLabel}
                </a>
            }
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </section>);

}