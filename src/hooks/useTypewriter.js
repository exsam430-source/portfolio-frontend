import { useEffect, useState } from 'react';

/**
 * Typewriter effect that types, pauses, deletes, then advances to the
 * next string — used for the rotating hero titles.
 *
 * Respects `prefers-reduced-motion` by showing the full string statically.
 *
 * @param {string[]} words
 * @param {object}  [options]
 */
export default function useTypewriter(words = [], options = {}) {
  const {
    typeSpeed = 75,
    deleteSpeed = 38,
    holdDelay = 1900,
    startDelay = 350,
  } = options;

  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  /* Small delay so the hero entrance animation lands first. */
  useEffect(() => {
    if (reduceMotion) return undefined;
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !started || !words.length) return undefined;

    const current = words[wordIndex % words.length];

    /* Finished typing → hold, then start deleting. */
    if (!isDeleting && text === current) {
      const t = setTimeout(() => setIsDeleting(true), holdDelay);
      return () => clearTimeout(t);
    }

    /* Finished deleting → advance to the next word. */
    if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return undefined;
    }

    const t = setTimeout(
      () => {
        setText((prev) =>
          isDeleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        );
      },
      isDeleting ? deleteSpeed : typeSpeed,
    );

    return () => clearTimeout(t);
  }, [text, isDeleting, wordIndex, words, started, typeSpeed, deleteSpeed, holdDelay, reduceMotion]);

  if (reduceMotion) return { text: words[0] || '', isDeleting: false };
  return { text, isDeleting };
}
