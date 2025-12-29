import express from "express";
import {
  addReview,
  getRecipeReviews
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addReview);
router.get("/:recipeId", getRecipeReviews);

export default router;
