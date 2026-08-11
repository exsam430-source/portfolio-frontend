import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../../context';

// ═══════════════════════════════════════════════════════════════
// 🧬 QUANTUM CONSTANTS
// ═══════════════════════════════════════════════════════════════
const PHASES = {
  VOID: 'void',           // 0-1s   : Deep space quantum void
  CONSCIOUSNESS: 'consciousness', // 1-2s : Sphere awakens
  DNA: 'dna',             // 2-3s   : DNA helix forms
  MATRIX: 'matrix',       // 3-4s   : Quantum grid materializes
  WEAVING: 'weaving',     // 4-5s   : Reality weaves
  SINGULARITY: 'singularity', // 5-6s : Explosion of light
  IDENTITY: 'identity',   // 6-7s   : Identity card reveals
  DONE: 'done',
};

const COLORS = {
  purple: '#6c63ff',
  pink: '#ff6584',
  green: '#43e97b',
  cyan: '#00f5ff',
  gold: '#ffd700',
  white: '#ffffff',
  bg: '#020510',
};

const ACHIEVEMENTS = [
  { id: 1, icon: '🧠', xp: 50,  label: 'Neural Network Connected', delay: 1200 },
  { id: 2, icon: '⚛️', xp: 100, label: 'Quantum State Achieved',   delay: 2400 },
  { id: 3, icon: '🧬', xp: 250, label: 'DNA Sequence Complete',     delay: 3600 },
  { id: 4, icon: '💎', xp: 500, label: 'Identity Verified',         delay: 5800 },
];

const BOOT_LOGS = [
  { text: '> REALITY.exe not found...', color: '#ff6584' },
  { text: '> Searching quantum realm...', color: '#6c63ff' },
  { text: '> Consciousness.init()', color: '#6c63ff' },
  { text: '> Loading neural.net v9.0...', color: '#6c63ff' },
  { text: '> DNA_sequence.compile()', color: '#00f5ff' },
  { text: '> Personality matrix... OK', color: '#43e97b' },
  { text: '> Quantum links established', color: '#6c63ff' },
  { text: '> Biometric scan... OK', color: '#43e97b' },
  { text: '> React:   [████████] 95%', color: '#6c63ff' },
  { text: '> Node:    [████████] 92%', color: '#6c63ff' },
  { text: '> MongoDB: [███████░] 90%', color: '#6c63ff' },
  { text: '> Reality fabric... WOVEN', color: '#00f5ff' },
  { text: '> Singularity event... BOOM', color: '#ffd700' },
  { text: '> [✓] IDENTITY VERIFIED', color: '#43e97b' },
  { text: '> [✓] SYSTEM ONLINE', color: '#43e97b' },
];

// ═══════════════════════════════════════════════════════════════
// 🎨 HELPER: Responsive sizes
// ═══════════════════════════════════════════════════════════════
function useSizes(isMobile) {
  return {
    // Panels
    panelFont:    isMobile ? '0.48rem' : '0.68rem',
    panelPad:     isMobile ? '8px'     : '14px',
    panelTitle:   isMobile ? '0.38rem' : '0.52rem',

    // Terminal
    termW:        isMobile ? '145px'   : '265px',
    termTop:      isMobile ? '58px'    : '78px',
    termMaxH:     isMobile ? '155px'   : '285px',
    termLines:    isMobile ? 6         : 15,

    // Fingerprint
    fpTop:        isMobile ? '58px'    : '78px',
    fpW:          isMobile ? '105px'   : '185px',
    fpSize:       isMobile ? '52px'    : '82px',

    // Stats/Location
    panelBottom:  isMobile ? '82px'    : '78px',
    statsW:       isMobile ? '135px'   : '205px',
    locationMaxW: isMobile ? '115px'   : '175px',

    // HUD
    hudFont:      isMobile ? '0.48rem' : '0.58rem',
    hudTop:       isMobile ? '14px'    : '18px',
    hudPad:       isMobile ? '3px 8px' : '5px 14px',
    hudGap:       isMobile ? '6px'     : '14px',

    // Corner brackets
    cornerSz:     isMobile ? '22px'    : '48px',
    cornerOff:    isMobile ? '5px'     : '18px',

    // Network
    networkSz:    isMobile ? '82vw'    : 'min(480px, 65vw)',

    // Card
    logoSz:       isMobile ? '62px'    : '92px',
    logoFont:     isMobile ? '22px'    : '34px',
    nameSz:       isMobile ? '1.15rem' : '2.1rem',
    titleFont:    isMobile ? '0.52rem' : '0.68rem',
    cardPad:      isMobile ? '18px 14px' : '30px',
    cardMaxW:     isMobile ? '278px'   : '420px',

    // Progress
    progW:        isMobile ? '84vw'    : 'min(420px, 82vw)',
    progBottom:   isMobile ? '14px'    : '28px',
    progFont:     isMobile ? '0.48rem' : '0.58rem',

    // Skip
    skipTop:      isMobile ? '16px'    : '18px',
    skipRight:    isMobile ? '12px'    : '18px',
    skipFont:     isMobile ? '0.45rem' : '0.58rem',

    // DNA
    dnaW:         isMobile ? '40px'    : '60px',
    dnaH:         isMobile ? '200px'   : '320px',

    // Achievement
    achW:         isMobile ? '200px'   : '280px',
    achFont:      isMobile ? '0.5rem'  : '0.65rem',
  };
}

