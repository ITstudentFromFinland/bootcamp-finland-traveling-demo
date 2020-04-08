const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Nimi vaaditaan";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Sähköposti vaaditaan";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Sähköposti ei kelpaa";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Salasana vaaditaan";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Salasanan on oltava vähintään 6 merkkiä mitkä";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};