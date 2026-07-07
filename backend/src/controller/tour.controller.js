import Tour from "../model.js/tourSchema.js";
import City from "../model.js/city.schema.js";
import Mood from "../model.js/mood.schema.js";
import Duration from "../model.js/duration.schema.js";
import slugify from "slugify";
import { uploadFile, deleteFile } from "../services/imagekit.js";

export async function createTour(req, res) {
  try {
    const {
      name,
      overview,
      description,
      cityId,
      moodId,
      durationId,
      price,
      discountPrice,
      bestTimeToVisit,
      trending,
      featured,
      isActive,
    } = req.body;
    console.log("REQ FILES:");
    console.log(req.files);

    console.log("REQ BODY:");
    console.log(req.body);
    if (!req.files?.thumbnail?.[0]) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail image is required",
      });
    }
    if (!req.files?.banner?.[0]) {
      return res.status(400).json({
        success: false,
        message: "Banner image is required",
      });
    }
    if (!req.files?.gallery?.length) {
      return res.status(400).json({
        success: false,
        message: "Gallery images are required",
      });
    }
    const inclusions = req.body.inclusions
      ? JSON.parse(req.body.inclusions)
      : [];
    const exclusions = req.body.exclusions
      ? JSON.parse(req.body.exclusions)
      : [];
    const itinerary = req.body.itinerary ? JSON.parse(req.body.itinerary) : [];
    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });
    const existingTour = await Tour.findOne({ slug });
    if (existingTour) {
      return res.status(400).json({
        success: false,
        message: "Tour already exists",
      });
    }
    const city = await City.findById(cityId).populate({
      path: "stateId",
      populate: {
        path: "regionId",
      },
    });
    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found",
      });
    }
    const mood = await Mood.findById(moodId);
    if (!mood) {
      return res.status(404).json({
        success: false,
        message: "Mood not found",
      });
    }
    const duration = await Duration.findById(durationId);
    if (!duration) {
      return res.status(404).json({
        success: false,
        message: "Duration not found",
      });
    }
    const uploadedFileIds = [];
    try {
      const thumbnailUpload = await uploadFile({
        file: req.files.thumbnail[0].buffer,
        fileName: req.files.thumbnail[0].originalname,
        folder: "/tours/thumbnails",
      });
      uploadedFileIds.push(thumbnailUpload.fileId);

      const bannerUpload = await uploadFile({
        file: req.files.banner[0].buffer,
        fileName: req.files.banner[0].originalname,
        folder: "/tours/banners",
      });
      uploadedFileIds.push(bannerUpload.fileId);

      const galleryUploads = await Promise.all(
        req.files.gallery.map(async (image) => {
          const uploaded = await uploadFile({
            file: image.buffer,
            fileName: image.originalname,
            folder: "/tours/gallery",
          });
          uploadedFileIds.push(uploaded.fileId);

          return {
            url: uploaded.url,
            alt: image.originalname,
            fileId: uploaded.fileId,
          };
        }),
      );
      const tour = await Tour.create({
        // Basic Details
        name,
        slug,
        overview,
        description,
        // Region
        regionId: city.stateId.regionId._id,
        regionName: city.stateId.regionId.name,
        // State
        stateId: city.stateId._id,
        stateName: city.stateId.name,
        // City
        cityId: city._id,
        cityName: city.name,
        // Mood
        moodId: mood._id,
        moodName: mood.name,
        // Duration
        durationId: duration._id,
        durationName: duration.name,
        // Price
        price,
        discountPrice,
        // Images
        thumbnail: {
          url: thumbnailUpload.url,
          fileId: thumbnailUpload.fileId,
          alt: name,
        },
        banner: {
          url: bannerUpload.url,
          fileId: bannerUpload.fileId,
          alt: name,
        },
        gallery: galleryUploads,
        // Tour Details
        bestTimeToVisit,
        inclusions,
        exclusions,
        itinerary,
        // Flags
        trending,
        featured,
        isActive,
      });
      return res.status(201).json({
        success: true,
        message: "Tour created successfully",
        data: tour,
      });
    } catch (error) {
      // Rollback uploaded images
      await Promise.all(uploadedFileIds.map((fileId) => deleteFile(fileId)));
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getAllTour(req, res) {
  try {
    const tours = await Tour.find()
      .populate("regionId", "name slug")
      .populate("stateId", "name slug")
      .populate("cityId", "name slug")
      .populate("moodId", "name slug")
      .populate("durationId", "name nights days slug")
      .populate("durationId")
      .sort({ createdAt: -1 })
      .lean();
    return res.status(200).json({
      success: true,
      message: "Tours fetched successfully",
      count: tours.length,
      data: tours,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function getTourById(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Tour ID",
      });
    }

    const tour = await Tour.findById(req.params.id)
      .populate("regionId", "name slug")
      .populate("stateId", "name slug")
      .populate("cityId", "name slug")
      .populate("moodId", "name slug")
      .populate("durationId", "name nights days slug")
      .lean();

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tour fetched successfully",
      data: tour,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function updateTour(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Tour Id",
      });
    }
    const tour = await Tour.findById(id);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }
    const {
      name,
      overview,
      description,
      cityId,
      moodId,
      durationId,
      price,
      discountPrice,
      bestTimeToVisit,
      trending,
      featured,
      isActive,
    } = req.body;

    const inclusions = req.body.inclusions
      ? JSON.parse(req.body.inclusions)
      : tour.inclusions;

    const exclusions = req.body.exclusions
      ? JSON.parse(req.body.exclusions)
      : tour.exclusions;

    const itinerary = req.body.itinerary
      ? JSON.parse(req.body.itinerary)
      : tour.itinerary;

    const slug = name
      ? slugify(name, {
          lower: true,
          strict: true,
          trim: true,
        })
      : tour.slug;
    if (name) {
      const existingTour = await Tour.findOne({
        slug,
        _id: { $ne: id },
      });

      if (existingTour) {
        return res.status(400).json({
          success: false,
          message: "Tour name already exists",
        });
      }
    }

    let city = null;
    if (cityId) {
      city = await City.findById(cityId).populate({
        path: "stateId",
        populate: {
          path: "regionId",
        },
      });
      if (!city) {
        return res.status(404).json({
          success: false,
          message: "City not found",
        });
      }
    }
    let mood = null;
    if (moodId) {
      mood = await Mood.findById(moodId);
      if (!mood) {
        return res.status(404).json({
          success: false,
          message: "Mood not found",
        });
      }
    }
    let duration = null;

    if (durationId) {
      duration = await Duration.findById(durationId);

      if (!duration) {
        return res.status(404).json({
          success: false,
          message: "Duration not found",
        });
      }
    }
    const uploadedFileIds = [];

    // Store old fileIds so we can delete them later
    let oldThumbnailFileId = null;
    let oldBannerFileId = null;
    try {
      if (req.files?.thumbnail?.length) {
        const thumbnailUpload = await uploadFile({
          file: req.files.thumbnail[0].buffer,
          fileName: req.files.thumbnail[0].originalname,
          folder: "/tours/thumbnails",
        });

        uploadedFileIds.push(thumbnailUpload.fileId);

        oldThumbnailFileId = tour.thumbnail.fileId;

        tour.thumbnail = {
          url: thumbnailUpload.url,
          fileId: thumbnailUpload.fileId,
          alt: name || tour.name,
        };
      }
      if (req.files?.banner?.length) {
        const bannerUpload = await uploadFile({
          file: req.files.banner[0].buffer,
          fileName: req.files.banner[0].originalname,
          folder: "/tours/banners",
        });

        uploadedFileIds.push(bannerUpload.fileId);

        oldBannerFileId = tour.banner.fileId;

        tour.banner = {
          url: bannerUpload.url,
          fileId: bannerUpload.fileId,
          alt: name || tour.name,
        };
      }
      if (req.files?.gallery?.length) {
        const galleryUploads = await Promise.all(
          req.files.gallery.map(async (image) => {
            const uploaded = await uploadFile({
              file: image.buffer,
              fileName: image.originalname,
              folder: "/tours/gallery",
            });

            uploadedFileIds.push(uploaded.fileId);

            return {
              url: uploaded.url,
              fileId: uploaded.fileId,
              alt: image.originalname,
            };
          }),
        );

        tour.gallery.push(...galleryUploads);
      }
      if (req.body.deleteGallery) {
        const deleteGallery = JSON.parse(req.body.deleteGallery);

        for (const fileId of deleteGallery) {
          await deleteFile(fileId);
        }

        tour.gallery = tour.gallery.filter(
          (image) => !deleteGallery.includes(image.fileId),
        );
      }

      if (name) {
        tour.name = name;
        tour.slug = slug;
      }

      if (overview) {
        tour.overview = overview;
      }

      if (description) {
        tour.description = description;
      }

      if (city) {
        tour.cityId = city._id;
        tour.cityName = city.name;

        tour.stateId = city.stateId._id;
        tour.stateName = city.stateId.name;

        tour.regionId = city.stateId.regionId._id;
        tour.regionName = city.stateId.regionId.name;
      }

      if (mood) {
        tour.moodId = mood._id;
        tour.moodName = mood.name;
      }

      if (duration) {
        tour.durationId = duration._id;
        tour.durationName = duration.name;
      }

      if (price !== undefined) {
        tour.price = Number(price);
      }

      if (discountPrice !== undefined) {
        tour.discountPrice = Number(discountPrice);
      }
      if (bestTimeToVisit) {
        tour.bestTimeToVisit = bestTimeToVisit;
      }
      tour.inclusions = inclusions;
      tour.exclusions = exclusions;
      tour.itinerary = itinerary;
      if (trending !== undefined) {
        tour.trending = trending;
      }
      if (featured !== undefined) {
        tour.featured = featured;
      }
      if (isActive !== undefined) {
        tour.isActive = isActive;
      }
      await tour.save();
      if (oldThumbnailFileId) {
        await deleteFile(oldThumbnailFileId);
      }
      if (oldBannerFileId) {
        await deleteFile(oldBannerFileId);
      }
      return res.status(200).json({
        success: true,
        message: "Tour updated successfully",
        data: tour,
      });
    } catch (error) {
      await Promise.all(
        uploadedFileIds.map(async (fileId) => {
          try {
            await deleteFile(fileId);
          } catch (err) {
            console.error("Rollback failed:", err.message);
          }
        }),
      );
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {}
  return res.status(500).json({
    success: false,
    message: error.message,
  });
}

export async function deleteTour(req, res) {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Tour ID",
      });
    }

    // Find Tour
    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    await Promise.all([
      deleteFile(tour.thumbnail.fileId),
      deleteFile(tour.banner.fileId),
      ...tour.gallery.map((img) => deleteFile(img.fileId)),
    ]);

    // Delete Tour
    await Tour.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Tour deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function getTours(req, res) {
  try {
    const { cityId, moodId, durationId } = req.query;
    const query = {};
    if (cityId) {
      query.cityId = cityId;
    }
    if (moodId) {
      query.moodId = moodId;
    }
    if (durationId) {
      query.durationId = durationId;
    }
    const tours = await Tour.find(query);
    return res.status(200).json({
      success: true,
      count: tours.length,
      data: tours,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
