import mongoose from "mongoose";
const gallerySchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "Gallery image URL is required"],
      trim: true,
    },

    fileId: {
      type: String,
      required: [true, "Image file ID is required"],
      trim: true,
    },
    alt: {
      type: String,
      required: [true, "Image alt text is required"],
      trim: true,
      maxlength: [
        150,
        "Alt text cannot exceed 150 characters",
      ],
    },
    moodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mood",
      required: [
        true,
        "Gallery mood is required",
      ],
    },

    moodName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    order: {
      type: Number,
      default: 0,
      min: [
        0,
        "Order cannot be negative",
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const Gallery = mongoose.model(
  "Gallery",
  gallerySchema
);
export default Gallery;