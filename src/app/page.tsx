import { ConstellationHome } from "@/components/constellation-home";
import { getKnowledgeGraph } from "@/lib/knowledge";

export default function Home() {
  return <ConstellationHome graph={getKnowledgeGraph()} />;
}
