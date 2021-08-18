const {
  passwordMinLength,
  emailMinLength,
} = require("./../config");

module.exports = {
  USER_INVALID: "Invalid username",
  USER_NAME_INVALID: "Invalid name",

  USER_EMAIL_INVALID: "Invalid email",
  USER_EMAIL_EXISTS: "E-mail has already registered",
  USER_EMAIL_TOO_SHORT: `E-mail too short: ${emailMinLength} characters at least`,

  USER_EXISTS: "Existing user",
  USER_NOT_EXIST: "User does not exist",
  LOGIN_INVALID: "Invalid login",

  INCORRECT_PASSWORD: "Wrong password", // "Incorrect password"
  PASSWORD_TOO_SHORT: `Password too short: ${passwordMinLength} characters at least`,
  SAME_PASSWORDS: "Passwords are the same",

  USER_NOT_VALIDATED: "User is not validated",
  USER_ALREADY_VALIDATED: "User is already validated",
};

/**
 * "No user with that email"
 */
