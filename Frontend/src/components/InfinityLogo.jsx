import React from "react";

const PATH =
  "M50 25 C62 4 96 4 96 25 C96 46 62 46 50 25 C38 4 4 4 4 25 C4 46 38 46 50 25 Z";

// Gold infinity mark with a light that continuously traces the loop.
const InfinityLogo = ({ className = "" }) => (
  <svg viewBox="0 0 100 50" className={className} aria-hidden="true" fill="none">
    <defs>
      <linearGradient id="infGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f1e1b3" />
        <stop offset="50%" stopColor="#c9a45c" />
        <stop offset="100%" stopColor="#b08a3e" />
      </linearGradient>
    </defs>
    <path d={PATH} stroke="url(#infGold)" strokeOpacity="0.4" strokeWidth="5" strokeLinecap="round" />
    <path
      d={PATH}
      pathLength="100"
      stroke="#f1e1b3"
      strokeOpacity="0.35"
      strokeWidth="9"
      strokeLinecap="round"
      className="infinity-trace"
    />
    <path
      d={PATH}
      pathLength="100"
      stroke="#fff6d8"
      strokeWidth="5"
      strokeLinecap="round"
      className="infinity-trace"
    />
  </svg>
);

export default InfinityLogo;
