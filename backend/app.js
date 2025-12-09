import express from "express";
import cors from "cors";
import documentRoutes from "./routes/documents.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/documents", documentRoutes);

export default app;
