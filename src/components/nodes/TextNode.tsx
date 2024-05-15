import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import { TextNodeData } from "./nodes.type";
import { cn } from "../../lib/utils";

export function TextNode(props: NodeProps<TextNodeData>) {
  const { data, selected } = props;

  return (
    <>
      <div
        className={cn("min-w-52 bg-white shadow-2xl border rounded-lg", {
          "border-blue-700": selected,
        })}
      >
        <div className="flex bg-green-200 px-2 py-1 rounded-t-lg text-xs">
          Send Message
        </div>
        <div className="bg-white text-xs px-2 py-1 rounded-b-lg">
          {data?.text}
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </>
  );
}
