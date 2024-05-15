import { Node } from "reactflow";

export enum NodeTypes {
  Text = "text",
}

export type TextNodeData = {
  text: string;
};

export type TextNode = Node<TextNodeData, NodeTypes.Text>;

// Add Other types of Node data
export type NodeData = TextNodeData;

// Add Other types of Node
export type MyAppNode = TextNode;
