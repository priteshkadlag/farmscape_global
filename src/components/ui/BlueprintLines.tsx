import { cn } from "@/lib/cn";

/**
 * Decorative engineering linework — a dimension line, a lattice truss and
 * grid markers — that draws itself in once on load (pure CSS, see .draw-line).
 */
export function BlueprintLines({ className }: { className?: string }) {
  return (
    <svg
      className={cn("pointer-events-none", className)}
      viewBox="0 0 1440 600"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      {/* Gridline markers */}
      <g className="draw-line" style={{ animationDelay: "0.1s" }}>
        <path pathLength={1} d="M1040 40 V560 M1240 40 V560" strokeDasharray="1" />
      </g>
      <g fontFamily="monospace" fontSize="11" fill="currentColor" stroke="none" className="fade-in-late">
        <circle cx="1040" cy="28" r="11" fill="none" stroke="currentColor" />
        <text x="1036" y="32">C</text>
        <circle cx="1240" cy="28" r="11" fill="none" stroke="currentColor" />
        <text x="1236" y="32">D</text>
        <text x="1118" y="510">SPAN</text>
      </g>
      {/* Lattice truss */}
      <path
        className="draw-line"
        style={{ animationDelay: "0.3s" }}
        pathLength={1}
        d="M900 380 L1380 300 M900 440 L1380 440 M900 380 V440 M960 370 L1000 440 L1040 363 L1080 440 L1120 356 L1160 440 L1200 350 L1240 440 L1280 343 L1320 440 L1380 300 V440"
      />
      {/* Dimension line */}
      <path className="draw-line" style={{ animationDelay: "0.6s" }} pathLength={1} d="M1040 492 H1240 M1040 484 V500 M1240 484 V500 M1034 498 L1046 486 M1234 498 L1246 486" />
    </svg>
  );
}
