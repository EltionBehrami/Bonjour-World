const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateUserInput = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Email is invalid'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6, max: 30 })
      .withMessage('Password must be between 6 and 30 characters'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 2, max: 30 })
      .withMessage('Username must be between 2 and 30 characters'),
    // check('age') 
    //   .isInt({min: 12, max: 100})
    //   .withMessage('Age is invalid'),
    // check('firstName')
    //   .exists({checkFalsy: true})
    //   .isLength({min: 1, max: 30})
    //   .withMessage('First name is invalid'),
    // check('lastName')
    //   .exists({checkFalsy: true})
    //   .isLength({min: 1, max: 30})
    //   .withMessage('Last name is invalid'),
    handleValidationErrors
  ];

module.exports = validateUserInput;