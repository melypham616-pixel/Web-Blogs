import "./globals.css";
import Link from "next/link";
import { fontVariables } from "@/lib/fonts";
import { getDict } from "@/lib/i18n";

export const metadata = { title: "404 | Đi Rồi Kể" };

// Trang 404 chung cho toàn site (mọi ngôn ngữ): hiện cả tiếng Việt và English
export default function GlobalNotFound() {
  const vi = getDict("vi").notFound, en = getDict("en").notFound;
  return (
    <html lang="vi" className={fontVariables}>
      <body>
        <main className="wrap" style={{ textAlign: "center", paddingBlock: "80px" }}>
          <div className="label accent">404</div>
          <h1 style={{ fontSize: "clamp(30px,5vw,44px)", margin: "12px 0 16px" }}>{vi.title}</h1>
          <p className="empty" style={{ marginBottom: 12 }}>{vi.text}</p>
          <p className="empty" style={{ marginBottom: 28 }}><em>{en.title}. {en.text}</em></p>
          <Link className="btn" href="/" style={{ marginRight: 10 }}>{vi.home}</Link>
          <Link className="btn" href="/en/">{en.home}</Link>
        </main>
      </body>
    </html>
  );
}
