import express from "express";
import {
  addReview,
  getRecipeReviews
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.single("image"),
  addReview
);
router.get("/:recipeId", getRecipeReviews);

export default router;
