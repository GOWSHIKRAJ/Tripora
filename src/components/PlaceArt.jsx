import { useId } from 'react'
// Illustrated "postcard" shown whenever a photo is missing or fails to load, so the UI never shows a broken image.
// Scene follows the destination category; `variant` (0-3) picks dawn / day / dusk / night.
const PALETTES = [
  { sky: ['#F9D8A7', '#F3A98B', '#7FA6B5'], sun: '#FFF1C9', far: '#6E9AA6', mid: '#3F7885', near: '#1B4F5B', water: '#2E7C86' },
  { sky: ['#8FCBE0', '#CFE9F0', '#F7F5EF'], sun: '#FFF6D8', far: '#8DBFC4', mid: '#4C9A9B', near: '#247A7B', water: '#3A9AA3' },
  { sky: ['#3B3F73', '#C46A7E', '#F2A65A'], sun: '#FFD9A0', far: '#6C5B8C', mid: '#44406F', near: '#241F45', water: '#4A4F86' },
  { sky: ['#0B1D2E', '#12384B', '#1F5C6B'], sun: '#EAF4F4', far: '#1D4A58', mid: '#143846', near: '#0B2530', water: '#164557' },
]
const STARS = [[60, 50], [150, 120], [240, 70], [330, 150], [420, 40], [510, 110], [600, 60], [690, 140], [750, 50], [110, 190], [380, 200], [640, 210]]

const Sun = ({ p, x = 590, y = 240, r = 58 }) => <circle cx={x} cy={y} r={r} fill={p.sun} opacity=".95" />

const Beach = ({ p, night }) => (<>
  <Sun p={p} />
  <rect y="340" width="800" height="260" fill={p.water} />
  <path d="M0 380 Q100 360 200 380 T400 380 T600 380 T800 380 V600 H0Z" fill={p.mid} opacity=".55" />
  <path d="M0 435 Q120 412 240 435 T480 435 T720 435 T960 435 V600 H0Z" fill={p.mid} opacity=".8" />
  <path d="M0 530 Q200 470 420 515 T800 490 V600 H0Z" fill="#E9D3A5" opacity={night ? 0.4 : 1} />
  <path d="M130 540 C140 450 160 410 205 380" stroke={p.near} strokeWidth="9" fill="none" strokeLinecap="round" />
  {[-35, 10, 55, 160, 200].map((a) => <ellipse key={a} cx="205" cy="380" rx="62" ry="11" transform={`rotate(${a} 205 380)`} fill={p.near} />)}
  <polygon points="470,350 470,300 520,350" fill="#fff" opacity=".85" /><polygon points="462,352 530,352 515,364 477,364" fill={p.near} />
</>)

const Mountain = ({ p }) => (<>
  <Sun p={p} x={150} y={170} r={46} />
  <polygon points="0,430 170,240 300,380 430,190 610,400 700,300 800,430 800,600 0,600" fill={p.far} />
  <polygon points="-60,600 210,300 360,600" fill={p.mid} />
  <polygon points="250,600 520,280 800,600" fill={p.mid} opacity=".9" />
  <polygon points="430,190 392,250 428,238 448,262 470,240" fill="#fff" opacity=".9" />
  <polygon points="520,280 490,325 520,316 545,332" fill="#fff" opacity=".85" />
  <path d="M0 520 Q200 468 400 520 T800 500 V600 H0Z" fill={p.near} />
  {[60, 120, 640, 710].map((x, i) => <polygon key={x} points={`${x},${540 - i % 2 * 12} ${x - 26},${590} ${x + 26},590`} fill={p.near} stroke={p.mid} strokeWidth="2" />)}
</>)

const Cultural = ({ p, night }) => (<>
  <Sun p={p} x={650} y={170} r={44} />
  <path d="M0 400 Q150 320 300 390 T600 370 T800 390 V600 H0Z" fill={p.far} />
  <path d="M0 470 Q220 410 430 470 T800 450 V600 H0Z" fill={p.mid} />
  <rect x="0" y="520" width="800" height="80" fill={p.near} />
  <g fill="#B8472F"><rect x="285" y="270" width="26" height="250" /><rect x="489" y="270" width="26" height="250" />
    <path d="M225 262 Q400 222 575 262 L568 292 Q400 262 232 292Z" /><rect x="262" y="318" width="276" height="18" rx="3" /></g>
  <rect x="380" y="292" width="40" height="30" fill="#B8472F" />
  {night && <rect width="800" height="600" fill="#000" opacity=".18" />}
</>)

