import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

interface Props {
  title: string;
}

export default function DashboardHeader({ title }: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30,
      }}
    >
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "white" }}>
          {title}
        </h1>
      </div>

      <Link to="/editor/new">
        <Button size="md">+ New Workflow</Button>
      </Link>
    </div>
  );
}
