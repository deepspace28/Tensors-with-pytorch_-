export function generateFaviconSVG() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <polygon points="32,4 56,20 56,44 32,60 8,44 8,20" stroke="#000000" strokeWidth="1.5" fill="none" />
      <polygon points="32,12 48,22 48,42 32,52 16,42 16,22" stroke="#000000" strokeWidth="1.5" fill="none" />
      <polygon points="32,20 40,25 40,35 32,40 24,35 24,25" stroke="#000000" strokeWidth="1.5" fill="none" />
      <line x1="32" y1="4" x2="32" y2="60" stroke="#000000" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="8" y1="20" x2="56" y2="20" stroke="#000000" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="8" y1="44" x2="56" y2="44" stroke="#000000" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="32" cy="32" r="3" fill="#000000" />
    </svg>
  `
}
