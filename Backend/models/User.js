import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    dietPreferences: {
      type: [String], // vegan, keto, gluten-free
      default: []
    },

    allergies: {
      type: [String], // nuts, dairy
      default: []
    },

    cuisinePreferences: {
      type: [String], // Indian, Italian
      default: []
    },

    savedRecipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
