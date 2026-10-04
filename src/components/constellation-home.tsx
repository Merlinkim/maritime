"use client";

import Link from "next/link";
import type React from "react";
import { useMemo, useState } from "react";
import type { KnowledgeGraph, KnowledgeNode } from "@/lib/knowledge";

const colors: Record<string, string> = {
  root: "#f7f4ea",
  dp: "#6fd7d9",
  solas: "#d99b73",
  marpol: "#8bc59a",
  colreg: "#a99bd6",
  ship: "#d6bd72",
  fmea: "#8aa8d8",
  circ: "#92c8d6",
  general: "#b8bfca",
};

function nodePosition(node: KnowledgeNode, index: number, total: number) {
  if (node.category === "root") return { x: 50, y: 43, size: 8 };

  const categoryOffsets: Record<string, number> = {
    dp: -0.35,
    solas: 0.75,
    marpol: 1.55,
    colreg: 2.35,
    ship: 3.25,
    fmea: 4.05,
    circ: 4.65,
    general: 5.35,
  };
  const base = categoryOffsets[node.category] ?? 0;
  const wobble = (index % 13) * 0.085;
  const angle = base + wobble + (index / Math.max(total, 1)) * 0.42;
  const radius = node.depth < 2 ? 19 + node.depth * 7 : 28 + (index % 7) * 3.4;
  return {
    x: 50 + Math.cos(angle) * radius,
    y: 47 + Math.sin(angle) * radius * 0.68,
    size: node.category === "dp" && node.depth < 2 ? 5 : node.type === "folder" ? 3.7 : 2.4,
  };
}

function childrenOf(nodes: KnowledgeNode[], parentId?: string) {
  return nodes.filter((node) => node.parentId === parentId).sort((a, b) => a.path.localeCompare(b.path, "en", { numeric: true }));
}

function DrawerTree({
  nodes,
  parentId,
  colorsByCategory,
  activeId,
  setActiveId,
  setMenuOpen,
}: {
  nodes: KnowledgeNode[];
  parentId?: string;
  colorsByCategory: Record<string, string>;
  activeId: string;
  setActiveId: (id: string) => void;
  setMenuOpen: (open: boolean) => void;
}) {
  return childrenOf(nodes, parentId).map((node) => {
    const children = childrenOf(nodes, node.id);
    const hasChildren = children.length > 0;
    const href = node.type === "note" ? `/notes/${node.slug.join("/")}` : undefined;
    const label = (
      <>
        <span className="toc-dot" style={{ backgroundColor: colorsByCategory[node.category] }} />
        <span className="toc-title">{node.title}</span>
      </>
    );

    if (!hasChildren) {
      return (
        <Link
          className={activeId === node.id ? "toc-leaf active" : "toc-leaf"}
          href={href ?? "#"}
          key={node.id}
          onClick={(event) => {
            if (!href) event.preventDefault();
            setActiveId(node.id);
            if (href) setMenuOpen(false);
          }}
        >
          {label}
        </Link>
      );
    }

    return (
      <details className="toc-branch" key={node.id} open={node.depth < 1 || node.id.includes("DP")}>
        <summary
          onMouseEnter={() => setActiveId(node.id)}
          onClick={() => setActiveId(node.id)}
        >
          {href ? (
            <Link
              href={href}
              onClick={(event) => {
                event.stopPropagation();
                setActiveId(node.id);
                setMenuOpen(false);
              }}
            >
              {label}
            </Link>
          ) : (
            label
          )}
        </summary>
        <div className="toc-children">
          <DrawerTree
            nodes={nodes}
            parentId={node.id}
            colorsByCategory={colorsByCategory}
            activeId={activeId}
            setActiveId={setActiveId}
            setMenuOpen={setMenuOpen}
          />
        </div>
      </details>
    );
  });
}

