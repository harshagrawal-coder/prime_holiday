import Blog from "../model.js/blog.schema.js";
import { uploadFile, deleteFile } from "../services/imagekit.js";
import BlogCategory from "../model.js/blogCategory.js";
import slugify from "slugify";
export async function createBlog(req, res) {
  let uploadedFileId = null;
  try {
    const {
      title,
      excerpt,
      content,
      categoryId,
      authorName,
      keyHighlights,
      featured,
      popular,
      status,
    } = req.body;
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "blog image is required ",
      });
    }
    const category = await BlogCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "blog category is not found",
      });
    }
    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog is already Exist",
      });
    }
    let parsedKeyHighlights = [];
    if (keyHighlights) {
      try {
        parsedKeyHighlights = JSON.parse(keyHighlights);
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "keyHighlights must be a valid JSON array",
        });
      }
      if (!Array.isArray(parsedKeyHighlights)) {
        return res.status(400).json({
          success: false,
          message: "keyHighlights must be an array",
        });
      }
    }
    const plainText = content.replace(/<[^>]*>/g, " ");
    const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
    // Average reading speed: 200 words/minute
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    const isFeatured = featured === true || featured === "true";
    const isPopular = popular === true || popular === "true";
    const blogStatus = status || "draft";
    if (!["draft", "published"].includes(blogStatus)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either draft or published",
      });
    }
    const imageAlt = req.file.originalname
      .replace(/\.[^/.]+$/, "")
      .replace(/[-_]/g, " ");
    const uploadedImage = await uploadFile({
      file: req.file.buffer,
      fileName: req.file.originalname,
      folder: "/blogs/covers",
    });
    uploadedFileId = uploadedImage.fileId;
    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      coverImage: {
        url: uploadedImage.url,
        fileId: uploadedImage.fileId,
        alt: imageAlt,
      },
      categoryId: category._id,
      categoryName: category.name,
      authorName: authorName || "Prime Holiday Editorial",
      readingTime,
      keyHighlights: parsedKeyHighlights,
      featured: isFeatured,
      popular: isPopular,
      status: blogStatus,
      publishedAt: blogStatus === "published" ? new Date() : null,
    });
    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    if (uploadedFileId) {
      try {
        await deleteFile(uploadedFileId);
      } catch (deleteError) {
        console.error("Blog image rollback failed:", deleteError.message);
      }
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getBlogs(req, res) {
  try {
    const {
      categoryId,
      search,
      featured,
      popular,
      sort = "newest",
      page = 1,
      limit = 10,
    } = req.query;

    // =====================================
    // Public Query
    // =====================================

    const query = {
      isActive: true,
      status: "published",
    };

    // =====================================
    // Category Filter
    // =====================================

    if (categoryId) {
      query.categoryId = categoryId;
    }

    // =====================================
    // Featured Filter
    // =====================================

    if (featured !== undefined) {
      query.featured = featured === "true";
    }

    // =====================================
    // Popular Filter
    // =====================================

    if (popular !== undefined) {
      query.popular = popular === "true";
    }

    // =====================================
    // Search
    // =====================================

    if (search?.trim()) {
      const searchValue = search.trim();

      query.$or = [
        {
          title: {
            $regex: searchValue,
            $options: "i",
          },
        },
        {
          excerpt: {
            $regex: searchValue,
            $options: "i",
          },
        },
        {
          categoryName: {
            $regex: searchValue,
            $options: "i",
          },
        },
      ];
    }

    // =====================================
    // Sorting
    // =====================================

    const sortOptions = {
      newest: {
        publishedAt: -1,
      },

      oldest: {
        publishedAt: 1,
      },

      titleAsc: {
        title: 1,
      },

      titleDesc: {
        title: -1,
      },
    };

    const sortQuery = sortOptions[sort] || sortOptions.newest;

    // =====================================
    // Pagination
    // =====================================

    const currentPage = Math.max(Number(page) || 1, 1);

    const pageLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);

    const skip = (currentPage - 1) * pageLimit;

    // =====================================
    // Database Queries
    // =====================================

    const totalBlogs = await Blog.countDocuments(query);

    const totalPages = Math.ceil(totalBlogs / pageLimit);

    const blogs = await Blog.find(query)
      .select(
        "title slug excerpt coverImage categoryId categoryName authorName readingTime featured popular publishedAt",
      )
      .populate("categoryId", "name slug")
      .sort(sortQuery)
      .skip(skip)
      .limit(pageLimit)
      .lean();

    // =====================================
    // Response
    // =====================================

    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",

      count: blogs.length,

      pagination: {
        totalBlogs,
        totalPages,
        currentPage,
        limit: pageLimit,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },

      data: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function getBlogBySlug(req, res) {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({
      slug,
      isActive: true,
      status: "published",
    })
      .populate("categoryId", "name slug")
      .lean();

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function getAdminBlogs(req, res) {
  try {
    const {
      categoryId,
      search,
      featured,
      popular,
      status,
      isActive,
      sort = "newest",
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Category filter
    if (categoryId) {
      query.categoryId = categoryId;
    }

    // Status filter
    if (status) {
      query.status = status;
    }

    // Active / Inactive filter
    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    // Featured filter
    if (featured !== undefined) {
      query.featured = featured === "true";
    }

    // Popular filter
    if (popular !== undefined) {
      query.popular = popular === "true";
    }

    if (search?.trim()) {
      const searchValue = search.trim();

      query.$or = [
        {
          title: {
            $regex: searchValue,
            $options: "i",
          },
        },
        {
          excerpt: {
            $regex: searchValue,
            $options: "i",
          },
        },
        {
          categoryName: {
            $regex: searchValue,
            $options: "i",
          },
        },
        {
          authorName: {
            $regex: searchValue,
            $options: "i",
          },
        },
      ];
    }

    const sortOptions = {
      newest: {
        createdAt: -1,
      },

      oldest: {
        createdAt: 1,
      },

      recentlyPublished: {
        publishedAt: -1,
      },

      titleAsc: {
        title: 1,
      },

      titleDesc: {
        title: -1,
      },
    };

    const sortQuery = sortOptions[sort] || sortOptions.newest;

    const currentPage = Math.max(Number(page) || 1, 1);

    const pageLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);

    const skip = (currentPage - 1) * pageLimit;

    const totalBlogs = await Blog.countDocuments(query);

    const totalPages = Math.ceil(totalBlogs / pageLimit);
    const blogs = await Blog.find(query)
      .select(
        "title slug excerpt coverImage categoryId categoryName authorName readingTime featured popular status isActive publishedAt createdAt updatedAt",
      )
      .populate("categoryId", "name slug isActive")
      .sort(sortQuery)
      .skip(skip)
      .limit(pageLimit)
      .lean();

    return res.status(200).json({
      success: true,
      message: "Admin blogs fetched successfully",

      count: blogs.length,

      pagination: {
        totalBlogs,
        totalPages,
        currentPage,
        limit: pageLimit,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },

      data: blogs,
    });
  } catch (error) {
    console.error("Get admin blogs error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
