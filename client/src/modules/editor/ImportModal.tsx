import { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function ImportModal({ onClose, onImport }: any) {
  const [file, setFile] = useState<File | null>(null);
  const [previewCount, setPreviewCount] = useState<number | null>(null);

  const handleFile = async (f: File) => {
    setFile(f);
    const text = await f.text();
    const parsed = JSON.parse(text);

    const count = countRequests(parsed);
    setPreviewCount(count);
  };

  const countRequests = (collection: any): number => {
    let count = 0;

    function traverse(items: any[]) {
      items.forEach((item) => {
        if (item.item) traverse(item.item);
        if (item.request) count++;
      });
    }

    traverse(collection.item || []);
    return count;
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Import Postman Collection</h2>

        <div
          className="drop-zone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files[0]);
          }}
        >
          <UploadCloud size={32} />
          <p>Drag & drop JSON file here</p>
        </div>

        {previewCount !== null && <p>{previewCount} requests detected</p>}

        <div className="modal-actions">
          <button onClick={() => onImport(file, "replace")}>Replace</button>
          <button onClick={() => onImport(file, "append")}>Append</button>
        </div>

        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
