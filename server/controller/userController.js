const bcrypt = require("bcrypt");
const UserModel = require("../db/models/user-model");
const { generateRefreshToken } = require("../controller/authUtils");
const jwt = require("jsonwebtoken");
const {
  joinValidator,
  loginValidator,
} = require("../validation/authValidation");

require("dotenv").config();

exports.join = async (req, res) => {
  const { errors, isValid } = joinValidator(req.body);

  let { email, name, password, phoneNumber, address, admin } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const emailExists = await UserModel.findOne({ email: email });
  console.log(emailExists);
  if (emailExists) {
    return res.status(400).json({ message: "이미 사용중인 이메일입니다." });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    name: name,
    email: email,
    password: hashedPassword,
    phoneNumber,
    address,
    admin,
  };

  UserModel.create(newUser)
    .then((save) => {
      res.status(200).json({ status: "Success", new_user_id: save.id });
    })
    .catch((err) =>
      res.status(500).json({ message: err + "계정을 생성할 수 없습니다." })
    );
};

exports.login = async (req, res) => {
  const { errors, isValid } = loginValidator(req.body);

  if (!isValid) {
    return res.status(400).json({ message: errors });
  }

  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (!user) return res.status(400).send("존재하지 않는 이메일 계정입니다.");

  const ValidPassword = await bcrypt.compare(password, user.password);
  if (!ValidPassword) {
    return res.status(400).send("비밀번호가 틀렸습니다.");
  }

  const token = jwt.sign(
    {
      id: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      name: user.name,
    },
    process.env.JWT_KEY
  );
  const refreshToken = generateRefreshToken(user.email);

  res
    .cookie("auth_token", token)
    .json({ token: token, refreshToken: refreshToken, name: user.name });
};
