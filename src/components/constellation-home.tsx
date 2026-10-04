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
          Kim Inseong
        </Link>
        <div className="mode-chip">Deck Officer Portfolio</div>
      </header>

      <section className="resume-hero" aria-label="Resume introduction">
        <p className="resume-kicker">Deck Officer · Chemical Tanker · DP Study</p>
        <h1>Kim Inseong</h1>
        <p className="resume-lede">
          A Korean deck officer with seagoing experience across chemical tankers, oil/chemical
          tankers, passenger vessels, and general cargo vessels. This site introduces my maritime
          background and shows the knowledge base I am building for DP, FMEA, IMO guidance, SOLAS,
          MARPOL, COLREG, and ship theory.
        </p>
        <div className="resume-actions">
          <button type="button" onClick={() => setMenuOpen(true)}>
            View study archive
          </button>
          <Link href="/notes/dp/dp-overview/what-is-dp">DP study notes</Link>
        </div>
        <dl className="resume-stats">
          <div>
            <dt>7Y 9M</dt>
            <dd>Certified sea service</dd>
          </div>
          <div>
            <dt>2/O</dt>
            <dd>Second Officer experience</dd>
          </div>
          <div>
            <dt>{notes.length}</dt>
            <dd>Structured maritime notes</dd>
          </div>
        </dl>
      </section>

      <section className="resume-panel" aria-label="Portfolio highlights">
        <div className="resume-card">
          <p>Professional Background</p>
          <h2>Merchant deck officer</h2>
          <span>
            Graduated from Incheon Maritime High School, Navigation Department. Built practical
            watchkeeping and cargo-operation experience through cadet, third officer, and second
            officer roles.
          </span>
        </div>
        <div className="resume-card">
          <p>Sea Service</p>
          <h2>Chemical tanker and cargo vessel experience</h2>
          <span>
            Experience includes chemical tankers with KTM Shipping and multiple coastal/general
            cargo vessel assignments, with official sea service totaling 7 years 9 months 25 days.
          </span>
        </div>
        <div className="resume-card">
          <p>License and Training</p>
          <h2>2nd Mate license track with DP study</h2>
          <span>
            Holds maritime radio and safety training records, ECDIS Basic, leadership and
            management training, and DP Induction study toward offshore/DP career development.
          </span>
        </div>
        <div className="resume-card muted">
          <p>Knowledge Base</p>
          <h2>DP, FMEA and maritime regulations</h2>
          <button type="button" onClick={() => setMenuOpen(true)}>
            Open study archive
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
