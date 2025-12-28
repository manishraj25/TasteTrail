import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: String,
  quantity: String,
  category: String // veggies, dairy, spices
});

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    ingredients: [ingredientSchema],

    steps: {
      type: [String],
      required: true
    },

    prepTime: {
      type: Number, // minutes
      required: true
    },

    dietType: {
      type: String // vegan, keto, etc.
    },

    cuisine: {
      type: String
    },

    image: {
      type: String // Cloudinary URL
    },

    averageRating: {
      type: Number,
      default: 0
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);
