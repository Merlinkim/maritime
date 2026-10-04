import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownView } from "@/components/markdown-view";
import { getAllNotes, getKnowledgeGraph, getNoteBySlug } from "@/lib/knowledge";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  return {
    title: note ? `${note.title} | Maritime Knowledge` : "Maritime Knowledge",
    description: note?.path ?? "Maritime Knowledge note",
  };
}

export default async function NotePage({ params }: PageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note?.body) notFound();

  const graph = getKnowledgeGraph();
  const siblings = graph.nodes.filter((node) => node.parentId === note.parentId && node.type === "note");
  const headings = note.body
    .split("\n")
    .filter((line) => /^#{2,3}\s+/.test(line))
    .map((line) => line.replace(/^#{2,3}\s+/, "").trim())
    .slice(0, 18);

  return (
    <main className="note-shell">
      <aside className="note-nav">
        <Link className="back-link" href="/">
          ← Constellation
        </Link>
        <h2>{note.title}</h2>
        <p>{note.path}</p>
        <div className="sibling-list">
          {siblings.map((item) => (
            <Link className={item.id === note.id ? "active" : ""} href={`/notes/${item.slug.join("/")}`} key={item.id}>
              {item.title}
            </Link>
          ))}
        </div>
      </aside>

      <MarkdownView body={note.body} />

      <aside className="page-toc">
        <h2>On this page</h2>
        {headings.map((heading) => (
          <a href={`#${heading}`} key={heading}>
            {heading}
          </a>
        ))}
      </aside>
    </main>
  );
}
