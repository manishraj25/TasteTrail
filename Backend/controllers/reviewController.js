import Review from "../models/Review.js";
import Recipe from "../models/Recipe.js";

export const addReview = async (req, res) => {
  try {
    const { recipeId, rating, comment, image } = req.body;

    const review = await Review.create({
      userId: req.user.id,
      recipeId,
      rating,
      comment,
      image
    });

    const reviews = await Review.find({ recipeId });
    const avg =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Recipe.findByIdAndUpdate(recipeId, { averageRating: avg });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRecipeReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ recipeId: req.params.recipeId })
      .populate("userId", "name");

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
