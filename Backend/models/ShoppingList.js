import mongoose from "mongoose";

const shoppingItemSchema = new mongoose.Schema({
  name: String,
  quantity: String,
  category: String,
  isChecked: {
    type: Boolean,
    default: false
  }
});

const shoppingListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    mealPlanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MealPlan"
    },

    items: [shoppingItemSchema]
  },
  { timestamps: true }
);

export default mongoose.model("ShoppingList", shoppingListSchema);
