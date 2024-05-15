import { ReactNode, createContext, useCallback, useState } from "react";
import {
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import { initialNodes } from "./components/nodes";
import { initialEdges } from "./components/edges";
import { DndProvider, DropTargetMonitor } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { NodeData, NodeTypes } from "./components/nodes/nodes.type";
import { TestNodeData } from "./lib/utils";

export type AppContextType = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onDropNode: (
    item: { type: NodeTypes; label: string },
    monitor: DropTargetMonitor<unknown, unknown>
  ) => void;
  changeNodeData: (id: string, data: NodeData) => void;
};

export const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect: OnConnect = (connection) => {
    const sourceNodeId = connection.source;
    const hasOutgoingEdge = edges.some((element) => {
      return element.source === sourceNodeId && element.target;
    });

    // If the source node already has an outgoing edge, prevent the new connection or show alert messages
    if (hasOutgoingEdge) return;

    setEdges((eds) => addEdge(connection, eds));
  };

  const onDropNode = (
    item: { type: NodeTypes; label: string },
    monitor: DropTargetMonitor<unknown, unknown>
  ) => {
    const { type } = item;
    const offset = monitor.getClientOffset();

    const newNode: Node = {
      id: `${type}-${crypto.randomUUID()}`,
      data: TestNodeData,
      type: type,
      position: {
        x: offset?.x || 500,
        y: offset?.y || 500,
      },
    };
    setNodes([...nodes, newNode]);
  };

  const changeNodeData = (id: string, data: NodeData) => {
    const updatedNode = nodes.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          data: {
            ...node.data,
            ...data,
          },
        };
      }
      return node;
    });
    setNodes(updatedNode);
  };

  return (
    <AppContext.Provider
      value={{
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        onDropNode,
        changeNodeData,
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <ReactFlowProvider>{children}</ReactFlowProvider>
      </DndProvider>
    </AppContext.Provider>
  );
}
