import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import { TextNodeData } from "./nodes.type";

export function TextNode(props: NodeProps<TextNodeData>) {
  const { data } = props;

  return (
    <>
      <div className="min-w-52 bg-white shadow-2xl border rounded-lg">
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
