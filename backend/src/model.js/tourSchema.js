import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: true,
      min: 1,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    stay: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    _id: false,
  },
);

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },

    fileId: {
      type: String,
      required: true,
      trim: true,
    },
    alt: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const tourSchema = new mongoose.Schema(
  {
    // Basic Details
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    overview: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Location
    regionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region",
      required: true,
    },

    regionName: {
      type: String,
      required: true,
      trim: true,
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
    stateName: {
      type: String,
      required: true,
      trim: true,
    },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    cityName: {
      type: String,
      required: true,
      trim: true,
    },
    // Mood
    moodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mood",
      required: true,
    },
    moodName: {
      type: String,
      required: true,
      trim: true,
    },
    // Duration
    durationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Duration",
      required: true,
    },
    durationName: {
      type: String,
      required: true,
      trim: true,
    },
    // Pricing
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    // Images
    thumbnail: imageSchema,
    banner: imageSchema,
    gallery: {
      type: [imageSchema],
      validate: {
        validator: function (images) {
          return images.length > 0;
        },
        message: "At least one gallery image is required",
      },
    },
    // Tour Info
    bestTimeToVisit: {
      type: String,
      required: true,
      trim: true,
    },
    inclusions: [
      {
        type: String,
        trim: true,
      },
    ],
    exclusions: [
      {
        type: String,
        trim: true,
      },
    ],
    itinerary: [itinerarySchema],
    // Flags
    trending: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

tourSchema.index({
  name: "text",
  overview: "text",
  cityName: "text",
  stateName: "text",
  regionName: "text",
  moodName: "text",
});

const Tour = mongoose.model("Tour", tourSchema);
export default Tour;
