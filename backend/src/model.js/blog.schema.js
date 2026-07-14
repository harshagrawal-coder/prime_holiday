import mongoose from "mongoose";
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
      minlength: [5, "Blog title must be at least 5 characters"],
      maxlength: [200, "Blog title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    excerpt: {
      type: String,
      required: [true, "Blog excerpt is required"],
      trim: true,
      maxlength: [500, "Blog excerpt cannot exceed 500 characters"],
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    coverImage: {
      url: {
        type: String,
        required: [true, "Cover image URL is required"],
        trim: true,
      },
      fileId: {
        type: String,
        required: [true, "Cover image file ID is required"],
        trim: true,
      },
      alt: {
        type: String,
        required: [true, "Cover image alt text is required"],
        trim: true,
      },
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: [true, "Blog category is required"],
      index: true,
    },
    categoryName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    authorName: {
      type: String,
      default: "Prime Holiday Editorial",
      trim: true,
    },
    readingTime: {
      type: Number,
      required: [true, "Reading time is required"],
      min: [1, "Reading time must be at least 1 minute"],
    },
    keyHighlights: [
      {
        type: String,
        trim: true,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    popular: {
      type: Boolean,
      default: false,
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["draft", "published"],
        message: "Status must be either draft or published",
      },
      default: "draft",
      index: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);
blogSchema.index({
  title: "text",
  excerpt: "text",
  content: "text",
  categoryName: "text",
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
