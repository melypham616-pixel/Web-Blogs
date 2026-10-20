import AboutPage from "@/components/pages/AboutPage";
import { pageMetadata, paths } from "@/lib/meta";
import { getDict } from "@/lib/i18n";

const LANG = "vi";
const t = getDict(LANG).about;
export const metadata = pageMetadata(LANG, paths("about"), { title: t.title, description: t.desc });

export default function Page() {
  return <AboutPage lang={LANG} />;
}
