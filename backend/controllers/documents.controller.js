import * as DocumentService from "../services/documents.service.js";

const sendError = (res, status, message) => {
  return res.status(status).json({ success: false, message });
};

export const uploadDocument = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return sendError(res, 400, "No file uploaded");

    const data = await DocumentService.saveDocument(file);
    return res.status(201).json({ success: true, data });
  } catch (err) {
    console.error("Upload Error:", err);
    return sendError(res, 500, "Failed to upload document");
  }
};

export const getDocuments = async (req, res) => {
  try {
    const docs = await DocumentService.getAllDocuments();
    return res.json({ success: true, data: docs });
  } catch (err) {
    console.error("Get Documents Error:", err);
    return sendError(res, 500, "Failed to fetch documents");
  }
};

export const downloadDocument = async (req, res) => {
  try {
    const id = req.params.id;
    const file = await DocumentService.getDocumentById(id);

    if (!file) return sendError(res, 404, "File not found");

    res.download(file.filepath, file.filename);
  } catch (err) {
    console.error("Download Error:", err);
    return sendError(res, 500, "Failed to download file");
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await DocumentService.deleteDocument(id);

    if (!deleted) return sendError(res, 404, "File not found");

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    return sendError(res, 500, "Failed to delete file");
  }
};
