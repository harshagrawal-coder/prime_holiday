import City from "../model.js/city.schema.js";
import State from "../model.js/stateSchema.js";
import slugify from "slugify";

export async function createCity(req, res) {
  try {
    const { name, stateId } = req.body;

    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    const isStateExist = await State.findById(stateId);

    if (!isStateExist) {
      return res.status(404).json({
        success: false,
        message: "State not found",
      });
    }
    const isCityExist = await City.findOne({ slug });
    if (isCityExist) {
      return res.status(400).json({
        success: false,
        message: "City already exists",
      });
    }
    const city = await City.create({
      name,
      slug,
      stateId,
    });
    const populatedCity = await City.findById(city._id).populate({
      path: "stateId",
      populate: {
        path: "regionId",
      },
    });
    return res.status(201).json({
      success: true,
      message: "City created successfully",
      data: populatedCity,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function getAllCity(req, res) {
  try {
    const cities = await City.find().populate({
      path: "stateId",
      populate: {
        path: "regionId",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Cities fetched successfully",
      data: cities,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function getCityById(req, res) {
  try {
    const city = await City.findById(req.params.id).populate({
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

    return res.status(200).json({
      success: true,
      message: "City fetched successfully",
      data: city,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function updateCity(req, res) {
  try {
    const { name, stateId } = req.body;
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found",
      });
    }
    const existingState = await State.findById(stateId);
    if (!existingState) {
      return res.status(404).json({
        success: false,
        message: "State not found",
      });
    }
    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });
    const existingCity = await City.findOne({
      slug,
      _id: { $ne: city._id },
    });
    if (existingCity) {
      return res.status(400).json({
        success: false,
        message: "City already exists",
      });
    }

    city.name = name;
    city.slug = slug;
    city.stateId = stateId;

    await city.save();

    return res.status(200).json({
      success: true,
      message: "City updated successfully",
      data: city,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function deleteCity(req, res) {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) {
      return res.status(404).json({
        success: false,
        message: "city not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "City deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
