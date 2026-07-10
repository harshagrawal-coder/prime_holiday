import slugify from "slugify";

import BlogCategory from "../model.js/blogCategory.js";
export async function createBlogCategory(req, res) {
  try {
    const { name } = req.body;

    // Generate slug from name
    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Check duplicate category
    const existingCategory = await BlogCategory.findOne({
      $or: [
        { name: { $regex: `^${name}$`, $options: "i" } },
        { slug },
      ],
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Blog category already exists",
      });
    }
    const category = await BlogCategory.create({
      name,
      slug,
    });
    return res.status(201).json({
      success: true,
      message: "Blog category created successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function getBlogCategories(req, res) {
  try {
    const categories = await BlogCategory.find({
      isActive: true,
    })
      .sort({ name: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: "Blog categories fetched successfully",
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function getAdminBlogCategories(req, res) {
  try {
    const { isActive, search } = req.query;

    const query = {};

    // Active / inactive filter
    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    // Search by category name
    if (search?.trim()) {
      query.name = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    const categories = await BlogCategory.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: "Admin blog categories fetched successfully",
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function getBlogCategoryById(req, res) {
  try {
    const { id } = req.params;

    const category = await BlogCategory.findById(id).lean();

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Blog category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog category fetched successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function updateBlogCategory(req, res) {
  try {
    const { id } = req.params;

    const {
      name,
      isActive,
    } = req.body;

    // Find category
    const category = await BlogCategory.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Blog category not found",
      });
    }
    if (name) {
      const slug = slugify(name, {
        lower: true,
        strict: true,
        trim: true,
      });

      // Check if another category has same slug
      const existingCategory = await BlogCategory.findOne({
        slug,
        _id: {
          $ne: id,
        },
      });

      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: "Blog category already exists",
        });
      }

      category.name = name;
      category.slug = slug;
    }
    if (isActive !== undefined) {
      category.isActive =
        isActive === true || isActive === "true";
    }

    // Save changes
    await category.save();

    return res.status(200).json({
      success: true,
      message: "Blog category updated successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function deleteBlogCategory(req, res) {
  try {
    const { id } = req.params;

    const category = await BlogCategory.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Blog category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}