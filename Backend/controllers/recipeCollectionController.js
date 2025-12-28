import RecipeCollection from "../models/RecipeCollection.js";

export const createCollection = async (req, res) => {
  try {
    const collection = await RecipeCollection.create({
      userId: req.user.id,
      name: req.body.name
    });
    res.status(201).json(collection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addRecipeToCollection = async (req, res) => {
  try {
    const collection = await RecipeCollection.findById(req.params.id);
    collection.recipeIds.push(req.body.recipeId);
    await collection.save();
    res.json(collection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserCollections = async (req, res) => {
  try {
    const collections = await RecipeCollection.find({ userId: req.user.id })
      .populate("recipeIds");

    res.json(collections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
