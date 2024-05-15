import { useDrag } from "react-dnd";
import { MyAppNode, NodeTypes, TextNode } from "./nodes/nodes.type";
import { cn } from "../lib/utils";
import { useContext } from "react";
import { AppContext, AppContextType } from "../AppContext";

export function Sidebar() {
  const { nodes } = useContext(AppContext) as AppContextType;

  const selectedNodes = nodes.filter((node) => node.selected) as MyAppNode[];

  return (
    <aside className="col-span-2 w-full border-l">
      {selectedNodes.length === 0 ? (
        <NodesPanel />
      ) : (
        <SettingsPanel nodes={selectedNodes} />
      )}
    </aside>
  );
}

function NodesPanel() {
  return (
    <>
      <h2 className="text-md font-medium">Available Nodes</h2>
      <div className="mt-4">
        <NodeRenderer type={NodeTypes.Text} label="Message" />
      </div>
    </>
  );
}
function SettingsPanel({ nodes }: { nodes: MyAppNode[] }) {
  const renderTextNodeInputs = (textNodes: TextNode[]) => (
    <div>
      <div className="border-l-4 border-blue-700 bg-slate-100 pl-2 py-1">
        <h2 className="text-md font-medium">Message Node</h2>
      </div>
      <div className="px-4 mt-2 space-y-2">
        {textNodes.map((node) => (
          <TextNodeEditor key={node.id} {...(node as TextNode)} />
        ))}
      </div>
    </div>
  );

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
    <div>
      <div>
        {/* back icon */}
        <span>Back</span>
      </div>
      <div className="mt-4">
        {groupNodeByType[NodeTypes.Text] &&
          renderTextNodeInputs(groupNodeByType[NodeTypes.Text])}
        {/* Add other type of Node editor */}
      </div>
    </div>
  );
}

function TextNodeEditor({ id, data }: TextNode) {
  const { changeNodeData } = useContext(AppContext) as AppContextType;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    changeNodeData(id, {
      text: e.target.value,
    });
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={`text-${id}`} className="text-gray-500">
        {`Text`}
      </label>
      <textarea
        name="text"
        id={`text-${id}`}
        value={data.text}
        onChange={handleChange}
        className="rounded border p-2"
      ></textarea>
    </div>
  );
}

function NodeRenderer({ type, label }: { type: NodeTypes; label: string }) {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "node",
      item: { type, label },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  return (
    <div
      ref={dragRef}
      className={cn(
        "p-6 border border-blue-700 rounded-md cursor-grab bg-white overflow-hidden flex flex-col items-center justify-center",
        {
          "opacity-30": isDragging,
          "cursor-grabbing": isDragging,
        }
      )}
    >
      {/* ICON for the NODE */}
      <div className="text-blue-700">{label}</div>
    </div>
  );
}
