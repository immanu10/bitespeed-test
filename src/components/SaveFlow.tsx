import { useContext } from "react";
import { AppContext, AppContextType } from "../AppContext";
import toast from "react-hot-toast";

export function SaveFlow() {
  const { nodes, edges } = useContext(AppContext) as AppContextType;

  const handleSave = () => {
    // Get all node with no outgoing edges (target handles)
    const nodesWithNoEdges = nodes.filter((node) => {
      const nodeEdges = edges.filter((edge) => edge.source === node.id);
      return nodeEdges.length === 0;
    });

    if (nodesWithNoEdges.length > 1) {
      toast.error("Cannot save flow. More than one node has no outgoing edges");
      return;
    }
    console.log(nodesWithNoEdges);
    // Save to Database or local storage here.
    // show saved success message
    toast.success("Saved!");
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
