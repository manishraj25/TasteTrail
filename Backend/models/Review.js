import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe"
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },

    comment: {
      type: String
    },

    image: {
      type: String // uploaded dish photo
    }
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
