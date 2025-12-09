import { useState, useEffect } from "react";
import {
  uploadFile,
  fetchFiles,
  deleteFile,
  downloadFile,
  type DocumentItem,
} from "./Api/api";
import "./App.css";

import { toast, ToastContainer } from "react-toastify";

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
      toast.error("❌ Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleUpload = async () => {
    if (!file) return toast.warning("⚠️ Choose a file first!");
    if (file.type !== "application/pdf")
      return toast.error("❌ Only PDFs allowed!");

    try {
      await uploadFile(file);
      setFile(null);
      toast.success("📄 Upload successful!");
      loadDocuments();
    } catch (err) {
      toast.error("❌ Upload failed!");
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={2000} />

      <h1 className="title">📄 Medical Document Portal</h1>

      <div className="layout">
        {/* Upload Panel */}
        <div className="upload-box">
          <h2>Upload Document</h2>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <button onClick={handleUpload} className="upload-btn">
            Upload
          </button>
        </div>

        {/* Document List */}
        <div className="doc-list-box">
          <h2>Your Documents</h2>

          {loading && <p>Loading documents...</p>}
          {!loading && docs.length === 0 && <p>No documents uploaded yet.</p>}

          <div className="doc-list">
            {docs.map((doc) => (
              <div key={doc.id} className="doc-item">
                <div>
                  <strong>{doc.filename}</strong>
                  <br />
                  <small>{(doc.filesize / 1024).toFixed(1)} KB</small>
                  <br />
                  <small>{new Date(doc.created_at).toLocaleString()}</small>
                </div>

                <div className="doc-actions">
                  <button
                    onClick={() => {
                      downloadFile(doc.id);
                      toast.info("⬇️ Download started...");
                    }}
                  >
                    Download
                  </button>

                  <button
                    className="delete-btn"
                    onClick={async () => {
                      try {
                        await deleteFile(doc.id);
                        toast.success("🗑️ Deleted successfully");
                        loadDocuments();
                      } catch (err) {
                        toast.error("❌ Delete failed");
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
