import "reactflow/dist/style.css";

import { Sidebar } from "./components/sidebar/Sidebar";
import { FlowArea } from "./components/FlowArea";
import { AppProvider } from "./AppContext";
import { SaveFlow } from "./components/SaveFlow";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <AppProvider>
      <Toaster />
      <div className="w-full h-full">
        <div className="w-full h-12 border-b bg-slate-50 px-5 py-2 flex justify-between">
          <h1 className="font-medium">BiteSpeed Frontend Task - Manoj</h1>
          <SaveFlow />
        </div>
        <div className="w-full h-full grid grid-cols-6 bg-white">
          <FlowArea />
          <Sidebar />
        </div>
      </div>
    </AppProvider>
  );
}
