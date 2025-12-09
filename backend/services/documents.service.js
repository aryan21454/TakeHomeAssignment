import * as DocumentModel from "../models/documents.model.js";
import fs from "fs";

export const saveDocument = async (file) => {
  try {
    if (!file) throw new Error("File not provided");

    const payload = {
      filename: file.filename,
      filepath: file.path,
      filesize: file.size,
    };

    const result = await DocumentModel.insertDocument(payload);
    return result;
  } catch (err) {
    console.error("Service: saveDocument →", err);
    throw new Error("Could not save the document");
  }
};

export const getAllDocuments = async () => {
  try {
    const docs = await DocumentModel.getAll();
    return docs;
  } catch (err) {
    console.error("Service: getAllDocuments →", err);
    throw new Error("Could not fetch documents");
  }
};

export const getDocumentById = async (id) => {
  try {
    if (!id) throw new Error("Document ID missing");

    const file = await DocumentModel.getById(id);
    return file;
  } catch (err) {
    console.error("Service: getDocumentById →", err);
    throw new Error("Could not get document");
  }
};

export const deleteDocument = async (id) => {
  try {
    if (!id) throw new Error("Document ID missing");

    const file = await DocumentModel.getById(id);
    if (!file) return false;
    try {
      fs.unlinkSync(file.filepath);
    } catch (err) {
      console.error("File deletion error →", err);
      throw new Error("Could not delete file from disk");
    }

    // Remove DB record
    await DocumentModel.remove(id);
    return true;

  } catch (err) {
    console.error("Service: deleteDocument →", err);
    throw new Error("Could not delete document");
  }
};
