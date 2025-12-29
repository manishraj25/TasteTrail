import express from "express";
import {
  createCollection,
  addRecipeToCollection,
  getUserCollections
} from "../controllers/recipeCollectionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCollection);
router.post("/:id", protect, addRecipeToCollection);
router.get("/", protect, getUserCollections);

export default router;
