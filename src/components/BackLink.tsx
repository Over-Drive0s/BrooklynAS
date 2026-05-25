"use client";

import { useRouter } from "next/navigation";

type BackLinkProps = {
  className?: string;
  label?: string;
};

export default function BackLink({ className = "", label = "← Back" }: BackLinkProps) {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()} className={className}>
      {label}
    </button>
  );
}
