import { useDrag } from "react-dnd";
import { NodeTypes } from "../nodes/nodes.type";
import { cn } from "../../lib/utils";
import { BsChatText } from "react-icons/bs";

export function NodeRenderer({
  type,
  label,
}: {
  type: NodeTypes;
  label: string;
}) {
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
      <BsChatText className="text-blue-700" />
      <div className="text-blue-700 mt-2">{label}</div>
    </div>
  );
}
