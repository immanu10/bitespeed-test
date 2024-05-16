import { useContext } from "react";
import ReactFlow, { Background } from "reactflow";
import { AppContext, AppContextType } from "../AppContext";
import { nodeTypes } from "./nodes";
import { edgeTypes } from "./edges";
import { useDrop } from "react-dnd";
import { NodeTypes } from "./nodes/nodes.type";

export function FlowArea() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onDropNode } =
    useContext(AppContext) as AppContextType;

  const [, dropRef] = useDrop({
    accept: "node",
    drop: (item: { type: NodeTypes; label: string }, monitor) =>
      onDropNode(item, monitor),
  });

  return (
    <ReactFlow
      ref={dropRef}
      className="col-span-4"
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <Background />
    </ReactFlow>
  );
}
