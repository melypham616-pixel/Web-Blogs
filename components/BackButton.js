"use client";
import { useRouter } from "next/navigation";
import { getDict, route } from "@/lib/i18n";

// Quay lại trang trước trong blog; nếu người đọc vào thẳng bài từ bên ngoài thì về trang chủ
export default function BackButton({ lang }) {
  const router = useRouter();
  const back = () => {
    // window.__driInApp do Nav đặt khi người đọc đã chuyển trang bên trong blog
    const fromHere = window.__driInApp || (document.referrer && new URL(document.referrer).origin === location.origin);
    if (fromHere && history.length > 1) router.back(); else router.push(route(lang, "home"));
  };
  return <button type="button" className="back-link" onClick={back}>{getDict(lang).post.back}</button>;
}
