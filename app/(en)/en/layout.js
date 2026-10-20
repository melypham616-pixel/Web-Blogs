import SiteLayout from "@/components/SiteLayout";
import { layoutMetadata, viewport as sharedViewport } from "@/lib/meta";

export const metadata = layoutMetadata("en");
export const viewport = sharedViewport;

export default function RootLayout({ children }) {
  return <SiteLayout lang="en">{children}</SiteLayout>;
}
