import "reactflow/dist/style.css";

import { Sidebar } from "./components/Sidebar";
import { FlowArea } from "./components/FlowArea";
import { AppProvider } from "./AppContext";

export default function App() {
  return (
    <AppProvider>
      <div className="w-full h-full">
        <div className="w-full h-full grid grid-cols-6 bg-white">
          <FlowArea />
          <Sidebar />
        </div>
      </div>
    </AppProvider>
  );
}