const WIN = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2], [1, 2], [2, 2], [0, 3], [1, 3], [2, 3], [0, 4], [1, 4], [2, 4]]
const BUILDINGS = [[30, 330, 80], [120, 250, 84], [214, 350, 66], [290, 190, 96], [396, 280, 72], [478, 220, 104], [592, 320, 72], [674, 260, 84], [760, 350, 48]]
const City = ({ p, night, dusk }) => (<>
  <Sun p={p} x={680} y={150} r={40} />
  <polygon points="334,190 346,120 358,190" fill={p.near} /><rect x="344" y="92" width="4" height="32" fill={p.near} />
  {BUILDINGS.map(([x, top, w], i) => (
    <g key={x}>
      <rect x={x} y={top} width={w} height={540 - top} fill={i % 2 ? p.mid : p.near} />
      {WIN.filter(([c, r]) => 60 + r * 38 < 540 - top && (c + r + i) % 3 !== 0).map(([c, r]) => (
        <rect key={`${c}${r}`} x={x + 10 + c * (w - 20) / 3} y={top + 14 + r * 38} width={Math.max(8, (w - 40) / 3)} height="14" rx="2" fill={night || dusk ? '#FFD98A' : '#fff'} opacity={night || dusk ? 0.85 : 0.3} />))}
    </g>))}
  <rect y="540" width="800" height="60" fill={p.near} /><rect y="548" width="800" height="3" fill={p.sun} opacity=".5" />
</>)

const Nature = ({ p }) => (<>
  <Sun p={p} x={150} y={190} r={50} />
  <path d="M0 360 Q160 260 330 350 T640 330 T800 350 V600 H0Z" fill={p.far} />
  <path d="M0 440 Q200 360 400 440 T800 420 V600 H0Z" fill={p.mid} />
  <ellipse cx="400" cy="490" rx="250" ry="36" fill={p.water} opacity=".9" />
  <path d="M0 520 Q250 480 450 530 T800 510 V600 H0Z" fill={p.near} />
  {[[90, 470], [170, 490], [640, 460], [720, 485], [560, 500]].map(([x, y], i) => (
    <g key={x}><rect x={x - 4} y={y} width="8" height="40" fill={p.near} /><circle cx={x} cy={y - 14} r={26 - i % 2 * 4} fill={p.mid} stroke={p.near} strokeWidth="3" /></g>))}
</>)

const Luxury = ({ p }) => (<>
  <Sun p={p} x={400} y={250} r={70} />
  <rect y="340" width="800" height="260" fill={p.water} />
  {[360, 400, 440, 480, 520].map((y, i) => <rect key={y} x={300 - i * 24} y={y} width={200 + i * 48} height="3" fill={p.sun} opacity={0.5 - i * 0.08} />)}
  <rect x="60" y="458" width="680" height="8" fill="#D9C7A3" opacity=".9" />
  {[110, 340, 570].map((x, i) => (
    <g key={x}>
      <polygon points={`${x - 8},${392 - i * 8} ${x + 128},${392 - i * 8} ${x + 100},${366 - i * 8} ${x + 20},${366 - i * 8}`} fill={p.near} />
      <rect x={x} y={392 - i * 8} width="120" height={36 + i * 8} fill="#F4EBDD" />
      <rect x={x + 14} y={404 - i * 8} width="26" height="24" fill={p.water} opacity=".7" /><rect x={x + 80} y={404 - i * 8} width="26" height="24" fill={p.water} opacity=".7" />
      {[x + 10, x + 56, x + 106].map((sx) => <rect key={sx} x={sx} y={428} width="4" height={32} fill="#8C7A58" />)}
    </g>))}
</>)

const SCENES = { Beach, Mountain, Cultural, City, Nature, Luxury }

export default function PlaceArt({ category = 'Nature', variant = 0, label, className = '' }) {
  const gid = 'pa' + useId().replace(/[^a-zA-Z0-9]/g, '')
  const v = ((variant % 4) + 4) % 4
  const p = PALETTES[v]
  const Scene = SCENES[category] || Nature
  return (
    <svg className={`art ${className}`} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">{p.sky.map((c, i) => <stop key={i} offset={`${i * 50}%`} stopColor={c} />)}</linearGradient></defs>
      <rect width="800" height="600" fill={`url(#${gid})`} />
      {v === 3 && STARS.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 3 ? 1.6 : 2.4} fill="#fff" opacity=".8" />)}
      <Scene p={p} night={v === 3} dusk={v === 2} />
    </svg>
  )
}
