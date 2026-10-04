"use client";

import Link from "next/link";
import { useState } from "react";
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
  const notes = graph.nodes.filter((node) => node.type === "note");
  const filtered = graph.nodes.filter((node) => node.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="home-shell">
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
        <p className="resume-kicker">Maritime · Dynamic Positioning · Knowledge Work</p>
        <h1>Maritime DP Knowledge Portfolio</h1>
        <p className="resume-lede">
          A resume-style study portfolio showing how I organize maritime knowledge while building
          practical frontend tools. The project documents my learning path across DP systems, FMEA,
          IMO MSC.1/Circ.1580, SOLAS, MARPOL, COLREG, and ship theory.
        </p>
        <div className="resume-actions">
          <button type="button" onClick={() => setMenuOpen(true)}>
            Browse knowledge base
          </button>
          <Link href="/notes/dp/dp-overview/what-is-dp">Start with DP</Link>
        </div>
        <dl className="resume-stats">
          <div>
            <dt>{notes.length}</dt>
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

      <section className="resume-panel" aria-label="Portfolio highlights">
        <div className="resume-card">
          <p>Current Focus</p>
          <h2>DP Systems and Offshore Operations</h2>
          <span>Power · Thrusters · DP Control · PRS · Sensors · HMI</span>
        </div>
        <div className="resume-card">
          <p>Evidence of Study</p>
          <h2>{notes.length} structured notes</h2>
          <span>Built from an Obsidian vault and rendered as a Next.js knowledge site.</span>
        </div>
        <div className="resume-card">
          <p>Technical Stack</p>
          <h2>Next.js · TypeScript · Markdown</h2>
          <span>Static generated pages, custom note indexer, searchable navigation.</span>
        </div>
        <div className="resume-card muted">
          <p>Navigation</p>
          <h2>Knowledge base</h2>
          <button type="button" onClick={() => setMenuOpen(true)}>
            Open table of contents
          </button>
        </div>
      </section>

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
