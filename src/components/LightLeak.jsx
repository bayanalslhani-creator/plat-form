export default function LightLeak() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden mix-blend-screen"
    >
      <div className="absolute -top-40 left-1/2 h-[55vh] w-[75vw] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[140px]" />
      <div className="absolute top-1/4 -right-32 h-[40vh] w-[40vh] rounded-full bg-white/[0.04] blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[45vh] w-[45vh] rounded-full bg-white/[0.05] blur-[130px]" />
    </div>
  );
}