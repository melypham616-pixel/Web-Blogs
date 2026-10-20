import GuidePage from "@/components/pages/GuidePage";
import { pageMetadata, paths } from "@/lib/meta";
import { getDict } from "@/lib/i18n";

const LANG = "vi";
const t = getDict(LANG).guide;
export const metadata = pageMetadata(LANG, paths("guide"), { title: t.title, description: t.desc });

export default function Page() {
  return <GuidePage lang={LANG} />;
}
