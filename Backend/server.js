import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import mealPlanRoutes from "./routes/mealPlanRoutes.js";
import shoppingListRoutes from "./routes/shoppingListRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import recipeCollectionRoutes from "./routes/recipeCollectionRoutes.js";

dotenv.config();

const app = express();

/* -------------------- Middleware -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- Database Connection -------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

/* -------------------- API Routes -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/mealplans", mealPlanRoutes);
app.use("/api/shopping-list", shoppingListRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/collections", recipeCollectionRoutes);

/* -------------------- Health Check -------------------- */
app.get("/", (req, res) => {
  res.json({ message: "TasteTrail API is running 🚀" });
});

/* -------------------- Error Handling -------------------- */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong",
    error: err.message
  });
});

/* -------------------- Server Start -------------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
