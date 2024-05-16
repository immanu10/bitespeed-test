import { useContext } from "react";
import { AppContext, AppContextType } from "../../AppContext";
import { MyAppNode, NodeTypes, TextNode } from "../nodes/nodes.type";

export function NodeEditorRenderer({
  type,
  nodes,
}: {
  type: NodeTypes;
  nodes: MyAppNode[];
}) {
  if (type === NodeTypes.Text) {
    return (
      <div>
        <div className="border-l-4 border-blue-700 bg-slate-100 pl-2 py-1">
          <h2 className="text-md font-medium">Message Node</h2>
        </div>
        <div className="px-4 mt-2 space-y-2">
          {nodes.map((node) => (
            <TextNodeEditor key={node.id} {...(node as TextNode)} />
          ))}
        </div>
      </div>
    );
  }
  return null;
}

export function TextNodeEditor({ id, data }: TextNode) {
  const { changeNodeData } = useContext(AppContext) as AppContextType;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    changeNodeData(id, {
      text: e.target.value,
    });
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={`text-${id}`} className="text-gray-500">
        {`Text`}
      </label>
      <textarea
        name="text"
        id={`text-${id}`}
        value={data.text}
        onChange={handleChange}
        className="rounded border p-2"
      ></textarea>
    </div>
  );
}
