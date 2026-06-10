import express from "express";
import path from "path";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { functions, inngest } from "./config/inngest.js";
import { fileURLToPath } from "url";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import adminRoutes from "./routes/admin.route.js";
import userRoutes from "./routes/user.route.js";
import orderRoutes from "./routes/order.route.js";
import reviewRoutes from "./routes/review.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";

// Add these two lines 👇
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(clerkMiddleware());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

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

const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log("Server is up and running");
  });
};

startServer();
