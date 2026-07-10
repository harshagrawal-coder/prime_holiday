import {
  body,
  validationResult,
} from "express-validator";


// ==========================================
// Handle Validation Errors
// ==========================================

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  next();
};


// ==========================================
// Create Blog Category Validator
// ==========================================

export const validateCreateBlogCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Blog category name is required")
    .isLength({
      min: 2,
      max: 50,
    })
    .withMessage(
      "Blog category name must be between 2 and 50 characters"
    ),

  handleValidationErrors,
];


// ==========================================
// Update Blog Category Validator
// ==========================================

export const validateUpdateBlogCategory = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Blog category name cannot be empty")
    .isLength({
      min: 2,
      max: 50,
    })
    .withMessage(
      "Blog category name must be between 2 and 50 characters"
    ),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false"),

  handleValidationErrors,
];