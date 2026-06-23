import Region from "../model.js/regionSchema.js";
import slugify from "slugify";

export async function regionCreate(req, res) {
  try {
    const { name } = req.body;

    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    const existingRegion = await Region.findOne({ slug });

    if (existingRegion) {
      return res.status(400).json({
        success: false,
        message: "Region already exists",
      });
    }

    const region = await Region.create({
      name,
      slug,
    });

    return res.status(201).json({
      success: true,
      message: "Region created successfully",
      data: region,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getAllRegion(req, res) {
  try {
    const regions = await Region.find().sort({ name: 1 });

    return res.status(200).json({
      success: true,
      message: "All regions fetched successfully",
      data: regions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getRegionById(req, res) {
  try {
    const regionId = req.params.id;

    const region = await Region.findById(regionId);

    if (!region) {
      return res.status(404).json({
        success: false,
        message: "Region not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Region fetched successfully",
      data: region,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function updateRegion(req, res) {
  try {
    const { name } = req.body;
    const region = await Region.findById(req.params.id);
   
    if (!region) {
      return res.status(404).json({
        success: false,
        message: "Region not found",
      });
    }

    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    const existingRegion = await Region.findOne({
      slug,
      _id: { $ne: region._id },
    });

    if (existingRegion) {
      return res.status(400).json({
        success: false,
        message: "Region already exists",
      });
    }

    region.name = name;
    region.slug = slug;

    await region.save();

    return res.status(200).json({
      success: true,
      message: "Region updated successfully",
      data: region,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function deleteRegion(req, res) {
  try {
    const regionId = req.params.id;

    const region = await Region.findByIdAndDelete(regionId);

    if (!region) {
      return res.status(404).json({
        success: false,
        message: "Region not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Region deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