export function ConstellationHome({ graph }: { graph: KnowledgeGraph }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("Maritime Knowledge.md");
  const [query, setQuery] = useState("");

  const positioned = useMemo(
    () =>
      graph.nodes.map((node, index) => ({
        ...node,
        ...nodePosition(node, index, graph.nodes.length),
      })),
    [graph.nodes],
  );
  const byId = new Map(positioned.map((node) => [node.id, node]));
  const active = byId.get(activeId) ?? positioned[0];
  const filtered = positioned.filter((node) => node.title.toLowerCase().includes(query.toLowerCase()));
  const connected = new Set(
    graph.links
      .filter((link) => link.source === activeId || link.target === activeId)
      .flatMap((link) => [link.source, link.target]),
  );

  return (
    <main className="home-shell">
      <div className="starfield" />
      <header className="topbar">
        <button className="icon-button" aria-label="Open navigation" onClick={() => setMenuOpen(true)}>
          <span />
          <span />
          <span />
        </button>
        <Link className="brand" href="/">
          Maritime Portfolio
        </Link>
        <div className="mode-chip">DP Knowledge Graph</div>
      </header>

      <section className="resume-hero" aria-label="Resume introduction">
        <p className="resume-kicker">Maritime · Dynamic Positioning · Frontend</p>
        <h1>Maritime DP Knowledge Portfolio</h1>
        <p className="resume-lede">
          A personal maritime knowledge graph built from Obsidian notes and published as a Next.js
          study portfolio. It documents my learning path across DP systems, FMEA, IMO guidance,
          SOLAS, MARPOL, COLREG, and ship theory.
        </p>
        <div className="resume-actions">
          <button type="button" onClick={() => setMenuOpen(true)}>
            Browse knowledge base
          </button>
          <Link href="/notes/dp/dp-overview/what-is-dp">Start with DP</Link>
        </div>
        <dl className="resume-stats">
          <div>
            <dt>{graph.nodes.filter((node) => node.type === "note").length}</dt>
            <dd>Study notes</dd>
          </div>
          <div>
            <dt>DP</dt>
            <dd>FMEA · MSC.1/Circ.1580</dd>
          </div>
          <div>
            <dt>IMO</dt>
            <dd>SOLAS · MARPOL · COLREG</dd>
          </div>
        </dl>
      </section>

      <section className="graph-stage" aria-label="Knowledge constellation">
        <svg className="link-layer" viewBox="0 0 100 100" preserveAspectRatio="none">
          {graph.links.map((link, index) => {
            const source = byId.get(link.source);
            const target = byId.get(link.target);
            if (!source || !target) return null;
            const isLit = activeId === link.source || activeId === link.target;
            return (
              <line
                key={`${link.source}-${link.target}-${index}`}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                className={isLit ? "constellation-line lit" : "constellation-line"}
                style={{ animationDelay: `${(index % 11) * 0.45}s` }}
              />
            );
          })}
        </svg>

        {positioned.map((node) => {
          const lit = node.id === activeId || connected.has(node.id);
          const href = node.type === "note" ? `/notes/${node.slug.join("/")}` : "#";
          return (
            <Link
              href={href}
              key={node.id}
              className={lit ? "star-node lit" : "star-node"}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                "--star-size": `${node.size}px`,
                "--star-color": colors[node.category],
                animationDelay: `${(node.depth * 0.7 + positioned.indexOf(node) * 0.09) % 5}s`,
              } as React.CSSProperties}
              onMouseEnter={() => setActiveId(node.id)}
              onClick={(event) => {
                if (node.type !== "note") event.preventDefault();
                setActiveId(node.id);
              }}
              aria-label={node.title}
            >
              {(node.category === "root" || node.title === "DP") && <span>{node.title}</span>}
            </Link>
          );
        })}
      </section>

      <aside className="info-panel">
        <p className="eyebrow">{active?.type === "folder" ? "Folder" : "Note"}</p>
        <h1>{active?.title}</h1>
        <p>{active?.path}</p>
        {active?.type === "note" && <Link href={`/notes/${active.slug.join("/")}`}>Open page</Link>}
      </aside>

      <nav className={menuOpen ? "side-drawer open" : "side-drawer"} aria-label="Table of contents">
        <button className="close-button" aria-label="Close navigation" onClick={() => setMenuOpen(false)}>
          ×
        </button>
        <h2>목차</h2>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notes" />
        <div className="toc-list">
          {query ? (
            filtered.map((node) => (
              <Link
                className={activeId === node.id ? "toc-leaf active" : "toc-leaf"}
                key={node.id}
                href={node.type === "note" ? `/notes/${node.slug.join("/")}` : "#"}
                onClick={(event) => {
                  if (node.type !== "note") event.preventDefault();
                  setActiveId(node.id);
                  if (node.type === "note") setMenuOpen(false);
                }}
              >
                <span className="toc-dot" style={{ backgroundColor: colors[node.category] }} />
                <span className="toc-title">{node.title}</span>
              </Link>
            ))
          ) : (
            <DrawerTree
              nodes={graph.nodes}
              parentId="Maritime Knowledge.md"
              colorsByCategory={colors}
              activeId={activeId}
              setActiveId={setActiveId}
              setMenuOpen={setMenuOpen}
            />
          )}
        </div>
      </nav>
    </main>
  );
}
