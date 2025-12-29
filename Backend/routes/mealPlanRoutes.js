import express from "express";
import {
  createOrUpdateMealPlan,
  getMealPlan
} from "../controllers/mealPlanController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrUpdateMealPlan);
router.get("/", protect, getMealPlan);

export default router;
