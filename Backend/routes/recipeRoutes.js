import express from "express";
import {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
} from "../controllers/recipeController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);

// Admin only
router.post("/", protect, adminOnly, createRecipe);
router.put("/:id", protect, adminOnly, updateRecipe);
router.delete("/:id", protect, adminOnly, deleteRecipe);

export default router;
