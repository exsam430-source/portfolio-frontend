import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../../context';

export default function F1Loader({ onComplete }) {
  const profile = useProfile();
  const [phase, setPhase] = useState('car');
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const [audioLoaded, setAudioLoaded] = useState(false);

  /* ── Audio Setup ── */
useEffect(() => {
  const reduceMotion =
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    onComplete();
    return;
  }

  try {
    /* Create audio with muted initial state (bypasses autoplay block) */
    const audio = new Audio('/sounds/bmw-engine.mp3');
    audio.volume = 0.35;
    audio.loop = true;
    audio.muted = false;
    audio.preload = 'auto';
    audioRef.current = audio;

    /* Multiple event listeners for cross-browser support */
    audio.addEventListener('canplaythrough', () => {
      setAudioLoaded(true);
    });

    audio.addEventListener('loadeddata', () => {
      setAudioLoaded(true);
    });

    audio.addEventListener('error', (e) => {
      console.warn('Audio load error:', e);
      setAudioLoaded(false);
    });

    /* Try to play immediately (may fail due to autoplay policy) */
    const attemptAutoplay = async () => {
      try {
        await audio.play();
        setAudioLoaded(true);
        console.log('✅ Audio autoplay successful');
      } catch (err) {
        console.warn('⚠️ Autoplay blocked — waiting for user interaction');
        setAudioLoaded(false);

        /* Set up listeners to play on ANY user interaction */
        const playOnInteraction = async () => {
          try {
            await audio.play();
            setAudioLoaded(true);
            console.log('✅ Audio started after interaction');

            /* Remove listeners once audio is playing */
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
            document.removeEventListener('keydown', playOnInteraction);
            document.removeEventListener('scroll', playOnInteraction);
            document.removeEventListener('mousemove', playOnInteraction);
          } catch (playErr) {
            console.warn('Audio play failed:', playErr);
          }
        };

        /* Listen for ANY user interaction */
        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('touchstart', playOnInteraction, { once: true });
        document.addEventListener('keydown', playOnInteraction, { once: true });
        document.addEventListener('scroll', playOnInteraction, { once: true });
        document.addEventListener('mousemove', playOnInteraction, { once: true });
      }
    };

    attemptAutoplay();
  } catch (err) {
    console.warn('Audio setup failed:', err);
    setAudioLoaded(false);
  }

  return () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };
}, []);

  /* ── Phase Management ── */
  useEffect(() => {
    const reduceMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      onComplete();
      return;
    }

    const CAR_DURATION = 6000;

    const carTimer = setTimeout(() => {
      setPhase('reveal');

      if (audioRef.current) {
        const fadeOut = setInterval(() => {
          if (audioRef.current && audioRef.current.volume > 0.02) {
            audioRef.current.volume = Math.max(
              0,
              audioRef.current.volume - 0.03
            );
          } else {
            clearInterval(fadeOut);
            if (audioRef.current) audioRef.current.pause();
          }
        }, 40);
      }
    }, CAR_DURATION + 200);

    let frame;
    const start = performance.now();
    const tick = (now) => {
      const pct = Math.min(100, ((now - start) / CAR_DURATION) * 100);
      setProgress(pct);

      if (audioRef.current) {
        try {
          audioRef.current.playbackRate = 0.85 + (pct / 100) * 0.45;
          audioRef.current.volume = Math.min(
            0.55,
            0.25 + (pct / 100) * 0.3
          );
        } catch {}
      }

      if (pct < 100) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      clearTimeout(carTimer);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (phase === 'reveal') {
      const t = setTimeout(() => {
        setPhase('done');
        setTimeout(onComplete, 500);
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
  key="sports-loader"
  exit={{ opacity: 0, scale: 1.08 }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
  className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
  style={{ background: '#050816' }}
  onClick={async () => {
    if (audioRef.current) {
      try {
        if (audioRef.current.paused) {
          await audioRef.current.play();
          setAudioLoaded(true);
        }
      } catch (err) {
        console.warn('Manual play failed:', err);
      }
    }
  }}
  onTouchStart={async () => {
    if (audioRef.current && audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setAudioLoaded(true);
      } catch {}
    }
  }}
>

          {/* Stars */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 120 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 2 + 0.5 + 'px',
                  height: Math.random() * 2 + 0.5 + 'px',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  opacity: Math.random() * 0.5 + 0.1,
                  animation: `blink ${Math.random() * 4 + 1}s ease-in-out infinite`,
                  animationDelay: Math.random() * 3 + 's',
                }}
              />
            ))}
          </div>

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(108,99,255,0.4) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(108,99,255,0.4) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />

          {/* Center glow */}
          <div
            className="absolute rounded-full"
            style={{
              width: '800px',
              height: '800px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background:
                'radial-gradient(circle, rgba(108,99,255,0.1) 0%, rgba(255,101,132,0.05) 40%, transparent 70%)',
            }}
          />

          {phase === 'car' && (
            <>
              <div
                className="relative w-full flex items-end justify-center"
                style={{ height: '380px' }}
              >
                {/* City Skyline */}
                <div
                  className="absolute w-full opacity-15"
                  style={{ bottom: '90px' }}
                >
                  <svg
                    viewBox="0 0 1200 120"
                    fill="none"
                    className="w-full"
                    preserveAspectRatio="none"
                    style={{ height: '100px' }}
                  >
                    <path
                      d="M0 120 L0 80 L25 80 L25 50 L45 50 L45 65 L70 65 L70 35 L90 35 L90 55 L110 55 L110 25 L130 25 L130 50 L155 50 L155 30 L175 30 L175 70 L200 70 L200 40 L230 40 L230 55 L260 55 L260 20 L290 20 L290 45 L320 45 L320 75 L350 75 L350 35 L380 35 L380 60 L410 60 L410 25 L440 25 L440 55 L470 55 L470 40 L500 40 L500 65 L530 65 L530 30 L560 30 L560 50 L590 50 L590 75 L620 75 L620 35 L650 35 L650 60 L680 60 L680 45 L710 45 L710 70 L740 70 L740 25 L770 25 L770 55 L800 55 L800 40 L830 40 L830 60 L860 60 L860 30 L890 30 L890 65 L920 65 L920 45 L950 45 L950 75 L980 75 L980 35 L1010 35 L1010 55 L1040 55 L1040 50 L1070 50 L1070 70 L1100 70 L1100 40 L1130 40 L1130 60 L1160 60 L1160 75 L1200 75 L1200 120Z"
                      fill="rgba(108,99,255,0.25)"
                    />
                  </svg>
                </div>

                {/* Road */}
                <div
                  className="absolute bottom-0 w-full"
                  style={{ height: '90px' }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to bottom, #12122a, #0a0a1a)',
                    }}
                  />
                  <div
                    className="absolute left-0 right-0 top-0"
                    style={{
                      height: '2px',
                      background:
                        'linear-gradient(90deg, transparent 5%, rgba(108,99,255,0.5) 30%, rgba(255,101,132,0.4) 70%, transparent 95%)',
                      boxShadow:
                        '0 0 8px rgba(108,99,255,0.4), 0 0 20px rgba(108,99,255,0.2)',
                    }}
                  />
                  <div
                    className="absolute left-0 right-0"
                    style={{
                      top: '45%',
                      height: '3px',
                      background:
                        'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.2) 50px, rgba(255,255,255,0.2) 100px)',
                      animation: 'road-move 0.5s linear infinite',
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to bottom, rgba(108,99,255,0.08), transparent 50%)',
                    }}
                  />
                </div>

                {/* ═══════════════════════════════════════
                    PREMIUM SPORTS CAR - CUSTOM SVG
                ═══════════════════════════════════════ */}
                <motion.div
                  initial={{ x: '-130%' }}
                  animate={{ x: '130vw' }}
                  transition={{
                    duration: 6,
                    ease: [0.4, 0.0, 0.6, 1.0],
                  }}
                  className="absolute z-20"
                  style={{ bottom: '60px' }}
                >
                  <div className="relative">
                    {/* ── Headlight beam ── */}
                    <div
                      className="absolute"
                      style={{
                        left: '100%',
                        top: '35%',
                        width: '350px',
                        height: '80px',
                        background:
                          'linear-gradient(to right, rgba(255,255,255,0.3), rgba(108,99,255,0.15), transparent)',
                        clipPath:
                          'polygon(0 20%, 100% 0%, 100% 100%, 0 80%)',
                        filter: 'blur(4px)',
                      }}
                    />
                    <div
                      className="absolute"
                      style={{
                        left: '100%',
                        top: '40%',
                        width: '200px',
                        height: '50px',
                        background:
                          'linear-gradient(to right, rgba(255,255,255,0.4), transparent)',
                        clipPath:
                          'polygon(0 25%, 100% 0%, 100% 100%, 0 75%)',
                        filter: 'blur(2px)',
                      }}
                    />

                    {/* ── Exhaust flames ── */}
                    <div
                      className="absolute"
                      style={{
                        right: '100%',
                        top: '58%',
                        transform: 'translateY(-50%)',
                      }}
                    >
                      <motion.div
                        animate={{
                          width: ['55px', '95px', '55px'],
                          opacity: [0.9, 1, 0.9],
                        }}
                        transition={{
                          duration: 0.15,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        style={{
                          height: '12px',
                          background:
                            'linear-gradient(to left, #ff3366, #ff6584, #ff9500, #ffcc00, transparent)',
                          borderRadius: '0 6px 6px 0',
                          filter: 'blur(1.5px)',
                        }}
                      />
                      <motion.div
                        animate={{
                          width: ['35px', '60px', '35px'],
                          opacity: [0.6, 0.9, 0.6],
                        }}
                        transition={{
                          duration: 0.12,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        style={{
                          height: '6px',
                          marginTop: '-10px',
                          background:
                            'linear-gradient(to left, #6c63ff, #3b82f6, transparent)',
                          borderRadius: '0 3px 3px 0',
                          filter: 'blur(1px)',
                        }}
                      />
                    </div>

                    {/* ── Motion blur trail ── */}
                    <div
                      style={{
                        position: 'absolute',
                        right: '100%',
                        top: '10%',
                        width: '300px',
                        height: '80%',
                        background:
                          'linear-gradient(to left, rgba(108,99,255,0.4), rgba(255,101,132,0.2), transparent)',
                        filter: 'blur(6px)',
                        borderRadius: '4px',
                      }}
                    />

                    {/* ═══ CUSTOM SPORTS CAR SVG ═══ */}
                    <svg
                      width="380"
                      height="140"
                      viewBox="0 0 380 140"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        filter:
                          'drop-shadow(0 10px 25px rgba(108,99,255,0.5)) drop-shadow(0 0 30px rgba(108,99,255,0.3))',
                      }}
                    >
                      {/* Gradient definitions */}
                      <defs>
                        {/* Main body gradient */}
                        <linearGradient
                          id="bodyGrad"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#2a2f4f" />
                          <stop offset="45%" stopColor="#1a1f3a" />
                          <stop offset="100%" stopColor="#0a0e1f" />
                        </linearGradient>

                        {/* Roof gradient */}
                        <linearGradient
                          id="roofGrad"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#3a3f5f" />
                          <stop offset="100%" stopColor="#1a1f3a" />
                        </linearGradient>

                        {/* Window gradient */}
                        <linearGradient
                          id="windowGrad"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="#6c63ff"
                            stopOpacity="0.35"
                          />
                          <stop
                            offset="50%"
                            stopColor="#8b7fff"
                            stopOpacity="0.15"
                          />
                          <stop
                            offset="100%"
                            stopColor="#6c63ff"
                            stopOpacity="0.25"
                          />
                        </linearGradient>

                        {/* Headlight gradient */}
                        <radialGradient id="headlightGrad">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="40%" stopColor="#a8b7ff" />
                          <stop offset="100%" stopColor="#6c63ff" />
                        </radialGradient>

                        {/* Wheel gradient */}
                        <radialGradient id="wheelGrad">
                          <stop offset="0%" stopColor="#2a2f4f" />
                          <stop offset="70%" stopColor="#0a0a1a" />
                          <stop offset="100%" stopColor="#000" />
                        </radialGradient>

                        {/* Body shine */}
                        <linearGradient
                          id="shineGrad"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="#ffffff"
                            stopOpacity="0.15"
                          />
                          <stop
                            offset="100%"
                            stopColor="#ffffff"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>

                      {/* ═══ SHADOW UNDER CAR ═══ */}
                      <ellipse
                        cx="190"
                        cy="128"
                        rx="150"
                        ry="8"
                        fill="rgba(108,99,255,0.4)"
                        style={{ filter: 'blur(6px)' }}
                      />

                      {/* ═══ MAIN LOWER BODY ═══ */}
                      <path
                        d="M 30 95
                           L 45 82
                           L 70 75
                           L 100 72
                           L 280 72
                           L 320 78
                           L 345 88
                           L 355 100
                           L 355 108
                           L 340 108
                           L 340 100
                           L 320 100
                           L 320 108
                           L 90 108
                           L 90 100
                           L 65 100
                           L 65 108
                           L 40 108
                           L 30 100 Z"
                        fill="url(#bodyGrad)"
                        stroke="rgba(108,99,255,0.5)"
                        strokeWidth="1.2"
                      />

                      {/* ═══ ROOF ═══ */}
                      <path
                        d="M 105 72
                           L 130 42
                           L 250 42
                           L 275 72 Z"
                        fill="url(#roofGrad)"
                        stroke="rgba(108,99,255,0.4)"
                        strokeWidth="1"
                      />

                      {/* Roof top highlight */}
                      <path
                        d="M 135 43 L 245 43"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />

                      {/* ═══ WINDSHIELD ═══ */}
                      <path
                        d="M 108 72
                           L 130 44
                           L 175 44
                           L 175 72 Z"
                        fill="url(#windowGrad)"
                        stroke="rgba(108,99,255,0.6)"
                        strokeWidth="0.8"
                      />

                      {/* Windshield reflection */}
                      <path
                        d="M 115 65
                           L 128 48
                           L 132 48
                           L 120 65 Z"
                        fill="rgba(255,255,255,0.2)"
                      />

                      {/* ═══ REAR WINDOW ═══ */}
                      <path
                        d="M 205 44
                           L 250 44
                           L 272 72
                           L 205 72 Z"
                        fill="url(#windowGrad)"
                        stroke="rgba(108,99,255,0.6)"
                        strokeWidth="0.8"
                      />

                      {/* Rear window reflection */}
                      <path
                        d="M 240 48 L 260 65 L 265 65 L 245 48 Z"
                        fill="rgba(255,255,255,0.15)"
                      />

                      {/* ═══ SIDE WINDOW (between doors) ═══ */}
                      <path
                        d="M 180 44
                           L 200 44
                           L 200 72
                           L 180 72 Z"
                        fill="url(#windowGrad)"
                        stroke="rgba(108,99,255,0.5)"
                        strokeWidth="0.6"
                      />

                      {/* B-pillar */}
                      <line
                        x1="190"
                        y1="44"
                        x2="190"
                        y2="72"
                        stroke="rgba(30,35,60,0.8)"
                        strokeWidth="2"
                      />

                      {/* ═══ BODY SHINE (top highlight) ═══ */}
                      <path
                        d="M 65 78
                           L 320 78
                           L 320 82
                           L 65 82 Z"
                        fill="url(#shineGrad)"
                      />

                      {/* ═══ CHARACTER LINES ═══ */}
                      {/* Upper body line */}
                      <line
                        x1="55"
                        y1="90"
                        x2="330"
                        y2="90"
                        stroke="rgba(108,99,255,0.3)"
                        strokeWidth="0.8"
                      />
                      {/* Lower rocker line */}
                      <line
                        x1="45"
                        y1="105"
                        x2="345"
                        y2="105"
                        stroke="rgba(108,99,255,0.2)"
                        strokeWidth="0.5"
                      />

                      {/* ═══ DOOR HANDLES ═══ */}
                      <rect
                        x="145"
                        y="83"
                        width="14"
                        height="3"
                        rx="1.5"
                        fill="rgba(0,0,0,0.6)"
                        stroke="rgba(108,99,255,0.4)"
                        strokeWidth="0.5"
                      />
                      <rect
                        x="215"
                        y="83"
                        width="14"
                        height="3"
                        rx="1.5"
                        fill="rgba(0,0,0,0.6)"
                        stroke="rgba(108,99,255,0.4)"
                        strokeWidth="0.5"
                      />

                      {/* Door lines */}
                      <line
                        x1="140"
                        y1="72"
                        x2="140"
                        y2="105"
                        stroke="rgba(30,35,60,0.7)"
                        strokeWidth="0.8"
                      />
                      <line
                        x1="210"
                        y1="72"
                        x2="210"
                        y2="105"
                        stroke="rgba(30,35,60,0.7)"
                        strokeWidth="0.8"
                      />

                      {/* ═══ SIDE MIRROR ═══ */}
                      <path
                        d="M 128 50
                           L 122 46
                           L 118 52
                           L 124 55 Z"
                        fill="#1a1f3a"
                        stroke="rgba(108,99,255,0.4)"
                        strokeWidth="0.5"
                      />
                      {/* Mirror glass */}
                      <path
                        d="M 121 47
                           L 124 46
                           L 123 51
                           L 120 52 Z"
                        fill="rgba(108,99,255,0.3)"
                      />

                      {/* ═══ FRONT (RIGHT SIDE) ═══ */}
                      {/* Hood */}
                      <path
                        d="M 275 72
                           L 320 78
                           L 345 88
                           L 340 82
                           L 300 74 Z"
                        fill="rgba(58,63,95,0.8)"
                        stroke="rgba(108,99,255,0.3)"
                        strokeWidth="0.5"
                      />

                      {/* Front bumper */}
                      <path
                        d="M 340 95
                           L 358 95
                           L 358 102
                           L 340 102 Z"
                        fill="#0d1224"
                        stroke="rgba(108,99,255,0.3)"
                        strokeWidth="0.5"
                      />

                      {/* Front grille */}
                      <rect
                        x="335"
                        y="90"
                        width="20"
                        height="8"
                        rx="1.5"
                        fill="#000"
                        stroke="rgba(108,99,255,0.4)"
                        strokeWidth="0.8"
                      />
                      {/* Grille slats */}
                      {[0, 2, 4, 6].map((y) => (
                        <line
                          key={`grille-${y}`}
                          x1="336"
                          y1={91 + y}
                          x2="354"
                          y2={91 + y}
                          stroke="rgba(108,99,255,0.3)"
                          strokeWidth="0.4"
                        />
                      ))}

                      {/* ═══ HEADLIGHTS (Angel Eyes style) ═══ */}
                      <ellipse
                        cx="350"
                        cy="83"
                        rx="7"
                        ry="5"
                        fill="url(#headlightGrad)"
                        stroke="#fff"
                        strokeWidth="0.8"
                      >
                        <animate
                          attributeName="fill-opacity"
                          values="0.9;1;0.9"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      </ellipse>
                      {/* Inner headlight */}
                      <circle
                        cx="350"
                        cy="83"
                        r="2.5"
                        fill="#fff"
                        opacity="0.9"
                      />
                      {/* Headlight ring glow */}
                      <ellipse
                        cx="350"
                        cy="83"
                        rx="9"
                        ry="6.5"
                        fill="none"
                        stroke="rgba(108,99,255,0.6)"
                        strokeWidth="1"
                        opacity="0.7"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.4;0.9;0.4"
                          dur="1.5s"
                          repeatCount="indefinite"
                        />
                      </ellipse>

                      {/* DRL strip */}
                      <path
                        d="M 342 76 L 355 74"
                        stroke="#6c63ff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.9"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.6;1;0.6"
                          dur="1.2s"
                          repeatCount="indefinite"
                        />
                      </path>

                      {/* Fog lights */}
                      <circle
                        cx="345"
                        cy="99"
                        r="2"
                        fill="#ffeb3b"
                        opacity="0.7"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.5;0.9;0.5"
                          dur="0.9s"
                          repeatCount="indefinite"
                        />
                      </circle>

                      {/* Air intake */}
                      <path
                        d="M 320 100
                           L 340 100
                           L 342 106
                           L 320 106 Z"
                        fill="#000"
                        stroke="rgba(108,99,255,0.3)"
                        strokeWidth="0.5"
                      />

                      {/* ═══ REAR (LEFT SIDE) ═══ */}
                      {/* Trunk */}
                      <path
                        d="M 30 95
                           L 45 82
                           L 65 76
                           L 105 72
                           L 105 82
                           L 60 88 Z"
                        fill="rgba(42,47,79,0.7)"
                        stroke="rgba(108,99,255,0.3)"
                        strokeWidth="0.5"
                      />

                      {/* Rear bumper */}
                      <path
                        d="M 22 95
                           L 40 95
                           L 40 102
                           L 22 102 Z"
                        fill="#0d1224"
                        stroke="rgba(108,99,255,0.3)"
                        strokeWidth="0.5"
                      />

                      {/* ═══ TAIL LIGHTS ═══ */}
                      <rect
                        x="30"
                        y="80"
                        width="14"
                        height="8"
                        rx="2"
                        fill="#ff2020"
                        opacity="0.95"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.7;1;0.7"
                          dur="0.8s"
                          repeatCount="indefinite"
                        />
                      </rect>
                      {/* Tail light bar */}
                      <rect
                        x="32"
                        y="82"
                        width="10"
                        height="1.5"
                        rx="0.5"
                        fill="#fff"
                        opacity="0.6"
                      />
                      {/* Tail light glow */}
                      <rect
                        x="27"
                        y="78"
                        width="20"
                        height="12"
                        rx="3"
                        fill="rgba(255,32,32,0.4)"
                        style={{ filter: 'blur(4px)' }}
                      >
                        <animate
                          attributeName="opacity"
                          values="0.4;0.8;0.4"
                          dur="0.8s"
                          repeatCount="indefinite"
                        />
                      </rect>

                      {/* Exhaust tips */}
                      <ellipse
                        cx="26"
                        cy="99"
                        rx="4"
                        ry="2.5"
                        fill="#1a1a1a"
                        stroke="rgba(255,101,132,0.7)"
                        strokeWidth="1"
                      />
                      <ellipse
                        cx="26"
                        cy="99"
                        rx="2"
                        ry="1"
                        fill="#ff6584"
                        opacity="0.6"
                      />

                      {/* ═══ MA BADGE (You!) ═══ */}
                      <rect
                        x="175"
                        y="92"
                        width="30"
                        height="12"
                        rx="2.5"
                        fill="rgba(0,0,0,0.7)"
                        stroke="rgba(108,99,255,0.5)"
                        strokeWidth="0.8"
                      />
                      {/* Colored stripes */}
                      <rect
                        x="177"
                        y="94"
                        width="4"
                        height="8"
                        rx="0.5"
                        fill="#6c63ff"
                      />
                      <rect
                        x="182"
                        y="94"
                        width="4"
                        height="8"
                        rx="0.5"
                        fill="#ff6584"
                      />
                      <rect
                        x="187"
                        y="94"
                        width="4"
                        height="8"
                        rx="0.5"
                        fill="#43e97b"
                      />
                      <text
                        x="197"
                        y="101"
                        fill="white"
                        fontSize="8"
                        fontWeight="900"
                        fontFamily="Arial, sans-serif"
                        textAnchor="middle"
                      >
                        MA
                      </text>

                      {/* ═══ FRONT WHEEL ═══ */}
                      {/* Wheel arch shadow */}
                      <ellipse
                        cx="298"
                        cy="108"
                        rx="22"
                        ry="6"
                        fill="rgba(0,0,0,0.5)"
                      />
                      {/* Tire */}
                      <circle
                        cx="298"
                        cy="108"
                        r="18"
                        fill="#0a0a0a"
                        stroke="rgba(108,99,255,0.6)"
                        strokeWidth="1.5"
                      />
                      {/* Tire sidewall */}
                      <circle
                        cx="298"
                        cy="108"
                        r="15"
                        fill="#151515"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="0.5"
                      />
                      {/* Rim */}
                      <circle
                        cx="298"
                        cy="108"
                        r="10"
                        fill="url(#wheelGrad)"
                        stroke="rgba(108,99,255,0.5)"
                        strokeWidth="1"
                      />
                      {/* Rim spokes (5-star sport rim) */}
                      {[0, 72, 144, 216, 288].map((angle) => (
                        <g key={`fspoke-${angle}`}>
                          <line
                            x1="298"
                            y1="108"
                            x2={
                              298 +
                              Math.cos((angle * Math.PI) / 180) * 9
                            }
                            y2={
                              108 +
                              Math.sin((angle * Math.PI) / 180) * 9
                            }
                            stroke="rgba(108,99,255,0.7)"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                          />
                          <circle
                            cx={
                              298 +
                              Math.cos((angle * Math.PI) / 180) * 7
                            }
                            cy={
                              108 +
                              Math.sin((angle * Math.PI) / 180) * 7
                            }
                            r="1.5"
                            fill="rgba(108,99,255,0.4)"
                          />
                        </g>
                      ))}
                      {/* Center cap */}
                      <circle
                        cx="298"
                        cy="108"
                        r="3"
                        fill="#1a1f3a"
                        stroke="rgba(108,99,255,0.8)"
                        strokeWidth="0.8"
                      />
                      <circle
                        cx="298"
                        cy="108"
                        r="1.5"
                        fill="#6c63ff"
                        opacity="0.8"
                      />
                      {/* Brake caliper */}
                      <path
                        d="M 305 102 L 308 108 L 305 114 L 302 111 L 302 105 Z"
                        fill="rgba(255,101,132,0.8)"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.6;1;0.6"
                          dur="0.5s"
                          repeatCount="indefinite"
                        />
                      </path>

                      {/* ═══ REAR WHEEL ═══ */}
                      <ellipse
                        cx="80"
                        cy="108"
                        rx="22"
                        ry="6"
                        fill="rgba(0,0,0,0.5)"
                      />
                      <circle
                        cx="80"
                        cy="108"
                        r="18"
                        fill="#0a0a0a"
                        stroke="rgba(108,99,255,0.6)"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="80"
                        cy="108"
                        r="15"
                        fill="#151515"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="0.5"
                      />
                      <circle
                        cx="80"
                        cy="108"
                        r="10"
                        fill="url(#wheelGrad)"
                        stroke="rgba(108,99,255,0.5)"
                        strokeWidth="1"
                      />
                      {[0, 72, 144, 216, 288].map((angle) => (
                        <g key={`rspoke-${angle}`}>
                          <line
                            x1="80"
                            y1="108"
                            x2={
                              80 +
                              Math.cos((angle * Math.PI) / 180) * 9
                            }
                            y2={
                              108 +
                              Math.sin((angle * Math.PI) / 180) * 9
                            }
                            stroke="rgba(108,99,255,0.7)"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                          />
                          <circle
                            cx={
                              80 +
                              Math.cos((angle * Math.PI) / 180) * 7
                            }
                            cy={
                              108 +
                              Math.sin((angle * Math.PI) / 180) * 7
                            }
                            r="1.5"
                            fill="rgba(108,99,255,0.4)"
                          />
                        </g>
                      ))}
                      <circle
                        cx="80"
                        cy="108"
                        r="3"
                        fill="#1a1f3a"
                        stroke="rgba(108,99,255,0.8)"
                        strokeWidth="0.8"
                      />
                      <circle
                        cx="80"
                        cy="108"
                        r="1.5"
                        fill="#6c63ff"
                        opacity="0.8"
                      />
                      <path
                        d="M 87 102 L 90 108 L 87 114 L 84 111 L 84 105 Z"
                        fill="rgba(255,101,132,0.8)"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.6;1;0.6"
                          dur="0.5s"
                          repeatCount="indefinite"
                        />
                      </path>

                      {/* ═══ NEON UNDERGLOW ═══ */}
                      <ellipse
                        cx="190"
                        cy="118"
                        rx="130"
                        ry="4"
                        fill="rgba(108,99,255,0.7)"
                        style={{ filter: 'blur(6px)' }}
                      >
                        <animate
                          attributeName="opacity"
                          values="0.5;1;0.5"
                          dur="1.2s"
                          repeatCount="indefinite"
                        />
                      </ellipse>
                      {/* Secondary underglow */}
                      <ellipse
                        cx="190"
                        cy="120"
                        rx="100"
                        ry="3"
                        fill="rgba(255,101,132,0.5)"
                        style={{ filter: 'blur(4px)' }}
                      >
                        <animate
                          attributeName="opacity"
                          values="0.3;0.7;0.3"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      </ellipse>

                      {/* ═══ REAR SPOILER ═══ */}
                      <path
                        d="M 55 75
                           L 105 72
                           L 105 68
                           L 55 71 Z"
                        fill="rgba(30,35,60,0.9)"
                        stroke="rgba(108,99,255,0.5)"
                        strokeWidth="0.8"
                      />
                      {/* Spoiler support */}
                      <rect
                        x="60"
                        y="71"
                        width="1.5"
                        height="6"
                        fill="rgba(108,99,255,0.3)"
                      />
                      <rect
                        x="98"
                        y="71"
                        width="1.5"
                        height="6"
                        fill="rgba(108,99,255,0.3)"
                      />
                    </svg>

                    {/* ── Tire smoke ── */}
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={`smoke-${i}`}
                        className="absolute rounded-full"
                        style={{
                          width: `${18 + i * 6}px`,
                          height: `${18 + i * 6}px`,
                          bottom: '-8px',
                          right: `${72 + i * 8}%`,
                          background: 'rgba(255,255,255,0.05)',
                          filter: 'blur(10px)',
                        }}
                        animate={{
                          x: [-15, -80 - i * 30],
                          y: [0, -25 - i * 10],
                          opacity: [0.25, 0],
                          scale: [1, 3 + i * 0.5],
                        }}
                        transition={{
                          duration: 0.6 + i * 0.1,
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: 'easeOut',
                        }}
                      />
                    ))}

                    {/* ── Ground sparks ── */}
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={`spark-${i}`}
                        className="absolute rounded-full"
                        style={{
                          width: '4px',
                          height: '4px',
                          bottom: '-2px',
                          left: `${25 + i * 20}%`,
                          background: '#ffcc00',
                          boxShadow: '0 0 6px #ffcc00',
                        }}
                        animate={{
                          x: [0, -40 - i * 20],
                          y: [0, -15, 5],
                          opacity: [1, 0],
                          scale: [1, 0],
                        }}
                        transition={{
                          duration: 0.4,
                          repeat: Infinity,
                          delay: i * 0.12 + Math.random() * 0.3,
                          ease: 'easeOut',
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Speed lines */}
                {[15, 32, 48, 62, 78, 92].map((top, i) => (
                  <motion.div
                    key={`speed-${i}`}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: [0, 1, 0],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + i * 0.08,
                      repeat: Infinity,
                      repeatDelay: 0.2,
                    }}
                    style={{
                      position: 'absolute',
                      top: `${top}px`,
                      right: '2%',
                      width: `${60 + i * 25}px`,
                      height: '1.5px',
                      background: `linear-gradient(to left, transparent, ${
                        i % 2 === 0
                          ? 'rgba(108,99,255,0.6)'
                          : 'rgba(255,101,132,0.5)'
                      })`,
                      transformOrigin: 'right',
                    }}
                  />
                ))}
              </div>

              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="mt-8 text-center"
              >
                <p
                  className="text-4xl font-extrabold sm:text-5xl"
                  style={{
                    background:
                      'linear-gradient(135deg, #6c63ff, #ff6584, #43e97b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontFamily: 'Manrope, sans-serif',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {profile.name}
                </p>
                <p
                  className="mt-2 text-sm font-semibold uppercase tracking-[0.3em]"
                  style={{ color: 'rgba(148,163,175,0.7)' }}
                >
                  {profile.title}
                </p>

                {audioLoaded && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-2 text-[0.6rem] uppercase tracking-[0.2em]"
                    style={{ color: 'rgba(108,99,255,0.4)' }}
                  >
                    🔊 Engine Sound ON
                  </motion.p>
                )}
              </motion.div>

              {/* Progress */}
              <div className="mt-8" style={{ width: '300px' }}>
                <div
                  className="overflow-hidden rounded-full"
                  style={{
                    height: '4px',
                    background: 'rgba(108,99,255,0.12)',
                  }}
                >
                  <motion.div
                    style={{
                      width: `${progress}%`,
                      height: '100%',
                      background:
                        'linear-gradient(90deg, #6c63ff, #ff6584, #43e97b)',
                      boxShadow: '0 0 15px rgba(108,99,255,0.7)',
                      borderRadius: '999px',
                    }}
                    transition={{ duration: 0.05 }}
                  />
                </div>
                <div className="mt-2 flex justify-between">
                  <span
                    className="text-[0.65rem] font-medium"
                    style={{ color: 'rgba(148,163,175,0.5)' }}
                  >
                    Loading portfolio
                  </span>
                  <span
                    className="text-[0.65rem] font-bold tabular-nums"
                    style={{ color: '#6c63ff' }}
                  >
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>

              <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5 }}
  className="mt-5 flex items-center gap-2 text-[0.65rem] uppercase tracking-widest"
  style={{
    color: audioLoaded
      ? 'rgba(108,99,255,0.6)'
      : 'rgba(255,255,255,0.3)',
  }}
