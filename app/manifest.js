export const dynamic = "force-static";

// Manifest để trình duyệt/điện thoại nhận tên và biểu tượng của blog khi lưu ra màn hình chính.
export default function manifest() {
  return {
    name: "Đi Rồi Kể",
    short_name: "Đi Rồi Kể",
    description: "Blog du lịch của Mely: Việt Nam, Malaysia, Singapore.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDFCFB",
    theme_color: "#1F3B33",
    icons: [{ src: "/icon.png", sizes: "192x192", type: "image/png" }, { src: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  };
}
