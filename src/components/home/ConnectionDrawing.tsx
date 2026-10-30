// Portal-frame eaves connection: column, rafter, haunch and bolted end plate,
// drawn for the X-ray scene. Geometry is in a 1600×900 sheet; the rafter
// rises at 1:5.5 to the right.
const slope = 0.18;
const rafterY = (x: number, y0: number) => y0 - slope * (x - 1092);
const boltRows = [320, 360, 440, 500, 560, 600];

const label = "fill-steel-300 font-mono text-[13px] uppercase tracking-[0.16em]";

/**
 * Forces carry `data-force` and draw on scroll; everything else is the
 * drawing itself and is always complete.
 */
export function ConnectionDrawing({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className={className} fill="none" aria-hidden="true">
      {/* Centrelines and grid bubble */}
      <g className="stroke-steel-500" strokeWidth="1" strokeDasharray="22 6 4 6">
        <path d="M1000 200V900" />
        <path d={`M1092 336L1600 ${rafterY(1600, 336)}`} />
      </g>
      <circle cx="1000" cy="160" r="20" className="stroke-steel-400" strokeWidth="1.25" />
      <text x="1000" y="166" textAnchor="middle" className="fill-steel-300 font-mono text-[15px]">
        A
      </text>
      <path d="M1000 180V200" className="stroke-steel-400" strokeWidth="1.25" />

      {/* Column (UC) with cap plate and web stiffeners */}
      <g className="stroke-paper" strokeWidth="2" strokeLinejoin="round">
        <path d="M930 250V900M1070 250V900M920 238H1080V250H920Z" />
      </g>
      <g className="stroke-paper/60" strokeWidth="1.25">
        <path d="M948 250V900M1052 250V900" />
        <path d="M948 280H1052V296H948ZM948 632H1052V648H948Z" />
      </g>

      {/* Rafter (UB), end plate and haunch */}
      <g className="stroke-paper" strokeWidth="2" strokeLinejoin="round">
        <path d={`M1092 280L1600 ${rafterY(1600, 280)}M1092 392L1380 ${rafterY(1380, 392)}L1600 ${rafterY(1600, 392)}`} />
        <path d="M1070 262H1092V640H1070Z" />
        <path d={`M1092 640L1380 ${rafterY(1380, 392)}`} />
      </g>
      <g className="stroke-paper/60" strokeWidth="1.25">
        <path d={`M1092 296L1600 ${rafterY(1600, 296)}M1092 376L1600 ${rafterY(1600, 376)}`} />
        <path d={`M1092 624L1364 ${rafterY(1364, 392)}`} />
      </g>

      {/* Bolts through end plate and column flange */}
      {boltRows.map((y) => (
        <g key={y}>
          <path d={`M1036 ${y}H1128`} className="stroke-steel-500" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="1081" cy={y} r="9" className="stroke-paper" strokeWidth="1.5" />
          <path d={`M1075 ${y}H1087M1081 ${y - 6}V${y + 6}`} className="stroke-paper/70" strokeWidth="1" />
        </g>
      ))}

      {/* Dimensions */}
      <g className="stroke-steel-400" strokeWidth="1">
        <path d="M880 262V640M870 262H890M870 640H890M874 268L886 256M874 646L886 634" />
        <path d="M1092 700H1380M1092 690V710M1380 690V710M1086 706L1098 694M1374 706L1386 694" />
      </g>
      <text x="866" y="455" textAnchor="middle" transform="rotate(-90 866 455)" className={label}>
        650
      </text>
      <text x="1236" y="726" textAnchor="middle" className={label}>
        1600
      </text>

      {/* Callouts */}
      <g className="stroke-steel-400" strokeWidth="1">
        <path d="M1000 288L880 196H700" />
        <path d={`M1480 ${rafterY(1480, 280) - 4}L1520 150H1560`} />
        <path d="M1092 500H1440" />
        <path d="M1092 600L1180 760H1340" />
        <path d={`M1236 ${640 - ((1236 - 1092) / 288) * (640 - rafterY(1380, 392))}L1300 600H1440`} />
      </g>
      <text x="700" y="188" className={label}>
        Web stiffener
      </text>
      <text x="1400" y="142" className={label}>
        Rafter · UB
      </text>
      <text x="1450" y="505" className={label}>
        M20 bolts · Class 8.8
      </text>
      <text x="1180" y="782" className={label}>
        End plate · 25 thk
      </text>
      <text x="1450" y="605" className={label}>
        Haunch
      </text>
      <text x="1086" y="862" className={label}>
        Column · UC
      </text>

      {/* The forces: what the drawing exists to resolve */}
      <g className="stroke-lime" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path data-force pathLength={1} d="M1000 96V214M988 200L1000 216L1012 200" />
        <path data-force pathLength={1} d="M1188 238A150 150 0 1 0 1150 470M1138 452L1150 472L1170 462" />
        <path data-force pathLength={1} d={`M1600 ${rafterY(1600, 336)}L1092 336L1000 352V900`} strokeWidth="2" />
        <path data-force pathLength={1} d="M1140 320H1206M1194 310L1208 320L1194 330M1140 360H1206M1194 350L1208 360L1194 370" strokeWidth="2.25" />
      </g>
      <g className="fill-lime font-mono text-[15px] uppercase tracking-[0.18em]">
        <text data-force-label x="1036" y="128">
          N · Axial
        </text>
        <text data-force-label x="1196" y="226">
          M · Moment
        </text>
        <text data-force-label x="1216" y="345">
          T · Tension
        </text>
      </g>

      {/* Title block */}
      <g className="stroke-steel-500" strokeWidth="1">
        <path d="M1150 800H1490V860H1150ZM1150 830H1490" />
      </g>
      <text x="1164" y="821" className="fill-paper font-mono text-[13px] uppercase tracking-[0.16em]">
        Detail 01 — Eaves connection
      </text>
      <text x="1164" y="851" className={label}>
        Scale 1:10 · Formscape Global
      </text>
    </svg>
  );
}
