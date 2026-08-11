import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../../context';

export default function F1Loader({ onComplete }) {
  const profile = useProfile();
  const [phase, setPhase] = useState('boot');
  const [progress, setProgress] = useState(0);
  const [terminalLines, setTerminalLines] = useState([]);
  const [fingerprintProgress, setFingerprintProgress] = useState(0);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  const bootLogs = [
    { text: '> System.init()', color: '#6c63ff' },
    { text: '> Loading neural.network v2.0...', color: '#6c63ff' },
    { text: '> Establishing quantum connections...', color: '#6c63ff' },
    { text: '> Analyzing biometric data...', color: '#ff6584' },
    { text: '> Scanning fingerprint... [MATCH]', color: '#43e97b' },
    { text: '> Loading personality module...', color: '#6c63ff' },
    { text: '> Compiling skills: React, Node.js, MongoDB', color: '#6c63ff' },
    { text: '> Rendering holographic interface...', color: '#6c63ff' },
    { text: '> [✓] IDENTITY VERIFIED', color: '#43e97b' },
    { text: '> [✓] ACCESS GRANTED', color: '#43e97b' },
  ];

  /* ── Audio ── */
  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) { onComplete(); return; }

    try {
      const audio = new Audio('/sounds/bmw-engine.mp3');
      audio.volume = 0.2;
      audio.loop = true;
      audioRef.current = audio;
      audio.play().catch(() => {
        const playOnInteraction = () => {
          audio.play().catch(() => {});
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('touchstart', playOnInteraction);
        };
        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('touchstart', playOnInteraction, { once: true });
      });
    } catch {}

    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  /* ── Matrix Rain ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>{}[]()/*+=';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(5,8,22,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const gradient = ctx.createLinearGradient(0, y * fontSize - 100, 0, y * fontSize);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, 'rgba(108,99,255,0.5)');
        gradient.addColorStop(1, '#43e97b');
        ctx.fillStyle = gradient;
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(text, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, []);

  /* ── Phases ── */
  useEffect(() => {
    const TOTAL = 6500;

    bootLogs.forEach((line, i) => {
      setTimeout(() => setTerminalLines((prev) => [...prev, line]), i * 250);
    });

    const t1 = setTimeout(() => setPhase('network'), 1500);
    const t2 = setTimeout(() => setPhase('activation'), 4200);
    const t3 = setTimeout(() => setPhase('reveal'), 5000);
    const t4 = setTimeout(() => {
      setPhase('done');
      if (audioRef.current) audioRef.current.pause();
      setTimeout(onComplete, 700);
    }, TOTAL);

    /* Fingerprint scan */
    let fpInterval = setInterval(() => {
      setFingerprintProgress((p) => Math.min(100, p + 2));
    }, 40);
    setTimeout(() => clearInterval(fpInterval), 2500);

    let frame;
    const start = performance.now();
    const tick = (now) => {
      const pct = Math.min(100, ((now - start) / TOTAL) * 100);
      setProgress(pct);
      if (pct < 100) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
      clearInterval(fpInterval);
      cancelAnimationFrame(frame);
    };
  }, []);

  const nodes = [
    { id: 1, x: 50, y: 15 },
    { id: 2, x: 20, y: 35 }, { id: 3, x: 40, y: 35 }, { id: 4, x: 60, y: 35 }, { id: 5, x: 80, y: 35 },
    { id: 6, x: 10, y: 55 }, { id: 7, x: 30, y: 55 }, { id: 8, x: 50, y: 55 }, { id: 9, x: 70, y: 55 }, { id: 10, x: 90, y: 55 },
    { id: 11, x: 25, y: 75 }, { id: 12, x: 50, y: 75 }, { id: 13, x: 75, y: 75 },
    { id: 14, x: 50, y: 90 },
  ];

  const connections = [
    [1, 2], [1, 3], [1, 4], [1, 5],
    [2, 6], [2, 7], [3, 7], [3, 8], [4, 8], [4, 9], [5, 9], [5, 10],
    [6, 11], [7, 11], [7, 12], [8, 12], [9, 12], [9, 13], [10, 13],
    [11, 14], [12, 14], [13, 14],
  ];

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="neural-insane"
          exit={{ opacity: 0, filter: 'blur(30px)' }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[100] overflow-hidden"
          style={{ background: '#050816' }}
        >
          {/* ═══ MATRIX RAIN ═══ */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
            style={{ opacity: 0.3, mixBlendMode: 'screen' }}
          />

          {/* ═══ GRID ═══ */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(108,99,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(108,99,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />

          {/* ═══ SCAN LINES (multiple) ═══ */}
          <motion.div
            className="absolute left-0 right-0 h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent, #6c63ff, transparent)',
              boxShadow: '0 0 20px #6c63ff',
            }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-0 bottom-0 w-[2px]"
            style={{
              background: 'linear-gradient(180deg, transparent, #ff6584, transparent)',
              boxShadow: '0 0 20px #ff6584',
            }}
            animate={{ left: ['0%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 0.5 }}
          />

          {/* ═══ CORNER BRACKETS (HUD) ═══ */}
          {[
            { top: '20px', left: '20px', rotate: 0 },
            { top: '20px', right: '20px', rotate: 90 },
            { bottom: '20px', left: '20px', rotate: 270 },
            { bottom: '20px', right: '20px', rotate: 180 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="absolute"
              style={{
                ...pos,
                width: '50px',
                height: '50px',
                borderTop: '2px solid #6c63ff',
                borderLeft: '2px solid #6c63ff',
                transform: `rotate(${pos.rotate}deg)`,
                boxShadow: '0 0 15px rgba(108,99,255,0.5)',
              }}
            />
          ))}

          {/* ═══ TOP HUD BAR ═══ */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute top-16 left-1/2 -translate-x-1/2 flex items-center gap-4 px-4 py-1.5 rounded-full text-[0.6rem] font-mono uppercase tracking-widest"
            style={{
              background: 'rgba(108,99,255,0.1)',
              border: '1px solid rgba(108,99,255,0.4)',
              color: '#6c63ff',
            }}
          >
            <span>SYS v2.0</span>
            <span>|</span>
            <span>MERN_STACK</span>
            <span>|</span>
            <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }}>
              [LIVE]
            </motion.span>
          </motion.div>

          {/* ═══ TERMINAL ═══ */}
          <div
            className="absolute rounded-lg p-4 font-mono text-xs"
            style={{
              top: '80px',
              left: '20px',
              background: 'rgba(10,15,30,0.9)',
              border: '1px solid rgba(108,99,255,0.4)',
              minWidth: '260px',
              maxWidth: '380px',
              boxShadow: '0 0 30px rgba(108,99,255,0.2)',
              backdropFilter: 'blur(10px)',
              maxHeight: '280px',
              overflow: 'hidden',
            }}
          >
            <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: '1px solid rgba(108,99,255,0.2)' }}>
              <span className="size-2 rounded-full" style={{ background: '#ff5555' }} />
              <span className="size-2 rounded-full" style={{ background: '#ffcc00' }} />
              <span className="size-2 rounded-full" style={{ background: '#43e97b' }} />
              <span className="ml-2 text-[0.6rem] uppercase tracking-widest" style={{ color: 'rgba(108,99,255,0.7)' }}>
                neural_boot.sys
              </span>
            </div>
            {terminalLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-1 text-[0.7rem]"
                style={{ color: line.color }}
              >
                {line.text}
              </motion.p>
            ))}
            {phase !== 'reveal' && (
              <span className="animate-blink" style={{ color: '#6c63ff' }}>▊</span>
            )}
          </div>

          {/* ═══ FINGERPRINT SCANNER ═══ */}
          <div
            className="absolute rounded-lg p-4"
            style={{
              top: '80px',
              right: '20px',
              background: 'rgba(10,15,30,0.9)',
              border: '1px solid rgba(108,99,255,0.4)',
              width: '180px',
              boxShadow: '0 0 30px rgba(108,99,255,0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <p className="text-[0.55rem] uppercase tracking-widest font-mono mb-3" style={{ color: 'rgba(108,99,255,0.7)' }}>
              Biometric Scan
            </p>

            <div className="relative mx-auto" style={{ width: '80px', height: '100px' }}>
              {/* Fingerprint SVG */}
              <svg viewBox="0 0 100 120" className="w-full h-full">
                <defs>
                  <clipPath id="fpClip">
                    <rect x="0" y={120 - (fingerprintProgress * 1.2)} width="100" height="120" />
                  </clipPath>
                </defs>
                {/* Base fingerprint (gray) */}
                <g stroke="rgba(148,163,175,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round">
                  <path d="M 30 20 Q 50 15 70 20" />
                  <path d="M 25 30 Q 50 22 75 30" />
                  <path d="M 22 40 Q 50 30 78 40" />
                  <path d="M 25 50 Q 50 40 75 50" />
                  <path d="M 28 60 Q 50 50 72 60" />
                  <path d="M 30 70 Q 50 62 70 70" />
                  <path d="M 32 80 Q 50 72 68 80" />
                  <path d="M 35 90 Q 50 82 65 90" />
                  <path d="M 40 100 Q 50 95 60 100" />
                </g>
                {/* Scanned part (colored) */}
                <g stroke="#43e97b" strokeWidth="1.5" fill="none" strokeLinecap="round" clipPath="url(#fpClip)" style={{ filter: 'drop-shadow(0 0 3px #43e97b)' }}>
                  <path d="M 30 20 Q 50 15 70 20" />
                  <path d="M 25 30 Q 50 22 75 30" />
                  <path d="M 22 40 Q 50 30 78 40" />
                  <path d="M 25 50 Q 50 40 75 50" />
                  <path d="M 28 60 Q 50 50 72 60" />
                  <path d="M 30 70 Q 50 62 70 70" />
                  <path d="M 32 80 Q 50 72 68 80" />
                  <path d="M 35 90 Q 50 82 65 90" />
                  <path d="M 40 100 Q 50 95 60 100" />
                </g>
              </svg>

              {/* Scan line */}
              <motion.div
                className="absolute left-0 right-0 h-[2px]"
                style={{
                  background: '#43e97b',
                  boxShadow: '0 0 10px #43e97b',
                  bottom: `${fingerprintProgress}%`,
                }}
              />
            </div>

            <p className="mt-2 text-center text-[0.6rem] font-mono tabular-nums" style={{ color: fingerprintProgress === 100 ? '#43e97b' : '#6c63ff' }}>
              {fingerprintProgress === 100 ? '✓ VERIFIED' : `${fingerprintProgress}%`}
            </p>
          </div>

          {/* ═══ STATS PANEL (BOTTOM LEFT) ═══ */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute rounded-lg p-3 font-mono text-[0.65rem]"
            style={{
              bottom: '80px',
              left: '20px',
              background: 'rgba(10,15,30,0.9)',
              border: '1px solid rgba(108,99,255,0.4)',
              width: '200px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <p className="uppercase tracking-widest mb-2" style={{ color: 'rgba(108,99,255,0.7)' }}>
              System Stats
            </p>
            {[
              { label: 'React', value: 95 },
              { label: 'Node.js', value: 92 },
              { label: 'MongoDB', value: 90 },
              { label: 'Experience', value: 85 },
            ].map((stat, i) => (
              <div key={stat.label} className="mb-1.5">
                <div className="flex justify-between mb-0.5">
                  <span style={{ color: '#94a3b8' }}>{stat.label}</span>
                  <span style={{ color: '#6c63ff' }}>{stat.value}%</span>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(108,99,255,0.1)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ delay: 1 + i * 0.15, duration: 0.8 }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #6c63ff, #ff6584)',
                      boxShadow: '0 0 5px #6c63ff',
                    }}
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* ═══ LOCATION PANEL (BOTTOM RIGHT) ═══ */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute rounded-lg p-3 font-mono text-[0.6rem]"
            style={{
              bottom: '80px',
              right: '20px',
              background: 'rgba(10,15,30,0.9)',
              border: '1px solid rgba(108,99,255,0.4)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <p className="uppercase tracking-widest mb-2" style={{ color: 'rgba(108,99,255,0.7)' }}>
              📡 Location
            </p>
            <p style={{ color: '#94a3b8' }}>Swat, Pakistan 🇵🇰</p>
            <p style={{ color: '#94a3b8' }}>Lat: 34.7°N | Lng: 72.3°E</p>
            <p className="mt-1" style={{ color: '#43e97b' }}>Ping: 23ms | ● ONLINE</p>
          </motion.div>

          {/* ═══ NEURAL NETWORK ═══ */}
          {(phase === 'network' || phase === 'activation') && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg viewBox="0 0 100 100" style={{ width: 'min(500px, 70vw)', height: 'min(500px, 70vw)' }}>
                {connections.map(([from, to], i) => {
                  const fromNode = nodes.find((n) => n.id === from);
                  const toNode = nodes.find((n) => n.id === to);
                  return (
                    <motion.line
                      key={`conn-${i}`}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={phase === 'activation' ? '#ff6584' : '#6c63ff'}
                      strokeWidth="0.25"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: 1,
                        opacity: phase === 'activation' ? [0.3, 1, 0.3] : 0.5,
                      }}
                      transition={{
                        pathLength: { duration: 0.4, delay: i * 0.05 },
                        opacity: phase === 'activation' ? { duration: 0.4, repeat: Infinity } : { duration: 0.3 },
                      }}
                      style={{ filter: 'drop-shadow(0 0 2px currentColor)' }}
                    />
                  );
                })}

                {phase === 'network' &&
                  connections.map(([from, to], i) => {
                    const fromNode = nodes.find((n) => n.id === from);
                    const toNode = nodes.find((n) => n.id === to);
                    return (
                      <motion.circle
                        key={`pulse-${i}`}
                        r="0.5"
                        fill="#ff6584"
                        initial={{ cx: fromNode.x, cy: fromNode.y, opacity: 0 }}
                        animate={{
                          cx: [fromNode.x, toNode.x],
                          cy: [fromNode.y, toNode.y],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.1,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                        style={{ filter: 'drop-shadow(0 0 3px #ff6584)' }}
                      />
                    );
                  })}

                {nodes.map((node, i) => (
                  <g key={`node-${node.id}`}>
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r="1.8"
                      fill="none"
                      stroke="#6c63ff"
                      strokeWidth="0.15"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: phase === 'activation' ? [1, 2.5, 1] : 1,
                        opacity: phase === 'activation' ? [0.5, 0, 0.5] : 0.4,
                      }}
                      transition={{
                        scale: { duration: 1, repeat: Infinity, delay: i * 0.08 },
                        opacity: { duration: 1, repeat: Infinity, delay: i * 0.08 },
                      }}
                    />
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r="1"
                      fill={phase === 'activation' ? '#ff6584' : '#6c63ff'}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.04, type: 'spring' }}
                      style={{ filter: 'drop-shadow(0 0 3px currentColor)' }}
                    />
                    <circle cx={node.x} cy={node.y} r="0.35" fill="white" opacity="0.9" />
                  </g>
                ))}
              </svg>
            </div>
          )}

          {/* ═══ ACTIVATION FLASH ═══ */}
          {phase === 'activation' && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 20, 25] }}
              transition={{ duration: 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle, #ffffff, #6c63ff, transparent)',
                boxShadow: '0 0 300px #6c63ff',
              }}
            />
          )}

          {/* ═══ REVEAL - IDENTITY CARD ═══ */}
          {phase === 'reveal' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4"
            >
              {/* Holographic card */}
              <motion.div
                initial={{ scale: 0.5, rotateY: -180, opacity: 0 }}
                animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className="relative rounded-2xl p-6 sm:p-8 text-center"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(255,101,132,0.1))',
                  border: '2px solid rgba(108,99,255,0.5)',
                  boxShadow:
                    '0 0 60px rgba(108,99,255,0.4), inset 0 0 30px rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(20px)',
                  maxWidth: '400px',
                }}
              >
                {/* Corner accents */}
                {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner, i) => (
                  <motion.div
                    key={corner}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="absolute size-3 rounded-full"
                    style={{
                      [corner.split('-')[0]]: '-6px',
                      [corner.split('-')[1]]: '-6px',
                      background: '#6c63ff',
                      boxShadow: '0 0 10px #6c63ff',
                    }}
                  />
                ))}

                {/* Logo */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', delay: 0.3 }}
                  className="mx-auto mb-4 grid place-items-center rounded-2xl"
                  style={{
                    width: '90px',
                    height: '90px',
                    background: 'linear-gradient(135deg, #6c63ff, #ff6584)',
                    boxShadow: '0 0 40px rgba(108,99,255,0.8)',
                    fontSize: '32px',
                    fontWeight: '900',
                    color: 'white',
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  {profile.initials}
                </motion.div>

                {/* Name */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl sm:text-3xl font-extrabold mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff, #6c63ff, #ff6584)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  {profile.name}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-[0.7rem] uppercase tracking-[0.3em] font-semibold mb-4"
                  style={{ color: 'rgba(108,99,255,0.9)' }}
                >
                  {profile.title}
                </motion.p>

                {/* Status pills */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-wrap justify-center gap-2"
                >
                  {['✓ VERIFIED', '✓ ONLINE', '✓ AVAILABLE'].map((status, i) => (
                    <span
                      key={status}
                      className="text-[0.55rem] uppercase tracking-widest font-bold rounded-full px-2 py-1 font-mono"
                      style={{
                        background: 'rgba(67,233,123,0.15)',
                        color: '#43e97b',
                        border: '1px solid rgba(67,233,123,0.4)',
                      }}
                    >
                      {status}
                    </span>
                  ))}
                </motion.div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-6 text-[0.6rem] font-mono uppercase tracking-widest"
                style={{ color: '#43e97b' }}
              >
                ► ACCESS GRANTED - INITIALIZING PORTFOLIO
              </motion.p>
            </motion.div>
          )}

          {/* ═══ PROGRESS BAR ═══ */}
          <div
            className="absolute left-1/2 -translate-x-1/2 z-50"
            style={{ bottom: '30px', width: 'min(400px, 85vw)' }}
          >
            <div className="mb-2 flex justify-between text-[0.6rem] uppercase tracking-widest font-mono">
              <span style={{ color: 'rgba(148,163,175,0.6)' }}>
                {phase === 'boot' && 'INITIALIZING'}
                {phase === 'network' && 'NEURAL_LINK_ACTIVE'}
                {phase === 'activation' && 'SYNAPSE_FIRING'}
                {phase === 'reveal' && '● SYSTEM ONLINE'}
              </span>
              <span className="tabular-nums font-bold" style={{ color: '#6c63ff' }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div className="overflow-hidden rounded-full h-1" style={{ background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.2)' }}>
              <motion.div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #6c63ff, #ff6584, #43e97b)',
                  boxShadow: '0 0 15px #6c63ff',
                }}
              />
            </div>
          </div>

          {/* Skip */}
          <button
            type="button"
            onClick={() => {
              if (audioRef.current) audioRef.current.pause();
              onComplete();
            }}
            className="absolute z-50 text-[0.65rem] uppercase tracking-widest font-mono px-3 py-1 rounded"
            style={{
              top: '20px',
              right: '220px',
              color: 'rgba(148,163,175,0.5)',
              border: '1px solid rgba(148,163,175,0.2)',
            }}
          >
            [ESC] Skip →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}