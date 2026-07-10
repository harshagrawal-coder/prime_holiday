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

export const validateCreateGallery = [
  body("moodId")
    .trim()
    .notEmpty()
    .withMessage("Mood ID is required")
    .isMongoId()
    .withMessage("Invalid mood ID"),

  body("order")
    .optional()
    .isInt({
      min: 0,
    })
    .withMessage("Order must be a positive whole number"),
  validateRequest,
];

export const validateUpdateGallery = [
  body("moodId").optional().trim().isMongoId().withMessage("Invalid mood ID"),

  body("order")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Order must be a non-negative whole number"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false"),

  validateRequest,
];
