import MealPlan from "../models/MealPlan.js";

export const createOrUpdateMealPlan = async (req, res) => {
  try {
    const { weekStartDate, meals } = req.body;

    let plan = await MealPlan.findOne({ userId: req.user.id, weekStartDate });

    if (plan) {
      plan.meals = meals;
      await plan.save();
    } else {
      plan = await MealPlan.create({
        userId: req.user.id,
        weekStartDate,
        meals
      });
    }

    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMealPlan = async (req, res) => {
  try {
    const plan = await MealPlan.findOne({ userId: req.user.id })
      .populate("meals.monday meals.tuesday meals.wednesday meals.thursday meals.friday meals.saturday meals.sunday");

    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
