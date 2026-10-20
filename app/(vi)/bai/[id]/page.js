import PostPage, { postMetadata } from "@/components/pages/PostPage";
import { allIds } from "@/lib/content";

const LANG = "vi";
export const dynamicParams = false;
export const generateStaticParams = () => allIds().map(id => ({ id }));

export async function generateMetadata({ params }) {
  const { id } = await params;
  return postMetadata(LANG, id);
}

export default async function Page({ params }) {
  const { id } = await params;
  return <PostPage lang={LANG} id={id} />;
}
