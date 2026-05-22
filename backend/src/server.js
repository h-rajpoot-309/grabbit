import express from "express";
import path from "path";
import { clerkMiddleware } from "@clerk/express";
import { fileURLToPath } from "url";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

// Add these two lines 👇
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(clerkMiddleware());

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Success" });
});
console.log(process.env.NODE_ENV);
if (ENV.NODE_ENV === "production") {
  const adminDistPath = path.join(__dirname, "../../admin/dist");
  console.log("Looking for admin dist at:", adminDistPath); // 👈 add this

  app.use(express.static(adminDistPath));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(adminDistPath, "index.html"));
  });
}

app.listen(ENV.PORT, () => {
  console.log("Server is up and running");
  connectDB();
});
