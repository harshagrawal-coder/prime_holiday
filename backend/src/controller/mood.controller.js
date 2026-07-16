import Mood from "../model.js/mood.schema.js";
import slugify from "slugify";
export async function createMood(req, res) {
  const { name, isActive } = req.body;
  try {
    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });
    const isMoodExist = await Mood.findOne({ slug });
    if (isMoodExist) {
      return res.status(400).json({
        success: false,
        message: "mood already exists",
      });
    }
    const mood = await Mood.create({
      name,
      slug,
      isActive,
    });
    return res.status(201).json({
      success: true,
      message: "mood created successfully",
      mood,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getAllMood(req, res) {
  try {
    const query = {};

    if (req.query.isActive !== undefined) {
      query.isActive = req.query.isActive === "true";
    }
    const mood = await Mood.find(query).sort({ name: 1 });

    return res.status(200).json({
      success: true,
      message: "All Mood fetched successfully",
      mood,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function getMoodById(req, res) {
  try {
    const mood = await Mood.findById(req.params.id);

    if (!mood) {
      return res.status(404).json({
        success: false,
        message: "Mood not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Mood fetched successfully",
      data: mood,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function updateMood(req, res) {
  try {
    const { name, isActive } = req.body;

    const mood = await Mood.findById(req.params.id);

    if (!mood) {
      return res.status(404).json({
        success: false,
        message: "Mood not found",
      });
    }

    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    const existingMood = await Mood.findOne({
      slug,
      _id: { $ne: mood._id },
    });

    if (existingMood) {
      return res.status(400).json({
        success: false,
        message: "Mood already exists",
      });
    }

    mood.name = name;
    mood.slug = slug;

    if (typeof isActive === "boolean") {
      mood.isActive = isActive;
    }

    await mood.save();

    return res.status(200).json({
      success: true,
      message: "Mood updated successfully",
      mood,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function deleteMood(req, res) {
  try {
    const mood = await Mood.findByIdAndDelete(req.params.id);

    if (!mood) {
      return res.status(404).json({
        success: false,
        message: "Mood not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Mood deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function updateMoodStatus(req, res) {
  try {
    const { isActive } = req.body;
    const moodId = req.params.id;
    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be a boolean",
      });
    }
    const mood = await Mood.findById(moodId);
    if (!mood) {
      return res.status(404).json({
        success: false,
        message: "mood not found",
      });
    }
    mood.isActive = isActive;
    await mood.save();
    return res.status(200).json({
      success: true,
      message: "mood status updated successfully",
      mood,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
