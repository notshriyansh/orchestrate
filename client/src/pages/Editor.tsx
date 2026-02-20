import { ReactFlowProvider } from "reactflow";
import FlowEditor from "../modules/editor/FlowEditor";

export default function Editor() {
  return (
    <ReactFlowProvider>
      <FlowEditor />
    </ReactFlowProvider>
  );
}
