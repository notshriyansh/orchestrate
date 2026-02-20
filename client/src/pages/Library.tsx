import { useEffect, useState } from "react";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

export default function Library() {
  const [templates, setTemplates] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/templates").then((res) => {
      setTemplates(res.data);
    });
  }, []);

  const handleOpen = async (template: any) => {
    const res = await api.post("/api/workflows", {
      name: template.name,
      nodes: template.nodes,
      edges: template.edges,
    });

    navigate(`/editor/${res.data.id}`);
  };

  return (
    <div className="min-h-screen bg-background text-white p-10">
      <h1 className="text-3xl font-bold mb-8">Library</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="p-6 rounded-xl border bg-card hover:border-blue-500 transition"
          >
            <h2 className="text-lg font-semibold mb-2">{template.name}</h2>

            <p className="text-sm text-muted-foreground mb-4">
              {template.description}
            </p>

            <Button onClick={() => handleOpen(template)}>Open in Editor</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
