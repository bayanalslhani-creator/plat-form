export default function LogoMark({ className = "h-20 w-auto" }) {
  return (
    <svg
      viewBox="0 0 248 96"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Plat Form"
    >
      {/* top filled semicircle */}
      <path d="M12 48 A36 36 0 0 1 84 48 Z" fill="white" />
      {/* bottom outer arc */}
      <path d="M12 48 A36 36 0 0 0 84 48" stroke="white" strokeWidth="4" />
      {/* bottom inner arc */}
      <path d="M22 48 A26 26 0 0 0 74 48" stroke="white" strokeWidth="4" />
      {/* wordmark */}
      <text
        x="100"
        y="42"
        fill="white"
        fontFamily="'Avenir Next','Avenir',sans-serif"
        fontSize="32"
        fontWeight="800"
        letterSpacing="0.5"
      >
        Plat
      </text>
      <text
        x="100"
        y="80"
        fill="white"
        fontFamily="'Avenir Next','Avenir',sans-serif"
        fontSize="32"
        fontWeight="800"
        letterSpacing="0.5"
      >
        Form
      </text>
    </svg>
  );
}