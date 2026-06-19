import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    region: {
      type: String,
      enum: ["North", "South", "East", "West", "NorthEast", "Central"],
      required: true,
    },

    mood: {
      type: String,
      enum: ["Mountain", "Beach", "Spiritual", "Heritage", "Adventure"],
      required: true,
    },

    image: {
      url: {
        type: String,
        required: true,
      },
      alt: {
        type: String,
        required: true,
      },
    },

    price: {
      type: Number,
      required: true,
    },

    days: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    bestTimeToVisit: {
      type: String,
      required: true,
      trim: true,
    },

    trending: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

tourSchema.index({
  name: "text",
  city: "text",
  state: "text",
});

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;