// ═══════════════════════════════════════════════════════════════
// 🧬 SUB-COMPONENT: DNA Helix
// ═══════════════════════════════════════════════════════════════
function DNAHelix({ isMobile, S }) {
  const points = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none z-20"
      style={{ width: S.dnaW, height: S.dnaH }}
    >
      <svg viewBox="0 0 60 320" className="w-full h-full">
        <defs>
          <filter id="dnaGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {points.map((i) => {
          const y1 = 20 + i * 24;
          const x1Left  = 15 + Math.sin((i / points.length) * Math.PI * 2) * 18;
          const x1Right = 45 - Math.sin((i / points.length) * Math.PI * 2) * 18;
          const y2 = y1 + 12;
          const x2Left  = 15 + Math.sin(((i + 0.5) / points.length) * Math.PI * 2) * 18;
          const x2Right = 45 - Math.sin(((i + 0.5) / points.length) * Math.PI * 2) * 18;

          return (
            <motion.g key={i} filter="url(#dnaGlow)">
              {/* Backbone left */}
              <motion.circle cx={x1Left} cy={y1} r="3"
                fill={COLORS.purple}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.3, 1], opacity: 1 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              />
              {/* Backbone right */}
              <motion.circle cx={x1Right} cy={y1} r="3"
                fill={COLORS.cyan}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.3, 1], opacity: 1 }}
                transition={{ delay: i * 0.08 + 0.04, duration: 0.4 }}
              />
              {/* Rung */}
              <motion.line
                x1={x1Left} y1={y1} x2={x1Right} y2={y1}
                stroke={i % 3 === 0 ? COLORS.pink : i % 3 === 1 ? COLORS.green : COLORS.gold}
                strokeWidth="1.5"
                strokeDasharray="2,1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ delay: i * 0.08 + 0.1, duration: 0.3 }}
              />
              {/* Mid backbone segments */}
              {i < points.length - 1 && (
                <>
                  <motion.line
                    x1={x1Left} y1={y1} x2={x2Left} y2={y2}
                    stroke={COLORS.purple} strokeWidth="1.5" opacity="0.6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: i * 0.08 + 0.05, duration: 0.3 }}
                  />
                  <motion.line
                    x1={x1Right} y1={y1} x2={x2Right} y2={y2}
                    stroke={COLORS.cyan} strokeWidth="1.5" opacity="0.6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: i * 0.08 + 0.05, duration: 0.3 }}
                  />
                </>
              )}
            </motion.g>
          );
        })}

        {/* Traveling data pulse */}
        <motion.circle r="4" fill={COLORS.pink}
          style={{ filter: 'drop-shadow(0 0 6px #ff6584)' }}
          animate={{
            cy: [20, 300, 20],
            cx: [15, 45, 15],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ⚛️ SUB-COMPONENT: Quantum Sphere
// ═══════════════════════════════════════════════════════════════
function QuantumSphere({ phase }) {
  const isActive = [PHASES.CONSCIOUSNESS, PHASES.MATRIX,
                    PHASES.WEAVING, PHASES.SINGULARITY].includes(phase);
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative flex items-center justify-center">
        {/* Outer rings */}
        {[120, 90, 60].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full border"
            style={{
              width: size, height: size,
              borderColor: [COLORS.purple, COLORS.cyan, COLORS.pink][i],
              borderWidth: '1px',
              opacity: 0.4,
            }}
            animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'linear' }}
          />
        ))}

        {/* Core sphere */}
        <motion.div
          className="relative rounded-full flex items-center justify-center"
          style={{
            width: 40, height: 40,
            background: 'radial-gradient(circle at 35% 35%, #ffffff, #6c63ff, #020510)',
            boxShadow: isActive
              ? '0 0 60px #6c63ff, 0 0 120px rgba(108,99,255,0.4)'
              : '0 0 20px rgba(108,99,255,0.3)',
          }}
          animate={{
            scale: isActive ? [1, 1.15, 1] : 1,
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span style={{ fontSize: '14px' }}>⚛️</span>
        </motion.div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🏆 SUB-COMPONENT: Achievement Toast
// ═══════════════════════════════════════════════════════════════
function AchievementToast({ achievement, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ x: 120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 120, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="flex items-center gap-2 rounded-xl font-mono"
      style={{
        padding: '10px 14px',
        background: 'rgba(10,15,30,0.95)',
        border: `1px solid ${COLORS.gold}`,
        boxShadow: `0 0 20px rgba(255,215,0,0.3)`,
        backdropFilter: 'blur(12px)',
        minWidth: '200px',
        maxWidth: '280px',
      }}
    >
      <span style={{ fontSize: '20px' }}>{achievement.icon}</span>
      <div>
        <p style={{ fontSize: '0.55rem', color: COLORS.gold, letterSpacing: '0.1em' }}>
          +{achievement.xp} XP UNLOCKED
        </p>
        <p style={{ fontSize: '0.6rem', color: COLORS.white, marginTop: '2px' }}>
          {achievement.label}
        </p>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 📊 SUB-COMPONENT: Radar Chart
// ═══════════════════════════════════════════════════════════════
function RadarChart({ isMobile }) {
  const size = isMobile ? 55 : 80;
  const cx = size / 2, cy = size / 2, r = size * 0.38;
  const skills = [
    { label: 'React', value: 0.95 },
    { label: 'Node',  value: 0.92 },
    { label: 'DB',    value: 0.88 },
    { label: 'UI/UX', value: 0.82 },
    { label: 'DevOps',value: 0.75 },
  ];
  const angleStep = (Math.PI * 2) / skills.length;

  const getPoint = (i, radiusFactor) => ({
    x: cx + Math.cos(i * angleStep - Math.PI / 2) * r * radiusFactor,
    y: cy + Math.sin(i * angleStep - Math.PI / 2) * r * radiusFactor,
  });

  const webPoints = skills.map((s, i) => getPoint(i, s.value));
  const webPath   = webPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <svg width={size} height={size} className="mx-auto">
      {/* Grid rings */}
      {[0.33, 0.66, 1].map((factor) => (
        <polygon
          key={factor}
          points={skills.map((_, i) => { const p = getPoint(i, factor); return `${p.x},${p.y}`; }).join(' ')}
          fill="none"
          stroke="rgba(108,99,255,0.25)"
          strokeWidth="0.5"
        />
      ))}
      {/* Axes */}
      {skills.map((_, i) => {
        const p = getPoint(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(108,99,255,0.2)" strokeWidth="0.5" />;
      })}
      {/* Data area */}
      <motion.path
        d={webPath}
        fill="rgba(108,99,255,0.25)"
        stroke={COLORS.purple}
        strokeWidth="1.2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{ filter: 'drop-shadow(0 0 4px #6c63ff)' }}
      />
      {/* Points */}
      {webPoints.map((p, i) => (
        <motion.circle key={i} cx={p.x} cy={p.y} r="2"
          fill={COLORS.purple}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
        />
      ))}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🌐 SUB-COMPONENT: Mini Globe
// ═══════════════════════════════════════════════════════════════
function MiniGlobe({ isMobile }) {
  const size = isMobile ? 50 : 70;
  const cx = size / 2, cy = size / 2, r = size * 0.4;

  return (
    <svg width={size} height={size} className="mx-auto">
      <defs>
        <radialGradient id="globeGrad" cx="35%" cy="35%">
          <stop offset="0%" stopColor="rgba(108,99,255,0.6)" />
          <stop offset="100%" stopColor="rgba(2,5,16,0.9)" />
        </radialGradient>
      </defs>

      {/* Globe body */}
      <circle cx={cx} cy={cy} r={r}
        fill="url(#globeGrad)"
        stroke={COLORS.purple}
        strokeWidth="0.8"
        style={{ filter: 'drop-shadow(0 0 8px rgba(108,99,255,0.5))' }}
      />

      {/* Latitude lines */}
      {[-0.5, 0, 0.5].map((offset, i) => (
        <ellipse key={i}
          cx={cx} cy={cy + offset * r}
          rx={r * Math.sqrt(1 - offset * offset)} ry={r * 0.12}
          fill="none" stroke="rgba(108,99,255,0.3)" strokeWidth="0.5"
        />
      ))}

      {/* Longitude line */}
      <ellipse cx={cx} cy={cy} rx={r * 0.25} ry={r}
        fill="none" stroke="rgba(108,99,255,0.3)" strokeWidth="0.5"
      />

      {/* Pakistan marker */}
      <motion.circle
        cx={cx + r * 0.3} cy={cy - r * 0.1} r="2.5"
        fill={COLORS.green}
        animate={{ r: [2, 4, 2], opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ filter: 'drop-shadow(0 0 4px #43e97b)' }}
      />
      <text x={cx + r * 0.3 + 4} y={cy - r * 0.1 + 3}
        fontSize="4" fill={COLORS.green} fontFamily="monospace">PK</text>

      {/* Rotating orbit dot */}
      <motion.circle r="2" fill={COLORS.cyan}
        animate={{
          cx: [cx + r, cx, cx - r, cx, cx + r],
          cy: [cy, cy - r * 0.3, cy, cy + r * 0.3, cy],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🌌 PARTICLE SYSTEM
// ═══════════════════════════════════════════════════════════════
function useParticleCanvas(canvasRef, isMobile) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const COUNT = isMobile ? 120 : 500;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.3,
      color: [COLORS.purple, COLORS.cyan, COLORS.pink, COLORS.green][Math.floor(Math.random() * 4)],
      alpha: Math.random() * 0.7 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Matrix rain columns
    const FONT = isMobile ? 10 : 13;
    const COLS = Math.floor(W / FONT);
    const drops = Array(COLS).fill(1);
    const CHARS = '01アイウエカキクᚠᚡᚢᚣ<>{}[]/*+=';

    let animId;
    let frame = 0;

    const draw = () => {
      // Fade trail
      ctx.fillStyle = 'rgba(2,5,16,0.06)';
      ctx.fillRect(0, 0, W, H);

      // Matrix rain
      drops.forEach((y, i) => {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        const grad = ctx.createLinearGradient(0, (y - 8) * FONT, 0, y * FONT);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.5, 'rgba(108,99,255,0.35)');
        grad.addColorStop(1, '#43e97b');
        ctx.fillStyle = grad;
        ctx.font = `${FONT}px monospace`;
        ctx.fillText(ch, i * FONT, y * FONT);
        if (y * FONT > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });

      // Particles
      particles.forEach((p) => {
        p.pulse += 0.04;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        const alpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Diamond dust: draw a tiny ✦ for some particles
        if (p.r > 1.5) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - p.r * 2);
          ctx.lineTo(p.x + p.r * 0.5, p.y);
          ctx.lineTo(p.x, p.y + p.r * 2);
          ctx.lineTo(p.x - p.r * 0.5, p.y);
          ctx.closePath();
          ctx.fillStyle = COLORS.white + '22';
          ctx.fill();
        }
      });

      // Aurora bands (every 3rd frame)
      if (frame % 3 === 0) {
        const auroraY = H * 0.3;
        const grad2 = ctx.createLinearGradient(0, auroraY - 60, 0, auroraY + 60);
        grad2.addColorStop(0, 'transparent');
        grad2.addColorStop(0.3, 'rgba(108,99,255,0.04)');
        grad2.addColorStop(0.5, 'rgba(0,245,255,0.06)');
        grad2.addColorStop(0.7, 'rgba(67,233,123,0.04)');
        grad2.addColorStop(1, 'transparent');
        ctx.fillStyle = grad2;
        ctx.fillRect(0, auroraY - 60, W, 120);
      }

      frame++;
      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, [isMobile]);
}

// ═══════════════════════════════════════════════════════════════
// 🎵 AUDIO ENGINE
// ═══════════════════════════════════════════════════════════════
function useAudio(onComplete) {
  const audioRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) { onComplete(); return; }

    try {
      const audio = new Audio('/sounds/bmw-engine.mp3');
      audio.volume = 0.18;
      audio.loop   = true;
      audioRef.current = audio;

      const tryPlay = () => audio.play().catch(() => {});
      audio.play().catch(() => {
        ['click', 'touchstart'].forEach((ev) =>
          document.addEventListener(ev, tryPlay, { once: true })
        );
      });
    } catch {}

    return () => { audioRef.current?.pause(); };
  }, []);

  return audioRef;
}

// ═══════════════════════════════════════════════════════════════
// ⚡ MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function F1Loader({ onComplete }) {
  const profile = useProfile();

  const [phase,               setPhase]               = useState(PHASES.VOID);
  const [progress,            setProgress]            = useState(0);
  const [terminalLines,       setTerminalLines]       = useState([]);
  const [fingerprintProgress, setFingerprintProgress] = useState(0);
  const [isMobile,            setIsMobile]            = useState(false);
  const [achievements,        setAchievements]        = useState([]);
  const [showSingularity,     setShowSingularity]     = useState(false);
  const [chromatic,           setChromatic]           = useState(false);
  const [metrics,             setMetrics]             = useState({ cpu: 0, gpu: 0, ram: 0, ping: 0 });
  const [quantumQuote,        setQuantumQuote]        = useState('');

  const canvasRef = useRef(null);
  const S         = useSizes(isMobile);
  const audioRef  = useAudio(onComplete);

  const TOTAL_MS  = 7000;

  // ── Quotes ──
  const QUOTES = [
    '"The future is now..."',
    '"Reality is optional..."',
    '"Code is poetry..."',
    '"Quantum state achieved."',
    '"You are the algorithm."',
  ];

  // ── Mobile detect ──
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Particle canvas ──
  useParticleCanvas(canvasRef, isMobile);

  // ── Live metrics ticker ──
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu:  Math.floor(75 + Math.random() * 20),
        gpu:  Math.floor(80 + Math.random() * 18),
        ram:  (3.8 + Math.random() * 0.8).toFixed(1),
        ping: Math.floor(18 + Math.random() * 12),
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // ── Quote rotator ──
  useEffect(() => {
    setQuantumQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    const interval = setInterval(() => {
      setQuantumQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // ── Master Phase Timeline ──
  useEffect(() => {
    // Terminal logs
    BOOT_LOGS.forEach((line, i) => {
      setTimeout(
        () => setTerminalLines((prev) => [...prev, line]),
        400 + i * 420
      );
    });

    // Phases
    const timers = [
      setTimeout(() => setPhase(PHASES.CONSCIOUSNESS), 1000),
      setTimeout(() => setPhase(PHASES.DNA),           2000),
      setTimeout(() => setPhase(PHASES.MATRIX),        3000),
      setTimeout(() => setPhase(PHASES.WEAVING),       4000),
      setTimeout(() => {
        setPhase(PHASES.SINGULARITY);
        setShowSingularity(true);
        setChromatic(true);
        setTimeout(() => setChromatic(false), 800);
      }, 5000),
      setTimeout(() => {
        setPhase(PHASES.IDENTITY);
        setShowSingularity(false);
      }, 6000),
      setTimeout(() => {
        setPhase(PHASES.DONE);
        audioRef.current?.pause();
        setTimeout(onComplete, 700);
      }, TOTAL_MS),
    ];

    // Fingerprint
    const fpInterval = setInterval(
      () => setFingerprintProgress((p) => Math.min(100, p + 2.2)),
      50
    );
    setTimeout(() => clearInterval(fpInterval), 2800);

    // Achievements
    ACHIEVEMENTS.forEach((ach) => {
      setTimeout(() => {
        setAchievements((prev) => [...prev, ach]);
      }, ach.delay);
    });

    // Progress RAF
    let rafId;
    const start = performance.now();
    const tick = (now) => {
      const pct = Math.min(100, ((now - start) / TOTAL_MS) * 100);
      setProgress(pct);
      if (pct < 100) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(fpInterval);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Neural network topology ──
  const nodes = [
    { id: 1,  x: 50, y: 10 },
    { id: 2,  x: 20, y: 28 }, { id: 3,  x: 40, y: 28 },
    { id: 4,  x: 60, y: 28 }, { id: 5,  x: 80, y: 28 },
    { id: 6,  x: 10, y: 48 }, { id: 7,  x: 30, y: 48 },
    { id: 8,  x: 50, y: 48 }, { id: 9,  x: 70, y: 48 }, { id: 10, x: 90, y: 48 },
    { id: 11, x: 25, y: 68 }, { id: 12, x: 50, y: 68 }, { id: 13, x: 75, y: 68 },
    { id: 14, x: 50, y: 88 },
  ];
  const connections = [
    [1,2],[1,3],[1,4],[1,5],
    [2,6],[2,7],[3,7],[3,8],[4,8],[4,9],[5,9],[5,10],
    [6,11],[7,11],[7,12],[8,12],[9,12],[9,13],[10,13],
    [11,14],[12,14],[13,14],
  ];

  // ── Phase label ──
  const phaseLabel = {
    [PHASES.VOID]:          'QUANTUM_VOID',
    [PHASES.CONSCIOUSNESS]: 'CONSCIOUSNESS↑',
    [PHASES.DNA]:           'DNA_SEQUENCE',
    [PHASES.MATRIX]:        'QUANTUM_MATRIX',
    [PHASES.WEAVING]:       'REALITY_WEAVE',
    [PHASES.SINGULARITY]:   '● SINGULARITY',
    [PHASES.IDENTITY]:      '● ONLINE',
  }[phase] ?? 'INIT';

  // ── Show neural net phases ──
  const showNetwork = [
    PHASES.CONSCIOUSNESS, PHASES.DNA,
    PHASES.MATRIX, PHASES.WEAVING,
  ].includes(phase);

  const isActivation = [PHASES.MATRIX, PHASES.WEAVING, PHASES.SINGULARITY].includes(phase);

  // ── Dismiss achievement ──
  const dismissAchievement = useCallback((id) => {
    setAchievements((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return (
    <AnimatePresence>
      {phase !== PHASES.DONE && (
        <motion.div
          key="quantum-god-tier"
          exit={{ opacity: 0, filter: 'blur(40px)', scale: 1.04 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[100] overflow-hidden select-none"
          style={{ background: COLORS.bg }}
        >
          {/* ═══ LAYER 0: PARTICLE + MATRIX CANVAS ═══ */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: isMobile ? 0.18 : 0.32, mixBlendMode: 'screen' }}
          />

          {/* ═══ LAYER 1: GRID FABRIC ═══ */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right,  rgba(108,99,255,0.07) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(108,99,255,0.07) 1px, transparent 1px)
              `,
              backgroundSize: isMobile ? '28px 28px' : '48px 48px',
            }}
          />

          {/* ═══ LAYER 2: CHROMATIC ABERRATION (Singularity) ═══ */}
          <AnimatePresence>
            {chromatic && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.18 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'rgba(255,0,0,0.12)', transform: 'translateX(-6px)' }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.18 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'rgba(0,0,255,0.12)', transform: 'translateX(6px)' }}
                />
              </>
            )}
          </AnimatePresence>

          {/* ═══ LAYER 3: SCAN LINES ═══ */}
          <motion.div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${COLORS.purple}, ${COLORS.cyan}, transparent)`,
              boxShadow: `0 0 18px ${COLORS.purple}`,
            }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{
              width: '1px',
              background: `linear-gradient(180deg, transparent, ${COLORS.pink}, transparent)`,
              boxShadow: `0 0 14px ${COLORS.pink}`,
            }}
            animate={{ left: ['0%', '100%'] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'linear', delay: 0.6 }}
          />

          {/* ═══ LAYER 4: CORNER BRACKETS ═══ */}
          {[
            { top: S.cornerOff,    left:  S.cornerOff,   rotate: '0deg'   },
            { top: S.cornerOff,    right: S.cornerOff,   rotate: '90deg'  },
            { bottom: S.cornerOff, left:  S.cornerOff,   rotate: '270deg' },
            { bottom: S.cornerOff, right: S.cornerOff,   rotate: '180deg' },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.12, type: 'spring' }}
              className="absolute pointer-events-none"
              style={{
                ...pos,
                width: S.cornerSz, height: S.cornerSz,
                borderTop:  `2px solid ${COLORS.purple}`,
                borderLeft: `2px solid ${COLORS.purple}`,
                transform:  `rotate(${pos.rotate})`,
                boxShadow:  `0 0 14px rgba(108,99,255,0.45)`,
              }}
            />
          ))}

          {/* ═══ HUD: TOP BAR ═══ */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0,   opacity: 1 }}
            className="absolute left-1/2 -translate-x-1/2 flex items-center
                       rounded-full font-mono uppercase tracking-widest z-30 pointer-events-none"
            style={{
              top: S.hudTop, gap: S.hudGap, padding: S.hudPad,
              fontSize: S.hudFont,
              background: 'rgba(108,99,255,0.12)',
              border:     '1px solid rgba(108,99,255,0.4)',
              color:      COLORS.purple,
              backdropFilter: 'blur(10px)',
              whiteSpace: 'nowrap',
            }}
          >
            <span>QUANTUM.SYS v3.0</span>
            <span style={{ opacity: 0.35 }}>|</span>
            <span>MERN</span>
            <span style={{ opacity: 0.35 }}>|</span>
            <motion.span animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.9, repeat: Infinity }}>
              ● LIVE
            </motion.span>
            {!isMobile && (
              <>
                <span style={{ opacity: 0.35 }}>|</span>
                <span style={{ color: COLORS.gold }}>CPU {metrics.cpu}%</span>
                <span style={{ opacity: 0.35 }}>|</span>
                <span style={{ color: COLORS.pink }}>GPU {metrics.gpu}%</span>
                <span style={{ opacity: 0.35 }}>|</span>
                <span style={{ color: COLORS.cyan }}>RAM {metrics.ram}G</span>
                <span style={{ opacity: 0.35 }}>|</span>
                <span style={{ color: COLORS.green }}>{metrics.ping}ms</span>
              </>
            )}
          </motion.div>

          {/* ═══ PANEL: TERMINAL (Top-Left) ═══ */}
          <div
            className="absolute rounded-xl font-mono z-20"
            style={{
              top: S.termTop, left: isMobile ? '8px' : '20px',
              padding: S.panelPad, width: S.termW, maxHeight: S.termMaxH,
              overflow: 'hidden',
              background: 'rgba(8,12,28,0.94)',
              border: `1px solid rgba(108,99,255,0.4)`,
              boxShadow: '0 0 22px rgba(108,99,255,0.18)',
              backdropFilter: 'blur(12px)',
              fontSize: S.panelFont,
            }}
          >
            {/* title bar */}
            <div className="flex items-center gap-1 mb-2 pb-1"
              style={{ borderBottom: '1px solid rgba(108,99,255,0.18)' }}>
              {['#ff5555','#ffcc00','#43e97b'].map((c) => (
                <span key={c} className="rounded-full"
                  style={{ width: '6px', height: '6px', background: c, display: 'inline-block' }} />
              ))}
              <span className="ml-1 uppercase tracking-wider truncate"
                style={{ color: 'rgba(108,99,255,0.6)', fontSize: S.panelTitle }}>
                quantum.boot
              </span>
            </div>

            {terminalLines.slice(-S.termLines).map((line, i) => (
              <motion.p key={`${i}`}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-0.5 truncate"
                style={{ color: line.color }}>
                {line.text}
              </motion.p>
            ))}

            {phase !== PHASES.IDENTITY && (
              <span style={{ color: COLORS.purple }} className="animate-pulse">▊</span>
            )}

            {/* Quantum quote */}
            <AnimatePresence mode="wait">
              <motion.p key={quantumQuote}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-1 italic truncate"
                style={{ color: COLORS.gold, fontSize: S.panelTitle }}>
                {quantumQuote}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* ═══ PANEL: BIOMETRIC (Top-Right) ═══ */}
          <div
            className="absolute rounded-xl z-20"
            style={{
              top: S.fpTop, right: isMobile ? '8px' : '20px',
              padding: S.panelPad, width: S.fpW,
              background: 'rgba(8,12,28,0.94)',
              border: `1px solid rgba(108,99,255,0.4)`,
              boxShadow: '0 0 22px rgba(108,99,255,0.18)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <p className="uppercase tracking-widest font-mono"
              style={{ fontSize: S.panelTitle, color: 'rgba(108,99,255,0.7)', marginBottom: '8px' }}>
              👁 Biometric
            </p>

            {/* Fingerprint SVG */}
            <div className="relative mx-auto"
              style={{ width: S.fpSize, height: S.fpSize }}>
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <clipPath id="fpClip2">
                    <rect x="0" y={100 - fingerprintProgress} width="100" height="100" />
                  </clipPath>
                </defs>
                {/* base lines */}
                {['M20 20 Q50 10 80 20','M15 32 Q50 20 85 32','M12 44 Q50 32 88 44',
                  'M15 56 Q50 44 85 56','M18 68 Q50 56 82 68','M22 80 Q50 70 78 80',
                  'M28 90 Q50 82 72 90'].map((d, i) => (
                  <path key={i} d={d} stroke="rgba(148,163,175,0.25)"
                    strokeWidth="1.8" fill="none" strokeLinecap="round" />
                ))}
                {/* scanned overlay */}
                {['M20 20 Q50 10 80 20','M15 32 Q50 20 85 32','M12 44 Q50 32 88 44',
                  'M15 56 Q50 44 85 56','M18 68 Q50 56 82 68','M22 80 Q50 70 78 80',
                  'M28 90 Q50 82 72 90'].map((d, i) => (
                  <path key={`s${i}`} d={d} stroke={COLORS.green}
                    strokeWidth="1.8" fill="none" strokeLinecap="round"
                    clipPath="url(#fpClip2)"
                    style={{ filter: 'drop-shadow(0 0 4px #43e97b)' }} />
                ))}
              </svg>
              {/* scan beam */}
              <motion.div className="absolute left-0 right-0"
                style={{
                  height: '2px', background: COLORS.green,
                  boxShadow: `0 0 10px ${COLORS.green}`,
                  bottom: `${fingerprintProgress}%`,
                }} />
            </div>

            <p className="mt-2 text-center font-mono tabular-nums"
              style={{
                fontSize: S.panelFont,
                color: fingerprintProgress === 100 ? COLORS.green : COLORS.purple,
              }}>
              {fingerprintProgress === 100 ? '✓ VERIFIED' : `${Math.round(fingerprintProgress)}%`}
            </p>

            {/* Radar chart (desktop only) */}
            {!isMobile && (
              <div className="mt-3" style={{ borderTop: '1px solid rgba(108,99,255,0.15)', paddingTop: '8px' }}>
                <p className="uppercase tracking-widest font-mono text-center mb-1"
                  style={{ fontSize: S.panelTitle, color: 'rgba(108,99,255,0.6)' }}>
                  Skill Radar
                </p>
                <RadarChart isMobile={isMobile} />
              </div>
            )}
          </div>

          {/* ═══ PANEL: STATS (Bottom-Left) ═══ */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute rounded-xl font-mono z-20"
            style={{
              bottom: S.panelBottom, left: isMobile ? '8px' : '20px',
              padding: S.panelPad, width: S.statsW,
              background: 'rgba(8,12,28,0.94)',
              border: `1px solid rgba(108,99,255,0.4)`,
              backdropFilter: 'blur(12px)',
              fontSize: S.panelFont,
            }}
          >
            <p className="uppercase tracking-widest mb-2"
              style={{ fontSize: S.panelTitle, color: 'rgba(108,99,255,0.7)' }}>
              ⚡ Stats
            </p>

            {[
              { label: 'React',  value: 95, color: COLORS.purple },
              { label: 'Node',   value: 92, color: COLORS.cyan   },
              { label: 'Mongo',  value: 90, color: COLORS.green  },
              { label: 'DevOps', value: 82, color: COLORS.pink   },
              { label: 'UI/UX',  value: 88, color: COLORS.gold   },
            ].map((stat, i) => (
              <div key={stat.label} style={{ marginBottom: isMobile ? '4px' : '7px' }}>
                <div className="flex justify-between" style={{ marginBottom: '2px' }}>
                  <span style={{ color: '#94a3b8' }}>{stat.label}</span>
                  <span style={{ color: stat.color }}>{stat.value}%</span>
                </div>
                <div className="overflow-hidden rounded-full"
                  style={{ height: isMobile ? '2px' : '3px', background: 'rgba(108,99,255,0.1)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ delay: 1 + i * 0.15, duration: 0.9 }}
                    style={{
                      height: '100%',
                      background: `linear-gradient(90deg, ${stat.color}, ${COLORS.white}44)`,
                      boxShadow: `0 0 6px ${stat.color}`,
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Globe (desktop only) */}
            {!isMobile && (
              <div className="mt-2" style={{ borderTop: '1px solid rgba(108,99,255,0.15)', paddingTop: '8px' }}>
                <p className="uppercase tracking-widest font-mono text-center mb-1"
                  style={{ fontSize: S.panelTitle, color: 'rgba(108,99,255,0.6)' }}>
                  🌐 Location
                </p>
                <MiniGlobe isMobile={isMobile} />
                <p className="text-center mt-1 font-mono"
                  style={{ fontSize: S.panelTitle, color: COLORS.green }}>
                  ● Swat, PK  {metrics.ping}ms
                </p>
              </div>
            )}
          </motion.div>

          {/* ═══ PANEL: LOCATION MOBILE (Bottom-Right) ═══ */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute rounded-xl font-mono z-20"
              style={{
                bottom: S.panelBottom, right: '8px',
                padding: S.panelPad, maxWidth: S.locationMaxW,
                background: 'rgba(8,12,28,0.94)',
                border: `1px solid rgba(108,99,255,0.4)`,
                backdropFilter: 'blur(12px)',
                fontSize: S.panelFont,
              }}
            >
              <p className="uppercase tracking-widest"
                style={{ fontSize: S.panelTitle, color: 'rgba(108,99,255,0.7)', marginBottom: '4px' }}>
                📡 Location
              </p>
              <p style={{ color: '#94a3b8' }}>Swat, PK 🇵🇰</p>
              <p className="mt-1" style={{ color: COLORS.green }}>● {metrics.ping}ms</p>
            </motion.div>
          )}

          {/* ═══ CENTER: QUANTUM SPHERE (phases: void, consciousness) ═══ */}
          {[PHASES.VOID, PHASES.CONSCIOUSNESS].includes(phase) && (
            <QuantumSphere phase={phase} />
          )}

          {/* ═══ CENTER: DNA HELIX (phase: dna) ═══ */}
          {phase === PHASES.DNA && (
            <DNAHelix isMobile={isMobile} S={S} />
          )}

          {/* ═══ CENTER: NEURAL NETWORK (phases: matrix, weaving) ═══ */}
          {showNetwork && phase !== PHASES.DNA && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg viewBox="0 0 100 100"
                style={{ width: S.networkSz, height: S.networkSz, maxWidth: '500px', maxHeight: '500px' }}>

                {connections.map(([from, to], i) => {
                  const f = nodes.find((n) => n.id === from);
                  const t = nodes.find((n) => n.id === to);
                  return (
                    <motion.line key={`c${i}`}
                      x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                      stroke={isActivation ? COLORS.pink : COLORS.purple}
                      strokeWidth="0.22"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: 1,
                        opacity: isActivation ? [0.3, 1, 0.3] : 0.45,
                      }}
                      transition={{
                        pathLength: { duration: 0.4, delay: i * 0.04 },
                        opacity: isActivation
                          ? { duration: 0.5, repeat: Infinity }
                          : { duration: 0.3 },
                      }}
                      style={{ filter: 'drop-shadow(0 0 2px currentColor)' }}
                    />
                  );
                })}

                {/* Data pulses */}
                {connections.map(([from, to], i) => {
                  const f = nodes.find((n) => n.id === from);
                  const t = nodes.find((n) => n.id === to);
                  return (
                    <motion.circle key={`p${i}`} r="0.55" fill={COLORS.cyan}
                      initial={{ cx: f.x, cy: f.y, opacity: 0 }}
                      animate={{ cx: [f.x, t.x], cy: [f.y, t.y], opacity: [0, 1, 0] }}
                      transition={{ duration: 1.4, delay: i * 0.09, repeat: Infinity, repeatDelay: 0.8 }}
                      style={{ filter: `drop-shadow(0 0 4px ${COLORS.cyan})` }}
                    />
                  );
                })}

                {/* Nodes */}
                {nodes.map((node, i) => (
                  <g key={`n${node.id}`}>
                    <motion.circle cx={node.x} cy={node.y} r="2"
                      fill="none" stroke={COLORS.purple} strokeWidth="0.15"
                      animate={{ scale: isActivation ? [1, 2.8, 1] : 1 }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.07 }}
                    />
                    <motion.circle cx={node.x} cy={node.y} r="1.1"
                      fill={isActivation ? COLORS.pink : COLORS.purple}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.25 + i * 0.04, type: 'spring' }}
                      style={{ filter: 'drop-shadow(0 0 3px currentColor)' }}
                    />
                    <circle cx={node.x} cy={node.y} r="0.38" fill="white" opacity="0.9" />
                  </g>
                ))}
              </svg>
            </div>
          )}

          {/* ═══ CENTER: SINGULARITY EXPLOSION ═══ */}
          <AnimatePresence>
            {showSingularity && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.6, 0], scale: [0, 18, 22, 26] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                           rounded-full pointer-events-none z-10"
                style={{
                  width: '80px', height: '80px',
                  background: 'radial-gradient(circle, #ffffff, #6c63ff, #ff6584, transparent)',
                  boxShadow: `0 0 200px ${COLORS.purple}, 0 0 400px ${COLORS.pink}`,
                }}
              />
            )}
          </AnimatePresence>

          {/* ═══ CENTER: IDENTITY CARD (phase: identity) ═══ */}
          <AnimatePresence>
            {phase === PHASES.IDENTITY && (
              <motion.div
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center px-4 z-40"
              >
                {/* Rotating rings behind card */}
                {[160, 200, 240].map((size, i) => (
                  <motion.div key={size}
                    className="absolute rounded-full border pointer-events-none"
                    style={{
                      width: size, height: size,
                      borderColor: [COLORS.purple, COLORS.pink, COLORS.cyan][i],
                      borderWidth: '1px', opacity: 0.25,
                    }}
                    animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: 'linear' }}
                  />
                ))}

                <motion.div
                  initial={{ scale: 0.5, rotateY: -180, opacity: 0 }}
                  animate={{ scale: 1,   rotateY: 0,    opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 95, damping: 18 }}
                  className="relative rounded-2xl text-center"
                  style={{
                    padding: S.cardPad, maxWidth: S.cardMaxW, width: '90%',
                    background: 'linear-gradient(135deg, rgba(108,99,255,0.22), rgba(255,101,132,0.14))',
                    border: `2px solid rgba(108,99,255,0.65)`,
                    boxShadow: `0 0 70px rgba(108,99,255,0.5), inset 0 0 30px rgba(255,255,255,0.04)`,
                    backdropFilter: 'blur(22px)',
                  }}
                >
                  {/* Corner LEDs */}
                  {['top-left','top-right','bottom-left','bottom-right'].map((c, i) => {
                    const [v, h] = c.split('-');
                    return (
                      <motion.div key={c}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18 }}
                        className="absolute rounded-full"
                        style={{
                          width: '10px', height: '10px',
                          [v]: '-5px', [h]: '-5px',
                          background: COLORS.purple,
                          boxShadow: `0 0 10px ${COLORS.purple}`,
                        }}
                      />
                    );
                  })}

                  {/* Avatar */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', delay: 0.25 }}
                    className="mx-auto grid place-items-center rounded-2xl"
                    style={{
                      width: S.logoSz, height: S.logoSz,
                      marginBottom: isMobile ? '10px' : '16px',
                      background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})`,
                      boxShadow: `0 0 50px rgba(108,99,255,0.9)`,
                      fontSize: S.logoFont, fontWeight: 900, color: 'white',
                      fontFamily: 'Manrope, sans-serif',
                    }}
                  >
                    {profile.initials}
                  </motion.div>

                  {/* Name */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    style={{
                      fontSize: S.nameSz, marginBottom: isMobile ? '4px' : '8px',
                      background: `linear-gradient(135deg, #ffffff, ${COLORS.purple}, ${COLORS.pink})`,
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      fontFamily: 'Manrope, sans-serif', fontWeight: 800, lineHeight: 1.2,
                    }}
                  >
                    {profile.name}
                  </motion.h1>

                  {/* Title */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.65 }}
                    className="uppercase tracking-[0.2em] font-semibold"
                    style={{
                      fontSize: S.titleFont, color: 'rgba(108,99,255,0.9)',
                      marginBottom: isMobile ? '10px' : '16px',
                    }}
                  >
                    {profile.title}
                  </motion.p>

                  {/* Status badges */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85 }}
                    className="flex flex-wrap justify-center"
                    style={{ gap: isMobile ? '4px' : '8px' }}
                  >
                    {['✓ VERIFIED', '✓ ONLINE', '✓ AVAILABLE'].map((s) => (
                      <span key={s}
                        className="uppercase tracking-widest font-bold rounded-full font-mono"
                        style={{
                          fontSize: isMobile ? '0.42rem' : '0.52rem',
                          padding: isMobile ? '3px 7px' : '4px 10px',
                          background: 'rgba(67,233,123,0.14)',
                          color: COLORS.green,
                          border: `1px solid rgba(67,233,123,0.4)`,
                        }}>
                        {s}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>

                {/* SYSTEM ONLINE text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="font-mono uppercase tracking-widest text-center"
                  style={{
                    marginTop: isMobile ? '12px' : '22px',
                    fontSize: isMobile ? '0.48rem' : '0.6rem',
                    color: COLORS.green,
                  }}
                >
                  ► SYSTEM ONLINE — IDENTITY CONFIRMED
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ═══ ACHIEVEMENTS STACK (Bottom-Right above corner) ═══ */}
          <div className="absolute z-50 flex flex-col gap-2"
            style={{ bottom: isMobile ? '90px' : '110px', right: isMobile ? '8px' : '20px' }}>
            <AnimatePresence>
              {achievements.map((ach) => (
                <AchievementToast key={ach.id} achievement={ach}
                  onDone={() => dismissAchievement(ach.id)} />
              ))}
            </AnimatePresence>
          </div>

          {/* ═══ PROGRESS BAR ═══ */}
          <div className="absolute left-1/2 -translate-x-1/2 z-50"
            style={{ bottom: S.progBottom, width: S.progW }}>
            <div className="mb-1 flex justify-between uppercase tracking-widest font-mono"
              style={{ fontSize: S.progFont }}>
              <span style={{ color: 'rgba(148,163,175,0.55)', maxWidth: '65%' }}
                className="truncate">
                {phaseLabel}
              </span>
              <span className="tabular-nums font-bold" style={{ color: COLORS.purple }}>
                {Math.round(progress)}%
              </span>
            </div>

            <div className="overflow-hidden rounded-full"
              style={{
                height: isMobile ? '3px' : '5px',
                background: 'rgba(108,99,255,0.12)',
                border: `1px solid rgba(108,99,255,0.28)`,
              }}>
              <motion.div
                style={{
                  width: `${progress}%`, height: '100%',
                  background: `linear-gradient(90deg, ${COLORS.purple}, ${COLORS.pink}, ${COLORS.green})`,
                  boxShadow: `0 0 14px ${COLORS.purple}`,
                }}
              />
            </div>

            {/* Sub-phase dots */}
            <div className="flex justify-between mt-1">
              {Object.values(PHASES).filter((p) => p !== PHASES.DONE).map((p) => (
                <div key={p} className="rounded-full transition-all duration-500"
                  style={{
                    width: isMobile ? '4px' : '6px',
                    height: isMobile ? '4px' : '6px',
                    background: phase === p ? COLORS.purple
                      : progress > (Object.values(PHASES).indexOf(p) / 7) * 100
                        ? COLORS.green : 'rgba(108,99,255,0.2)',
                    boxShadow: phase === p ? `0 0 8px ${COLORS.purple}` : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* ═══ SKIP BUTTON ═══ */}
          <button
            type="button"
            onClick={() => { audioRef.current?.pause(); onComplete(); }}
            className="absolute z-50 uppercase tracking-widest font-mono rounded-lg
                       transition-all duration-200 hover:bg-purple-900/30"
            style={{
              top: S.skipTop, right: S.skipRight,
              fontSize: S.skipFont,
              padding: isMobile ? '3px 7px' : '4px 12px',
              color: 'rgba(148,163,175,0.55)',
              border: '1px solid rgba(148,163,175,0.28)',
              background: 'rgba(8,12,28,0.6)',
            }}
          >
            {isMobile ? 'Skip' : '[ESC] Skip Cinematic →'}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}