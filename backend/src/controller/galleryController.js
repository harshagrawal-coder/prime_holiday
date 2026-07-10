import Gallery from "../model.js/gallerySchema.js";
import Mood from "../model.js/mood.schema.js";
import { uploadFile, deleteFile } from "../services/imagekit.js";
export async function createGallery(req, res) {
  let uploadedFileId = null;
  try {
    const { moodId, alt, order } = req.body;
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Gallery image is required",
      });
    }
    const mood = await Mood.findById(moodId);
    if (!mood) {
      return res.status(404).json({
        success: false,
        message: "Mood not found",
      });
    }
    const imageAlt = req.file.originalname
      .replace(/\.[^/.]+$/, "")
      .replace(/[-_]/g, " ");
    const uploadedImage = await uploadFile({
      file: req.file.buffer,
      fileName: imageAlt,
      folder: "/gallery",
    });
    uploadedFileId = uploadedImage.fileId;
    const gallery = await Gallery.create({
      url: uploadedImage.url,
      fileId: uploadedImage.fileId,
      alt: req.file.originalname,
      moodId: mood._id,
      moodName: mood.name,
      order: Number(order) || 0,
    });

    return res.status(201).json({
      success: true,
      message: "Gallery image uploaded successfully",
      data: gallery,
    });
  } catch (error) {
    if (uploadedFileId) {
      try {
        await deleteFile(uploadedFileId);
      } catch (deleteError) {
        console.error("Gallery image rollback failed:", deleteError.message);
      }
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getGallery(req, res) {
  try {
    const {
      moodId,
      search,
      sort = "orderAsc",
      page = 1,
      limit = 12,
    } = req.query;

    // ==================================
    // Build Query
    // ==================================

    // Public users can only see active images
    const query = {
      isActive: true,
    };

    // Filter by mood
    if (moodId) {
      query.moodId = moodId;
    }

    // Search
    if (search?.trim()) {
      const searchValue = search.trim();

      query.$or = [
        {
          alt: {
            $regex: searchValue,
            $options: "i",
          },
        },
        {
          moodName: {
            $regex: searchValue,
            $options: "i",
          },
        },
      ];
    }

    // ==================================
    // Sorting
    // ==================================

    const sortOptions = {
      orderAsc: {
        order: 1,
        createdAt: -1,
      },

      orderDesc: {
        order: -1,
        createdAt: -1,
      },

      newest: {
        createdAt: -1,
      },

      oldest: {
        createdAt: 1,
      },
    };

    const sortQuery = sortOptions[sort] || sortOptions.orderAsc;

    // ==================================
    // Pagination
    // ==================================

    const currentPage = Math.max(Number(page) || 1, 1);

    const pageLimit = Math.min(Math.max(Number(limit) || 12, 1), 100);

    const skip = (currentPage - 1) * pageLimit;

    // ==================================
    // Get Gallery Images
    // ==================================

    const totalImages = await Gallery.countDocuments(query);

    const totalPages = Math.ceil(totalImages / pageLimit);

    const gallery = await Gallery.find(query)
      .populate("moodId", "name slug")
      .sort(sortQuery)
      .skip(skip)
      .limit(pageLimit)
      .lean();

    // ==================================
    // Response
    // ==================================

    return res.status(200).json({
      success: true,

      message: "Gallery images fetched successfully",

      count: gallery.length,

      pagination: {
        totalImages,
        totalPages,
        currentPage,
        limit: pageLimit,

        hasNextPage: currentPage < totalPages,

        hasPreviousPage: currentPage > 1,
      },

      data: gallery,
    });
  } catch (error) {
    console.error("Get gallery error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function getAdminGallery(req, res) {
  try {
    const {
      moodId,
      search,
      isActive,
      sort = "orderAsc",
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    // ==================================
    // Active / Inactive Filter
    // ==================================

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    // Mood filter
    if (moodId) {
      query.moodId = moodId;
    }

    // Search
    if (search?.trim()) {
      const searchValue = search.trim();

      query.$or = [
        {
          alt: {
            $regex: searchValue,
            $options: "i",
          },
        },

        {
          moodName: {
            $regex: searchValue,
            $options: "i",
          },
        },
      ];
    }

    // ==================================
    // Sorting
    // ==================================

    const sortOptions = {
      orderAsc: {
        order: 1,
        createdAt: -1,
      },

      orderDesc: {
        order: -1,
        createdAt: -1,
      },

      newest: {
        createdAt: -1,
      },

      oldest: {
        createdAt: 1,
      },
    };

    const sortQuery = sortOptions[sort] || sortOptions.orderAsc;

    // ==================================
    // Pagination
    // ==================================

    const currentPage = Math.max(Number(page) || 1, 1);

    const pageLimit = Math.min(Math.max(Number(limit) || 20, 1), 100);

    const skip = (currentPage - 1) * pageLimit;

    // ==================================
    // Database Queries
    // ==================================

    const totalImages = await Gallery.countDocuments(query);

    const totalPages = Math.ceil(totalImages / pageLimit);

    const gallery = await Gallery.find(query)
      .populate("moodId", "name slug")
      .sort(sortQuery)
      .skip(skip)
      .limit(pageLimit)
      .lean();

    return res.status(200).json({
      success: true,

      message: "Admin gallery fetched successfully",

      count: gallery.length,

      pagination: {
        totalImages,
        totalPages,
        currentPage,
        limit: pageLimit,

        hasNextPage: currentPage < totalPages,

        hasPreviousPage: currentPage > 1,
      },

      data: gallery,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function getGalleryById(req, res) {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id)
      .populate("moodId", "name slug")
      .lean();

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Gallery image fetched successfully",
      data: gallery,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function updateGallery(req, res) {
  let newUploadedFileId = null;
  let oldFileId = null;

  try {
    const { id } = req.params;

    const { moodId, order, isActive } = req.body;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    // Update mood
    if (moodId) {
      const mood = await Mood.findById(moodId);

      if (!mood) {
        return res.status(404).json({
          success: false,
          message: "Mood not found",
        });
      }

      gallery.moodId = mood._id;
      gallery.moodName = mood.name;
    }

    // Upload new image
    if (req.file) {
      const uploadedImage = await uploadFile({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: "/gallery",
      });

      newUploadedFileId = uploadedImage.fileId;

      oldFileId = gallery.fileId;

      gallery.url = uploadedImage.url;

      gallery.fileId = uploadedImage.fileId;

      gallery.alt = req.file.originalname
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ");
    }

    // Update order
    if (order !== undefined) {
      gallery.order = Number(order);
    }

    // Update status
    if (isActive !== undefined) {
      gallery.isActive = isActive === true || isActive === "true";
    }

    // Save all changes once
    await gallery.save();

    // MongoDB saved successfully,
    // now delete old image
    if (oldFileId) {
      try {
        await deleteFile(oldFileId);
      } catch (deleteError) {
        console.error("Old image deletion failed:", deleteError.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Gallery updated successfully",
      data: gallery,
    });
  } catch (error) {
    // Remove newly uploaded image
    // if MongoDB update failed
    if (newUploadedFileId) {
      try {
        await deleteFile(newUploadedFileId);
      } catch (deleteError) {
        console.error("Rollback failed:", deleteError.message);
      }
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function deleteGallery(req, res) {
  try {
    const { id } = req.params;

    // Find gallery first
    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    // Delete image from ImageKit
    if (gallery.fileId) {
      await deleteFile(gallery.fileId);
    }

    // Delete gallery from MongoDB
    await Gallery.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Gallery image deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
