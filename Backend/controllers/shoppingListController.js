import ShoppingList from "../models/ShoppingList.js";
import MealPlan from "../models/MealPlan.js";
import Recipe from "../models/Recipe.js";

export const generateShoppingList = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.mealPlanId)
      .populate({
        path: "meals.monday meals.tuesday meals.wednesday meals.thursday meals.friday meals.saturday meals.sunday",
        populate: { path: "ingredients" }
      });

    let items = [];

    Object.values(mealPlan.meals).flat().forEach(recipe => {
      recipe.ingredients.forEach(ing => {
        items.push({
          name: ing.name,
          quantity: ing.quantity,
          category: ing.category
        });
      });
    });

    const list = await ShoppingList.create({
      userId: req.user.id,
      mealPlanId: mealPlan._id,
      items
    });

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getShoppingList = async (req, res) => {
  try {
    const list = await ShoppingList.findOne({ userId: req.user.id });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
