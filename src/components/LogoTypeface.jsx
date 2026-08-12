const LOGO_IMG =
  "https://media.base44.com/images/public/6a6f7ad42956b021bd3930bf/7394ef6e7_.png";

export default function LogoTypeface({ className = "" }) {
  return (
    <img
      src={LOGO_IMG}
      alt="Plat Form Media"
      className={`h-auto w-auto object-contain ${className}`}
    />
  );
}