import { TextNode as TextNodeComponent } from "./TextNode";
import { NodeTypes, type TextNode } from "./nodes.type";
import { NodeTypes as ReactFlowNodeTypes } from "reactflow";

export const initialNodes: TextNode[] = [
  {
    id: "a",
    type: NodeTypes.Text,
    position: { x: 100, y: 100 },
    data: { text: "hellooo" },
  },
];

export const nodeTypes: ReactFlowNodeTypes = {
  text: TextNodeComponent,
  // Add any of your custom nodes here!
};
