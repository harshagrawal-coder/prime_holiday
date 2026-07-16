import State from "../model.js/stateSchema.js";
import slugify from "slugify";
import Region from "../model.js/regionSchema.js";
export async function createState(req, res) {
  try {
    const { name, regionId } = req.body;

    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });
    const existingRegion = await Region.findById(regionId);
    if (!existingRegion) {
      return res.status(404).json({
        success: false,
        message: "region is not found",
      });
    }
    const existState = await State.findOne({ slug });
    if (existState) {
      return res.status(400).json({
        success: false,
        message: "state already exists",
      });
    }
    const state = await State.create({
      name,
      slug,
      regionId,
    });

    const populateState = await State.findById(state._id).populate("regionId");
    return res.status(201).json({
      success: true,
      message: "state created successfully",
      populateState,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function getAllState(req, res) {
  try {
    const query = {};
    if (req.query.isActive != undefined) {
      query.isActive = req.query.isActive === "true";
    }

    const states = await State.find(query)
      .populate("regionId")
      .sort({ name: 1 });
    return res.status(200).json({
      success: true,
      message: "States fetched successfully",
      states,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function getStateById(req, res) {
  try {
    const state = await State.findById(req.params.id).populate("regionId");

    if (!state) {
      return res.status(404).json({
        success: false,
        message: "State not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "State fetched successfully",
      data: state,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function updateState(req, res) {
  try {
    const { name, regionId } = req.body;

    const state = await State.findById(req.params.id);

    if (!state) {
      return res.status(404).json({
        success: false,
        message: "State not found",
      });
    }

    const existingRegion = await Region.findById(regionId);

    if (!existingRegion) {
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

    const existingState = await State.findOne({
      slug,
      _id: { $ne: state._id },
    });

    if (existingState) {
      return res.status(400).json({
        success: false,
        message: "State already exists",
      });
    }

    state.name = name;
    state.slug = slug;
    state.regionId = regionId;

    await state.save();
    const populateState = await State.findById(state._id).populate("regionId");
    return res.status(200).json({
      success: true,
      message: "State updated successfully",
      populateState,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function deleteState(req, res) {
  try {
    const state = await State.findByIdAndDelete(req.params.id);

    if (!state) {
      return res.status(404).json({
        success: false,
        message: "State not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "State deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function updateStateStatus(req, res) {
  try {
    const { isActive } = req.body;
    const { id } = req.params;
    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be a boolean",
      });
    }
    const state = await State.findById(id);
    if (!state) {
      return res.status(404).json({
        success: false,
        message: "state not found",
      });
    }
    state.isActive = isActive;
    await state.save();
    const populateState = await State.findById(state._id).populate("regionId");
    return res.status(200).json({
      success: true,
      message: "state status updated successfully",
      populateState,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
