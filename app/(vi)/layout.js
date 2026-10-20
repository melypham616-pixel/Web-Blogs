import SiteLayout from "@/components/SiteLayout";
import { layoutMetadata, viewport as sharedViewport } from "@/lib/meta";

export const metadata = layoutMetadata("vi");
export const viewport = sharedViewport;

export default function RootLayout({ children }) {
  return <SiteLayout lang="vi">{children}</SiteLayout>;
}
