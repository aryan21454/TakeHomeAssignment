import { Router } from "express";
import upload from "../middlewares/upload";
import {
  uploadDocument,
  getDocuments,
  downloadDocument,
  deleteDocument,
} from "../controllers/document.controller";

const router = Router();

router.post("/upload", upload.single("file"), uploadDocument);

router.get("/", getDocuments);

router.get("/:id", downloadDocument);

router.delete("/:id", deleteDocument);

export default router;
