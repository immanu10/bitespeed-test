import { MyAppNode, NodeTypes } from "../nodes/nodes.type";
import { useContext } from "react";
import { AppContext, AppContextType } from "../../AppContext";
import { NodeEditorRenderer } from "./NodeEditor";
import { NodeRenderer } from "./NodeRenderer";
import { BsChevronLeft } from "react-icons/bs";

export function Sidebar() {
  const { nodes, deSelectAllNodes } = useContext(AppContext) as AppContextType;

  const selectedNodes = nodes.filter((node) => node.selected) as MyAppNode[];

  const handleBackClick = () => {
    deSelectAllNodes();
  };

  return (
    <aside className="col-span-2 w-full border-l">
      {selectedNodes.length === 0 ? (
        <NodesPanel />
      ) : (
        <>
          <div className="border-b px-4 py-2">
            <button className="flex items-center" onClick={handleBackClick}>
              <BsChevronLeft />
              <h2 className="text-md ml-2">Back</h2>
            </button>
          </div>
          <SettingsPanel nodes={selectedNodes} />
        </>
      )}
    </aside>
  );
}

function NodesPanel() {
  return (
    <div>
      <div className="border-b px-4 py-2">
        <h2 className="text-md">Available Nodes</h2>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 px-4">
        <NodeRenderer type={NodeTypes.Text} label="Message" />
      </div>
    </div>
  );
}

function SettingsPanel({ nodes }: { nodes: MyAppNode[] }) {
  // Group different types of nodes array as Object
  const groupNodeByType = nodes.reduce((acc, node) => {
    const nodeType = node.type;
    if (!nodeType) return acc;

    if (!acc[nodeType]) {
      acc[nodeType] = [];
    }
    acc[nodeType].push(node);
    return acc;
  }, {} as Record<NodeTypes, MyAppNode[]>);

  return (
    <div className="mt-4">
      {Object.keys(groupNodeByType).map((key) => {
        const type = key as NodeTypes;
        return <NodeEditorRenderer type={type} nodes={groupNodeByType[type]} />;
      })}
    </div>
  );
}
