import Duration from "../model.js/duration.schema.js";
import slugify from "slugify";

export async function createDuration(req, res) {
  try {
    const { name, nights, days, isActive } = req.body;

    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    const existingDuration = await Duration.findOne({ slug });

    if (existingDuration) {
      return res.status(400).json({
        success: false,
        message: "Duration already exists",
      });
    }

    const duration = await Duration.create({
      name,
      nights,
      days,
      slug,
      isActive,
    });

    return res.status(201).json({
      success: true,
      message: "Duration created successfully",
      data: duration,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function getAllDuration(req, res) {
  try {
    const durations = await Duration.find().sort({
      days: 1,
    });

    return res.status(200).json({
      success: true,
      message: "Durations fetched successfully",
      data: durations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function getDurationById(req, res) {
  try {
    const duration = await Duration.findById(req.params.id);

    if (!duration) {
      return res.status(404).json({
        success: false,
        message: "Duration not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Duration fetched successfully",
      data: duration,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function updateDuration(req, res) {
  try {
    const { name, nights, days, isActive } = req.body;

    const duration = await Duration.findById(req.params.id);

    if (!duration) {
      return res.status(404).json({
        success: false,
        message: "Duration not found",
      });
    }

    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    const existingDuration = await Duration.findOne({
      slug,
      _id: { $ne: duration._id },
    });

    if (existingDuration) {
      return res.status(400).json({
        success: false,
        message: "Duration already exists",
      });
    }

    duration.name = name;
    duration.nights = nights;
    duration.days = days;
    duration.slug = slug;

    if (typeof isActive === "boolean") {
      duration.isActive = isActive;
    }

    await duration.save();

    return res.status(200).json({
      success: true,
      message: "Duration updated successfully",
      data: duration,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function deleteDuration(req, res) {
  try {
    const duration = await Duration.findByIdAndDelete(req.params.id);

    if (!duration) {
      return res.status(404).json({
        success: false,
        message: "Duration not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Duration deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
