import fs from "node:fs";
import path from "node:path";

const bundledContentRoot = path.join(process.cwd(), "content", "Maritime Knowledge");
const externalVaultRoot = path.resolve(process.cwd(), "..");
const externalContentRoot = path.join(externalVaultRoot, "Maritime Knowledge");
const contentRoot = fs.existsSync(bundledContentRoot) ? bundledContentRoot : externalContentRoot;

export type KnowledgeNode = {
  id: string;
  title: string;
  path: string;
  slug: string[];
  type: "folder" | "note";
  depth: number;
  parentId?: string;
  category: string;
  body?: string;
};

export type KnowledgeLink = {
  source: string;
  target: string;
  kind: "tree" | "wiki";
};

export type KnowledgeGraph = {
  nodes: KnowledgeNode[];
  links: KnowledgeLink[];
  tree: KnowledgeNode[];
};

function cleanTitle(name: string) {
  return name
    .replace(/\.md$/i, "")
    .replace(/^\d+\.\s*/, "")
    .trim();
}

function toSlug(relativePath: string) {
  return relativePath
    .replace(/\.md$/i, "")
    .split(path.sep)
    .map((part) =>
      part
        .replace(/^\d+\.\s*/, "")
        .toLowerCase()
        .replace(/[^\p{L}\p{N}.]+/gu, "-")
        .replace(/-{2,}/g, "-")
        .replace(/^-|-$/g, ""),
    );
}

function categoryFromPath(relativePath: string) {
  if (relativePath === "Maritime Knowledge.md") return "root";
  if (relativePath.startsWith(`DP${path.sep}`) || relativePath === "DP.md") return "dp";
  if (relativePath.includes(`${path.sep}SOLAS${path.sep}`)) return "solas";
  if (relativePath.includes(`${path.sep}MARPOL${path.sep}`)) return "marpol";
  if (relativePath.includes(`${path.sep}COLREG${path.sep}`)) return "colreg";
  if (relativePath.includes(`Ship Theory${path.sep}`)) return "ship";
  if (relativePath.includes("FMEA")) return "fmea";
  if (relativePath.includes("MSC.1-Circ.1580")) return "circ";
  return "general";
}

function walkDirectory(dir: string, parentId?: string, nodes: KnowledgeNode[] = [], links: KnowledgeLink[] = []) {
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => !entry.name.startsWith(".") && entry.name !== "Assets")
    .sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }));

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);
    const relativePath = path.relative(contentRoot, absolutePath);
    const id = relativePath;
    const depth = relativePath.split(path.sep).length - 1;

    if (entry.isDirectory()) {
      const node: KnowledgeNode = {
        id,
        title: cleanTitle(entry.name),
        path: relativePath,
        slug: toSlug(relativePath),
        type: "folder",
        depth,
        parentId,
        category: categoryFromPath(relativePath),
      };
      nodes.push(node);
      if (parentId) links.push({ source: parentId, target: id, kind: "tree" });
      walkDirectory(absolutePath, id, nodes, links);
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      const body = fs.readFileSync(absolutePath, "utf8");
      const node: KnowledgeNode = {
        id,
        title: cleanTitle(entry.name),
        path: relativePath,
        slug: toSlug(relativePath),
        type: "note",
        depth,
        parentId,
        category: categoryFromPath(relativePath),
        body,
      };
      nodes.push(node);
      if (parentId) links.push({ source: parentId, target: id, kind: "tree" });
    }
  }

  return { nodes, links };
}

export function getKnowledgeGraph(): KnowledgeGraph {
  const rootBody = fs.readFileSync(path.join(contentRoot, "Maritime Knowledge.md"), "utf8");
  const rootNode: KnowledgeNode = {
    id: "Maritime Knowledge.md",
    title: "Maritime Knowledge",
    path: "Maritime Knowledge.md",
    slug: ["maritime-knowledge"],
    type: "note",
    depth: 0,
    category: "root",
    body: rootBody,
  };

  const graph = walkDirectory(contentRoot, rootNode.id);
  const nodes = [rootNode, ...graph.nodes.filter((node) => node.id !== rootNode.id)];
  const links = [...graph.links.filter((link) => link.target !== rootNode.id)];
  const byTitle = new Map(nodes.map((node) => [node.title.toLowerCase(), node.id]));

  for (const node of nodes) {
    if (!node.body) continue;
    for (const match of node.body.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g)) {
      const targetTitle = cleanTitle(match[1]);
      const target = byTitle.get(targetTitle.toLowerCase());
      if (target && target !== node.id) links.push({ source: node.id, target, kind: "wiki" });
    }
  }

  return { nodes, links, tree: nodes };
}

export function getNoteBySlug(slug: string[]) {
  return getKnowledgeGraph().nodes.find(
    (node) => node.type === "note" && node.slug.join("/") === slug.map(decodeURIComponent).join("/"),
  );
}

export function getAllNotes() {
  return getKnowledgeGraph().nodes.filter((node) => node.type === "note");
}
