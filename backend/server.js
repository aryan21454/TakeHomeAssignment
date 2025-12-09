import app from "./app";
import "./config/db";
import fs from "fs";

const PORT = 4000;

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
