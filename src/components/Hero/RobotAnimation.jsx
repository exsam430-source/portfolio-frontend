import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * CSS-based 3D Robot that:
 * - Tracks mouse movement (head/eyes follow cursor)
 * - Has glowing neon effects
 * - Floats smoothly
 * - Has blinking eyes
 * - Has animated display screen
 */
export default function RobotAnimation() {
  const { isDark } = useTheme();
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [displayText, setDisplayText] = useState(0);

  const displayMessages = ['HELLO!', 'MA.DEV', 'READY!', '</>'];

  /* Mouse tracking */
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = ((e.clientX - centerX) / window.innerWidth) * 20;
      const y = ((e.clientY - centerY) / window.innerHeight) * 20;
      setMousePos({ x, y });

      /* Eye follow — limited range */
      const eyeX = Math.max(-4, Math.min(4, (e.clientX - centerX) / 30));
      const eyeY = Math.max(-3, Math.min(3, (e.clientY - centerY) / 30));
      setEyePos({ x: eyeX, y: eyeY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  /* Blink interval */
  useEffect(() => {
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    };
    const interval = setInterval(blink, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  /* Display text cycle */
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText((i) => (i + 1) % displayMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const primary = '#6c63ff';
  const secondary = '#ff6584';
  const accent = '#43e97b';
  const surface = isDark ? '#0d1224' : '#ffffff';
  const bodyColor = isDark ? '#1a1a3e' : '#e8e8ff';

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ width: '380px', height: '450px' }}
    >
      {/* Outer glow ring */}
      <div
        className="absolute rounded-full animate-spin-slow"
        style={{
          width: '320px',
          height: '320px',
          border: `1px solid ${primary}33`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: '280px',
          height: '280px',
          border: `1px dashed ${secondary}22`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'spin-slow 12s linear infinite reverse',
        }}
      />

      {/* Ground shadow/glow */}
      <div
        className="absolute bottom-8 rounded-full"
        style={{
          width: '160px',
          height: '20px',
          background: `radial-gradient(ellipse, ${primary}40 0%, transparent 70%)`,
          filter: 'blur(8px)',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      {/* Robot Body — floats + tracks mouse */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotateX: mousePos.y * 0.3,
          rotateY: mousePos.x * 0.3,
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { duration: 0.1 },
          rotateY: { duration: 0.1 },
        }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '800px',
          position: 'relative',
          zIndex: 10,
          filter: `drop-shadow(0 0 30px ${primary}60)`,
        }}
      >
        <svg
          width="200"
          height="260"
          viewBox="0 0 200 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ── ANTENNA ── */}
          <line x1="100" y1="0" x2="100" y2="25" stroke={primary} strokeWidth="2" />
          <circle cx="100" cy="0" r="5" fill={secondary}>
            <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
            <animate attributeName="r" values="5;7;5" dur="1s" repeatCount="indefinite" />
          </circle>
          {/* Antenna glow */}
          <circle cx="100" cy="0" r="8" fill={`${secondary}30`}>
            <animate attributeName="r" values="8;12;8" dur="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="1s" repeatCount="indefinite" />
          </circle>

          {/* ── HEAD ── */}
          <rect
            x="55" y="25" width="90" height="75"
            rx="16"
            fill={bodyColor}
            stroke={primary}
            strokeWidth="1.5"
          />
          {/* Head inner glow */}
          <rect
            x="58" y="28" width="84" height="69"
            rx="14"
            fill={`${primary}08`}
          />
          {/* Head top shine */}
          <path
            d="M65 30 Q100 26 135 30"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />

          {/* ── EYES ── */}
          {/* Left eye socket */}
          <ellipse cx="78" cy="58" rx="14" ry="14" fill={surface} stroke={primary} strokeWidth="1" />
          {/* Right eye socket */}
          <ellipse cx="122" cy="58" rx="14" ry="14" fill={surface} stroke={primary} strokeWidth="1" />

          {/* Left eye pupil — follows mouse */}
          {!isBlinking ? (
            <>
              <circle
                cx={78 + eyePos.x}
                cy={58 + eyePos.y}
                r="7"
                fill={primary}
                style={{ transition: 'cx 0.1s, cy 0.1s' }}
              >
                <animate attributeName="opacity" values="1;0.8;1" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle
                cx={80 + eyePos.x}
                cy={56 + eyePos.y}
                r="2.5"
                fill="white"
                opacity="0.8"
              />
              {/* Eye glow */}
              <circle
                cx={78 + eyePos.x}
                cy={58 + eyePos.y}
                r="10"
                fill={`${primary}20`}
              >
                <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </>
          ) : (
            /* Blink — horizontal line */
            <line
              x1="64" y1="58" x2="92" y2="58"
              stroke={primary}
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}

          {/* Right eye pupil */}
          {!isBlinking ? (
            <>
              <circle
                cx={122 + eyePos.x}
                cy={58 + eyePos.y}
                r="7"
                fill={primary}
              >
                <animate attributeName="opacity" values="1;0.8;1" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle
                cx={124 + eyePos.x}
                cy={56 + eyePos.y}
                r="2.5"
                fill="white"
                opacity="0.8"
              />
              <circle
                cx={122 + eyePos.x}
                cy={58 + eyePos.y}
                r="10"
                fill={`${primary}20`}
              >
                <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </>
          ) : (
            <line
              x1="108" y1="58" x2="136" y2="58"
              stroke={primary}
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}

          {/* ── MOUTH / DISPLAY ── */}
          <rect x="70" y="78" width="60" height="15" rx="7" fill={surface} stroke={secondary} strokeWidth="1" />
          <text
            x="100" y="90"
            textAnchor="middle"
            fill={secondary}
            fontSize="9"
            fontWeight="bold"
            fontFamily="monospace"
          >
            {displayMessages[displayText]}
          </text>

          {/* ── NECK ── */}
          <rect x="88" y="100" width="24" height="12" rx="4" fill={bodyColor} stroke={primary} strokeWidth="1" />

          {/* ── BODY ── */}
          <rect
            x="40" y="112" width="120" height="90"
            rx="18"
            fill={bodyColor}
            stroke={primary}
            strokeWidth="1.5"
          />
          {/* Body inner glow */}
          <rect x="44" y="116" width="112" height="82" rx="16" fill={`${primary}06`} />

          {/* Chest screen */}
          <rect x="60" y="125" width="80" height="50" rx="10" fill={surface} stroke={primary} strokeWidth="1" />
          {/* Screen content */}
          <text x="100" y="145" textAnchor="middle" fill={primary} fontSize="8" fontFamily="monospace">
            {'<MERN/>'}
          </text>
          {/* Animated bars */}
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={65 + i * 25}
              y="152"
              width="18"
              height="4"
              rx="2"
              fill={[primary, secondary, accent][i]}
              opacity="0.8"
            >
              <animate
                attributeName="height"
                values={`4;${8 + i * 4};4`}
                dur={`${0.8 + i * 0.2}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values={`152;${148 - i * 2};152`}
                dur={`${0.8 + i * 0.2}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}
          {/* Screen scanline */}
          <rect x="60" y="125" width="80" height="2" rx="1" fill={`${primary}20`}>
            <animate attributeName="y" values="125;175;125" dur="2s" repeatCount="indefinite" />
          </rect>

          {/* Body side lights */}
          <circle cx="52" cy="140" r="4" fill={accent}>
            <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="148" cy="140" r="4" fill={secondary}>
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="52" cy="155" r="3" fill={secondary}>
            <animate attributeName="opacity" values="1;0.3;1" dur="0.9s" repeatCount="indefinite" />
          </circle>
          <circle cx="148" cy="155" r="3" fill={accent}>
            <animate attributeName="opacity" values="0.3;1;0.3" dur="0.9s" repeatCount="indefinite" />
          </circle>

          {/* ── ARMS ── */}
          {/* Left arm */}
          <rect x="12" y="118" width="28" height="70" rx="14" fill={bodyColor} stroke={primary} strokeWidth="1.5" />
          <rect x="14" y="121" width="24" height="64" rx="12" fill={`${primary}08`} />
          {/* Left hand */}
          <circle cx="26" cy="198" r="10" fill={bodyColor} stroke={primary} strokeWidth="1.5" />
          {/* Left arm joint glow */}
          <circle cx="26" cy="118" r="8" fill={`${primary}30`}>
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Right arm */}
          <rect x="160" y="118" width="28" height="70" rx="14" fill={bodyColor} stroke={primary} strokeWidth="1.5" />
          <rect x="162" y="121" width="24" height="64" rx="12" fill={`${primary}08`} />
          {/* Right hand */}
          <circle cx="174" cy="198" r="10" fill={bodyColor} stroke={primary} strokeWidth="1.5" />
          {/* Right arm joint glow */}
          <circle cx="174" cy="118" r="8" fill={`${secondary}30`}>
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* ── LEGS ── */}
          {/* Left leg */}
          <rect x="58" y="200" width="32" height="55" rx="14" fill={bodyColor} stroke={primary} strokeWidth="1.5" />
          <rect x="61" y="203" width="26" height="49" rx="12" fill={`${primary}06`} />
          {/* Left foot */}
          <rect x="50" y="248" width="46" height="14" rx="8" fill={bodyColor} stroke={primary} strokeWidth="1.5" />

          {/* Right leg */}
          <rect x="110" y="200" width="32" height="55" rx="14" fill={bodyColor} stroke={primary} strokeWidth="1.5" />
          <rect x="113" y="203" width="26" height="49" rx="12" fill={`${primary}06`} />
          {/* Right foot */}
          <rect x="104" y="248" width="46" height="14" rx="8" fill={bodyColor} stroke={primary} strokeWidth="1.5" />

          {/* ── NEON UNDERGLOW ── */}
          <path
            d="M58 260 Q100 265 142 260"
            stroke={primary}
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
            strokeDasharray="4 2"
          >
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="1.5s" repeatCount="indefinite" />
          </path>
        </svg>
      </motion.div>

      {/* Floating particles around robot */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: '6px',
            height: '6px',
            background: [primary, secondary, accent][i % 3],
            boxShadow: `0 0 6px ${[primary, secondary, accent][i % 3]}`,
          }}
          animate={{
            x: [0, Math.cos((i * 60 * Math.PI) / 180) * 120],
            y: [0, Math.sin((i * 60 * Math.PI) / 180) * 120],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}