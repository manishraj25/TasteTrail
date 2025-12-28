import mongoose from "mongoose";

const recipeCollectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    name: {
      type: String,
      required: true // "Quick Dinners"
    },

    recipeIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("RecipeCollection", recipeCollectionSchema);
