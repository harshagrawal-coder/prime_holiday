import { body, validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

export const validateCreateTour = [
  // Tour Name
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Tour name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Tour name must be between 3 and 100 characters"),

  // Overview
  body("overview")
    .trim()
    .notEmpty()
    .withMessage("Overview is required")
    .isLength({ min: 20, max: 500 })
    .withMessage("Overview must be between 20 and 500 characters"),

  // Description
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 50 })
    .withMessage("Description must be at least 50 characters"),

  // City
  body("cityId")
    .notEmpty()
    .withMessage("City is required")
    .isMongoId()
    .withMessage("Invalid city id"),

  // Mood
  body("moodId")
    .notEmpty()
    .withMessage("Mood is required")
    .isMongoId()
    .withMessage("Invalid mood id"),

  // Duration
  body("durationId")
    .notEmpty()
    .withMessage("Duration is required")
    .isMongoId()
    .withMessage("Invalid duration id"),

  // Price
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be greater than or equal to 0"),

  // Discount Price
  body("discountPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount price must be greater than or equal to 0"),

  // Best Time
  body("bestTimeToVisit")
    .trim()
    .notEmpty()
    .withMessage("Best time to visit is required"),

  // Inclusions
  body("inclusions")
    .optional()
    .custom((value) => {
      if (typeof value === "string") {
        JSON.parse(value);
      }
      return true;
    })
    .withMessage("Invalid inclusions format"),

  // Exclusions
  body("exclusions")
    .optional()
    .custom((value) => {
      if (typeof value === "string") {
        JSON.parse(value);
      }
      return true;
    })
    .withMessage("Invalid exclusions format"),

  // Itinerary
  body("itinerary")
    .optional()
    .custom((value) => {
      if (typeof value === "string") {
        JSON.parse(value);
      }
      return true;
    })
    .withMessage("Invalid itinerary format"),

  // Trending
  body("trending")
    .optional()
    .isBoolean()
    .withMessage("Trending must be true or false"),

  // Featured
  body("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be true or false"),

  // Active
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false"),

  validateRequest,
];
export const validateUpdateTour = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Tour name cannot be empty")
    .isLength({ min: 3, max: 100 })
    .withMessage("Tour name must be between 3 and 100 characters"),

  body("overview")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Overview cannot be empty")
    .isLength({ min: 20, max: 500 })
    .withMessage("Overview must be between 20 and 500 characters"),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty")
    .isLength({ min: 50 })
    .withMessage("Description must contain at least 50 characters"),

  body("cityId").optional().isMongoId().withMessage("Invalid city ID"),

  body("moodId").optional().isMongoId().withMessage("Invalid mood ID"),

  body("durationId").optional().isMongoId().withMessage("Invalid duration ID"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("discountPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount price must be a positive number"),

  body("bestTimeToVisit")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Best time to visit cannot be empty"),

  body("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be true or false"),

  body("trending")
    .optional()
    .isBoolean()
    .withMessage("Trending must be true or false"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false"),

  validateRequest,
];
