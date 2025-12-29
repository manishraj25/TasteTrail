import express from "express";
import {
  generateShoppingList,
  getShoppingList
} from "../controllers/shoppingListController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:mealPlanId", protect, generateShoppingList);
router.get("/", protect, getShoppingList);

export default router;
