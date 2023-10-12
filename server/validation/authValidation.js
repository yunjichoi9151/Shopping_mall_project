const Validator = require("validator");

const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

const joinValidator = (data) => {
  let errors = {};

  data.username = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
    

  if (Validator.isEmpty(data.username)) {
    errors.username = "유저네임을 입력해주세요.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "이메일을 입력해주세요.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "비밀번호를 입력해주세요.";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "비밀번호는 6자 이상 30자 미만으로 작성해야합니다.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const loginValidator = (data) => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "유효한 이메일이 아닙니다.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "이메일을 입력해주세요";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "패스워드를 입력해주세요";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports.joinValidator = joinValidator;
module.exports.loginValidator = loginValidator;
