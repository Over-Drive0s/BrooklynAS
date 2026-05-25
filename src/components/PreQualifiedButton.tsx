"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";

type PreQualifiedButtonProps = {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const brandColors = ["#E31E24", "#FF3B42", "#FFFFFF", "#FFD700", "#0A0A0A"];

export default function PreQualifiedButton({
  href,
  className,
  onClick,
  children,
}: PreQualifiedButtonProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const lastBurst = useRef(0);

  const fireConfetti = useCallback(async () => {
    const now = Date.now();
    if (now - lastBurst.current < 700) return;
    lastBurst.current = now;

    const node = linkRef.current;
    if (!node) return;

    const { default: confetti } = await import("canvas-confetti");
    const rect = node.getBoundingClientRect();
    const origin = {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    };

    confetti({
      particleCount: 90,
      spread: 110,
      startVelocity: 42,
      gravity: 0.9,
      ticks: 180,
      origin,
      colors: brandColors,
      disableForReducedMotion: true,
    });

    confetti({
      particleCount: 40,
      spread: 360,
      startVelocity: 28,
      decay: 0.92,
      scalar: 0.85,
      origin,
      colors: brandColors,
      disableForReducedMotion: true,
    });
  }, []);

  return (
    <Link
      ref={linkRef}
      href={href}
      className={className}
      onMouseEnter={fireConfetti}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
