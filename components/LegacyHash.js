"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Link cũ của bản trước dùng dấu # (vd. /#bai/ha-giang): chuyển sang đường dẫn mới
const MAP = { "#cam-nang": "/cam-nang/", "#gioi-thieu": "/gioi-thieu/", "#trach-nhiem": "/blogs/" };

export default function LegacyHash() {
  const router = useRouter();
  useEffect(() => {
    const h = location.hash;
    if (h.startsWith("#bai/")) router.replace(`/bai/${h.slice(5)}/`);
    else if (MAP[h]) router.replace(MAP[h]);
  }, [router]);
  return null;
}
