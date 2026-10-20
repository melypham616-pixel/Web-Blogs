import HomePage from "@/components/pages/HomePage";
import { pageMetadata, paths } from "@/lib/meta";

const LANG = "vi";
export const metadata = pageMetadata(LANG, paths("home"));

export default function Page() {
  return <HomePage lang={LANG} />;
}
