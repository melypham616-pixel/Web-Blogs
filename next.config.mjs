/** Xuất ra web tĩnh (thư mục out/) để host ở bất kỳ đâu: GitHub Pages, Netlify, Vercel, hosting thường. */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Cho phép một trang 404 chung khi site có nhiều layout gốc (tiếng Việt và /en)
  experimental: { globalNotFound: true },
};

export default nextConfig;
