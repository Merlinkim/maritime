import Link from "next/link";
import type React from "react";

function inlineText(text: string) {
  const parts = text.split(/(\[\[[^\]]+\]\]|\*\*[^*]+\*\*|`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith("[[") && part.endsWith("]]")) {
      const label = part.slice(2, -2).split("|").pop()?.replace(/#.+$/, "") ?? "";
      return (
        <span className="wiki-link" key={`${part}-${index}`}>
          {label}
        </span>
      );
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={`${part}-${index}`}>{part.slice(1, -1)}</code>;
    }

    return part;
  });
}

function tableBlock(lines: string[], key: number) {
  const rows = lines
    .filter((line) => !/^\s*\|?\s*:?-{3,}:?\s*\|/.test(line))
    .map((line) =>
      line
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cell.trim()),
    );

  const [head, ...body] = rows;

  return (
    <div className="table-wrap" key={key}>
      <table>
        <thead>
          <tr>{head?.map((cell, index) => <th key={index}>{inlineText(cell)}</th>)}</tr>
        </thead>
        <tbody>
          {body.map((row, rowIndex) => (
            <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{inlineText(cell)}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MarkdownView({ body }: { body: string }) {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let tableLines: string[] = [];
  let listLines: string[] = [];

  function flushTable() {
    if (tableLines.length) {
      blocks.push(tableBlock(tableLines, blocks.length));
      tableLines = [];
    }
  }

  function flushList() {
    if (listLines.length) {
      blocks.push(
        <ul key={blocks.length}>
          {listLines.map((line, index) => (
            <li key={index}>{inlineText(line.replace(/^\s*[-*]\s+/, ""))}</li>
          ))}
        </ul>,
      );
      listLines = [];
    }
  }

  for (const line of lines) {
    if (/^\s*\|.+\|\s*$/.test(line)) {
      flushList();
      tableLines.push(line);
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      flushTable();
      listLines.push(line);
      continue;
    }

    flushTable();
    flushList();

    if (!line.trim()) continue;

    if (line.startsWith("# ")) blocks.push(<h1 key={blocks.length}>{inlineText(line.slice(2))}</h1>);
    else if (line.startsWith("## ")) blocks.push(<h2 key={blocks.length}>{inlineText(line.slice(3))}</h2>);
    else if (line.startsWith("### ")) blocks.push(<h3 key={blocks.length}>{inlineText(line.slice(4))}</h3>);
    else if (line.startsWith("> ")) blocks.push(<blockquote key={blocks.length}>{inlineText(line.slice(2))}</blockquote>);
    else if (/^!\[[^\]]*\]\(([^)]+)\)/.test(line)) {
      const src = line.match(/^!\[[^\]]*\]\(([^)]+)\)/)?.[1] ?? "";
      blocks.push(<div className="image-placeholder" key={blocks.length}>{src}</div>);
    } else blocks.push(<p key={blocks.length}>{inlineText(line)}</p>);
  }

  flushTable();
  flushList();

  return <article className="markdown-view">{blocks}</article>;
}

export function NoteLink({ slug, children }: { slug: string[]; children: React.ReactNode }) {
  return <Link href={`/notes/${slug.join("/")}`}>{children}</Link>;
}
