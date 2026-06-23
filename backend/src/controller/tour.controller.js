import Tour from "../model.js/tourSchema.js";
import slugify from "slugify";
import { uploadFile } from "../services/imagekit.js";

export async function createTour(req, res) {
  try {
    const {
      name,
      state,
      city,
      region,
      mood,
      price,
      days,
      description,
      bestTimeToVisit,
      trending,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Tour image is required",
      });
    }
    const uploadedImage = await uploadFile({
      file: req.file.buffer,
      fileName: req.file.originalname,
      folder: "/tours",
    });
    // Generate slug
    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });
    // Create tour
    const tour = await Tour.create({
      user: req.user._id,
      name,
      slug,
      city,
      state,
      region,
      mood,
      image: {
        url: uploadedImage.url,
        alt: name,
      },
      price,
      days,
      description,
      bestTimeToVisit,
      trending,
    });
    return res.status(201).json({
      success: true,
      message: "Tour created successfully",
      data: tour,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}