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
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Tour name is required")
    .isLength({ min: 3 })
    .withMessage("Tour name must be at least 3 characters"),

  body("city").trim().notEmpty().withMessage("City is required"),

  body("state").trim().notEmpty().withMessage("State is required"),

  body("region")
    .notEmpty()
    .withMessage("Region is required")
    .isIn(["North", "South", "East", "West", "NorthEast", "Central"])
    .withMessage("Invalid region"),

  body("mood")
    .notEmpty()
    .withMessage("Mood is required")
    .isIn(["Mountain", "Beach", "Spiritual", "Heritage", "Adventure"])
    .withMessage("Invalid mood"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),

  body("days").trim().notEmpty().withMessage("Days is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 20 })
    .withMessage("Description must be at least 20 characters"),

  body("bestTimeToVisit")
    .trim()
    .notEmpty()
    .withMessage("Best time to visit is required"),

  body("trending")
    .optional()
    .isBoolean()
    .withMessage("Trending must be true or false"),

  validateRequest,
];
