import Recipe from "../models/Recipe.js";

export const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create({
      ...req.body,
      image: req.file?.path,
      createdBy: req.user.id
    });

    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const updates = {
      ...req.body
    };

    if (req.file) {
      updates.image = req.file.path;
    }

    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAllRecipes = async (req, res) => {
  try {
    const filters = req.query;
    const recipes = await Recipe.find(filters);
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
