import { useDrag } from "react-dnd";
import { NodeTypes } from "./nodes/nodes.type";
import { cn } from "../lib/utils";

export function Sidebar() {
  return (
    <aside className="col-span-2 w-full border-l p-3">
      <div className="border-l-4 border-gray-500 pl-2">
        <h2 className="text-md font-medium">Available Nodes</h2>
      </div>
      <div className="mt-4">
        <NodeRenderer type={NodeTypes.Text} label="Message" />
      </div>
    </aside>
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
