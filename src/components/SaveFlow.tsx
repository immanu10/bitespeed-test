import { useContext } from "react";
import { AppContext, AppContextType } from "../AppContext";

export function SaveFlow() {
  const { nodes, edges } = useContext(AppContext) as AppContextType;

  const handleSave = () => {
    const nodesWithNoEdges = nodes.filter((node) => {
      const nodeEdges = edges.filter((edge) => edge.source === node.id);
      return nodeEdges.length === 0;
    });
    console.log(nodesWithNoEdges);

    if (nodesWithNoEdges.length > 1) {
      alert("cannot save the flow");
      return;
    }
    // Save to Database or local storage here.
    // show saved success message
  };
  return (
    <button
      className="border border-blue-600 bg-white text-blue-700 rounded-md px-4 py-0.5"
      onClick={handleSave}
    >
      Save
    </button>
  );
}
