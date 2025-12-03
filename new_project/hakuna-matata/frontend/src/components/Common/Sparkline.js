import React from 'react';

// Very small, dependency-free sparkline using SVG rects.
// Props: data: number[], width, height, barColor
export default function Sparkline({ data = [], width = 120, height = 28, barColor = '#3b82f6' }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
        —
      </div>
    );
  }
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pad = 2;
  const w = width;
  const h = height;
  const bw = Math.max(1, (w - pad * 2) / data.length - 2);

  const bars = data.map((v, i) => {
    const norm = (v - min) / (max - min || 1);
    const barH = Math.max(1, Math.round(norm * (h - pad * 2)));
    const x = pad + i * (bw + 2);
    const y = h - pad - barH;
    return { x, y, w: bw, h: barH, v };
  });

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      {bars.map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            fill={barColor}
            opacity={0.9}
          >
            <title>{`#${i + 1}: ${b.v}`}</title>
          </rect>
        </g>
      ))}
    </svg>
  );
}
