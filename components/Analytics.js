import Script from "next/script";

// Google Analytics 4. Chỉ chạy khi đã đặt NEXT_PUBLIC_GA_ID (dạng G-XXXXXXXXXX); GA4 tự theo dõi chuyển trang.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}</Script>
    </>
  );
}
