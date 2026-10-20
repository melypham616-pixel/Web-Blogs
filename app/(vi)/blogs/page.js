import BlogsPage from "@/components/pages/BlogsPage";
import { pageMetadata, paths } from "@/lib/meta";
import { getDict } from "@/lib/i18n";

const LANG = "vi";
const t = getDict(LANG).blogs;
export const metadata = pageMetadata(LANG, paths("blogs"), { title: t.title, description: t.desc });

export default function Page() {
  return <BlogsPage lang={LANG} />;
}
