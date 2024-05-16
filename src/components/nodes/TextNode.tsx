import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import { TextNodeData } from "./nodes.type";
import { cn } from "../../lib/utils";
import { BsChatText, BsWhatsapp } from "react-icons/bs";
export function TextNode(props: NodeProps<TextNodeData>) {
  const { data, selected } = props;

  return (
    <>
      <div
        className={cn("min-w-52 bg-white shadow-2xl border rounded-lg", {
          "border-blue-700": selected,
        })}
      >
        <div className="flex items-center bg-teal-200 px-2 py-1 rounded-t-lg text-xs">
          <BsChatText />
          <span className="ml-1">Send Message</span>
          <BsWhatsapp className="ml-auto" />
        </div>
        <div className="bg-white text-xs p-2 rounded-b-lg">{data?.text}</div>
      </div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </>
  );
}
