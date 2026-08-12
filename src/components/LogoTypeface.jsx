export default function LogoTypeface({ className = "" }) {
  return (
    <span
      className={`font-display font-black uppercase leading-none tracking-[0.06em] text-studio-silver ${className}`}
    >
      PLAT<span className="text-amber">·</span>FORM
    </span>
  );
}