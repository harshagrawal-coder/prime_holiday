import mongoose from "mongoose";

const blogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Blog category name is required"],
      unique: true,
      trim: true,
      maxlength: [
        50,
        "Category name cannot exceed 50 characters",
      ],
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const BlogCategory = mongoose.model(
  "BlogCategory",
  blogCategorySchema,
);

export default BlogCategory;