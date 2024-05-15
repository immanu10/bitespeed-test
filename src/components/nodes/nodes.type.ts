import { Node } from "reactflow";

export enum NodeTypes {
  Text = "text",
}

export type TextNodeData = {
  text: string;
};

export type TextNode = Node<TextNodeData, NodeTypes.Text>;
