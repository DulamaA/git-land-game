type Props = { className?: string };

export default function GitLandLogo({ className = '' }: Props) {
  return (
    <svg
      viewBox="0 0 520 120"
      role="img"
      aria-label="Git-Land"
      className={`h-14 md:h-16 ${className}`}
    >
      <text
        x="10"
        y="78"
        fontFamily="Inter, ui-sans-serif, system-ui"
        fontWeight="800"
        fontSize="56"
        fill="#0f172a"
      >
        Git-<tspan fill="#16a34a">Land</tspan>
      </text>

      <g
        transform="translate(340,26)"
        fill="none"
        stroke="#16a34a"
        strokeWidth="6"
        strokeLinecap="round"
      >
        <path d="M0 18 C 18 18, 24 30, 24 42 C24 62, 40 66, 60 66" />

        <circle cx="0" cy="18" r="6" fill="#16a34a" />
        <circle cx="24" cy="42" r="6" fill="#16a34a" />

        <path
          d="M62 50
             C 82 34, 106 36, 116 52
             C 106 70, 82 72, 66 58
             Z"
          fill="#22c55e"
          stroke="#16a34a"
        />

        <path d="M64 58 L112 50" stroke="#0f7a39" strokeWidth="3" />
        <path d="M82 45 L74 50" stroke="#0f7a39" strokeWidth="2" />
        <path d="M96 44 L90 49" stroke="#0f7a39" strokeWidth="2" />
      </g>
    </svg>
  );
}
