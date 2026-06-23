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

export const regionValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Region name is required")
    .isLength({ min: 2 })
    .withMessage("Region name must be at least 2 characters"),

  validateRequest,
];

export const stateValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("State name is required")
    .isLength({ min: 2 })
    .withMessage("State name must be at least 2 characters"),

  body("regionId").notEmpty().withMessage("RegionId is required"),

  validateRequest,
];
export const cityValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("City name is required")
    .isLength({ min: 2 })
    .withMessage("City name must be at least 2 characters"),

  body("stateId").notEmpty().withMessage("State is required"),

  validateRequest,
];

export const moodValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Mood name is required")
    .isLength({ min: 2 })
    .withMessage("Mood name must be at least 2 characters"),

  validateRequest,
];
