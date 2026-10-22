import Script from "next/script";

// Google Analytics 4 (mã đo lường công khai của blog; có thể ghi đè bằng NEXT_PUBLIC_GA_ID). GA4 tự theo dõi chuyển trang.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-Y9QGGK1M36";

export default function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}</Script>
    </>
  );
}