>
  {audioLoaded ? (
    <>
      <motion.span
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        style={{ fontSize: '14px' }}
      >
        🔊
      </motion.span>
      <span>Engine Sound ON</span>
    </>
  ) : (
    <>
      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ fontSize: '14px' }}
      >
        👆
      </motion.span>
      <span>Click anywhere for engine sound</span>
    </>
  )}
</motion.div>
            </>
          )}

          {phase === 'reveal' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 15,
                }}
                className="mx-auto mb-6"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '28px',
                  display: 'grid',
                  placeItems: 'center',
                  background:
                    'linear-gradient(135deg, #6c63ff, #ff6584)',
                  boxShadow:
                    '0 0 60px rgba(108,99,255,0.8), 0 0 120px rgba(108,99,255,0.3)',
                  fontSize: '32px',
                  fontWeight: '900',
                  color: 'white',
                  fontFamily: 'Manrope, sans-serif',
                }}
              >
                {profile.initials}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-3xl font-extrabold"
                style={{
                  background:
                    'linear-gradient(135deg, #6c63ff, #ff6584)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'Manrope, sans-serif',
                }}
              >
                Welcome!
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-3 text-sm font-medium"
                style={{ color: 'rgba(148,163,175,0.6)' }}
              >
                Let's build something amazing
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}