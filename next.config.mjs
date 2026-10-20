/** Xuất ra web tĩnh (thư mục out/) để host ở bất kỳ đâu: GitHub Pages, Netlify, Vercel, hosting thường. */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
