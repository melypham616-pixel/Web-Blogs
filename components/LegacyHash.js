"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Link cũ của bản trước dùng dấu # (vd. /#bai/ha-giang): chuyển sang đường dẫn mới
const MAP = { "#cam-nang": "/cam-nang/", "#gioi-thieu": "/gioi-thieu/", "#trach-nhiem": "/blogs/" };
// Bài đã đổi đường dẫn
const RENAMED = { "fort-canning": "clarke-quay" };
// Bài đã gỡ: đưa người đọc về trang Blogs
const REMOVED = ["rt-rua", "rt-sanho", "rt-lang"];

export default function LegacyHash() {
  const router = useRouter();
  useEffect(() => {
    const h = location.hash;
    if (h.startsWith("#bai/")) {
      const id = h.slice(5);
      router.replace(REMOVED.includes(id) ? "/blogs/" : `/bai/${RENAMED[id] || id}/`);
    }
    else if (MAP[h]) router.replace(MAP[h]);
  }, [router]);
  return null;
}
