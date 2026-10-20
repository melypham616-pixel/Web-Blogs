"use client";
import { useEffect, useState } from "react";

// Thanh tiến độ đọc ở mép trên màn hình
export default function ReadProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setPct(max > 0 ? Math.min(100, scrollY / max * 100) : 0);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); };
  }, []);
  return <div className="progress" style={{ width: pct + "%" }} aria-hidden="true" />;
}
