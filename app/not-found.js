import Link from "next/link";

export const metadata = { title: "Không tìm thấy trang" };

export default function NotFound() {
  return (
    <main className="wrap" style={{ textAlign: "center", paddingBlock: "80px" }}>
      <div className="label accent">404</div>
      <h1 style={{ fontSize: "clamp(30px,5vw,44px)", margin: "12px 0 16px" }}>Trang này đi lạc mất rồi</h1>
      <p className="empty" style={{ marginBottom: 28 }}>Có thể đường dẫn đã thay đổi. Bạn quay về trang chủ để tìm bài viết nhé.</p>
      <Link className="btn" href="/">Về trang chủ</Link>
    </main>
  );
}
