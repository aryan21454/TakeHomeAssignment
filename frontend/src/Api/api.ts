import axios from "axios";

const API = "http://localhost:4000";

export interface DocumentItem {
  id: number;
  filename: string;
  filepath: string;
  filesize: number;
  created_at: string;
}

export const uploadFile = async (file: File) => {
  try {
    const form = new FormData();
    form.append("file", file);

    const res = await axios.post(`${API}/documents/upload`, form);
    return res.data;
  } catch (err) {
    console.log("Upload error", err);
    throw new Error("Failed to upload file");
  }
};

export const fetchFiles = async (): Promise<DocumentItem[]> => {
  try {
    const res = await axios.get(`${API}/documents`);
    return res.data.data || res.data; 
  } catch (err) {
    console.log("Fetch error:", err);
    throw new Error("Failed to fetch documents");
  }
};

export const deleteFile = async (id: number) => {
  try {
    const res = await axios.delete(`${API}/documents/${id}`);
    return res.data;
  } catch (err) {
    console.log("Delete error:", err);
    throw new Error("Failed to delete file");
  }
};

export const downloadFile = (id: number) => {
  window.open(`${API}/documents/${id}`, "_blank");
};
