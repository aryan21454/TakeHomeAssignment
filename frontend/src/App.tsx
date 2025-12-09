import { useState, useEffect } from "react";
import {
  uploadFile,
  fetchFiles,
  deleteFile,
  downloadFile,
  type DocumentItem,
} from "./Api/api";

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const data = await fetchFiles();
      setDocs(data);
    } catch (err) {
      alert("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Choose a file first!");
    if (file.type !== "application/pdf") return alert("Only PDFs allowed!");

    try {
      await uploadFile(file);
      setFile(null);
      loadDocuments();
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div
      style={{
        padding: 30,
        maxWidth: 700,
        margin: "auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>📄 Medical Document Portal</h1>

      {/* Upload Box */}
      <div
        style={{
          padding: 20,
          border: "2px dashed #666",
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={handleUpload}
          style={{
            marginLeft: 10,
            padding: "5px 15px",
            cursor: "pointer",
          }}
        >
          Upload
        </button>
      </div>

      {/* Loading */}
      {loading && <p>Loading documents...</p>}

      {/* Document List */}
      <h2>Your Documents</h2>
      {docs.length === 0 && !loading && <p>No documents uploaded yet.</p>}

      {docs.map((doc) => (
        <div
          key={doc.id}
          style={{
            padding: 10,
            border: "1px solid #ddd",
            marginBottom: 10,
            borderRadius: 8,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <strong>{doc.filename}</strong>
            <br />
            <small>Size: {(doc.filesize / 1024).toFixed(1)} KB</small>
            <br />
            <small>Uploaded: {new Date(doc.created_at).toLocaleString()}</small>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => downloadFile(doc.id)}>Download</button>
            <button
              style={{ background: "red", color: "white" }}
              onClick={async () => {
                await deleteFile(doc.id);
                loadDocuments();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
