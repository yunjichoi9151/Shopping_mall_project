// CRUD 구현하기
// C : 사용자 정보 생성
// R : 사용자 정보 조회
// U : 사용자 정보 수정
// D : 사용자 정보 삭제

const { Router } = require("express");
const UserModel = require("../db/models/user-model");
// const asyncHandler = require('../middlewares/async-handler');
// const hashPassword = require('../middlewares/hash-password');

const router = Router();

// READ 구현하기 -> GET
router.get("/", async (req, res) => {
  // const deletedAt = req.params.deletedAt;
  const user = await UserModel.find({ deletedAt: null });
  res.json(user);

  console.log("data OK");
});

// 회원 아이디 찾기 추가 !
router.post("/find", async (req, res) => {
  const phoneNumber = req.body.phoneNumber; // 클라이언트에서 전달한 phoneNumber 값

  try {
    // phoneNumber를 사용하여 사용자를 찾음
    const user = await UserModel.findOne({ phoneNumber: phoneNumber });
    if (user) {
      // 사용자를 찾은 경우 사용자의 이메일 주소를 응답으로 보냄
      res.json({ email: user.email });
    } else {
      // 사용자를 찾지 못한 경우에도 적절한 응답을 보냄 (예: 404 상태 코드)
      res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
  } catch (err) {
    // 오류가 발생한 경우에 대한 처리
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
});

router.get("/:userId", async (req, res) => {
  const search_id = req.params.userId;
  const user = await UserModel.find({ _id: search_id });

  res.json(user);
});

// CREATE 구현하기 -> POST
router.post("/", async (req, res) => {
  const { _id, name, email, password, phoneNumber, address, admin, joinTime } =
    req.body;

  const user = await UserModel.create({
    _id,
    name,
    email,
    password,
    phoneNumber,
    address,
    admin,
    joinTime,
  });
  res.json(user);
});

// UPDATE 구현하기 -> PUT
router.put("/put/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, email, password, phoneNumber, address, joinTime } = req.body;
  const currentTime = Date.now();

  const user = await UserModel.updateOne(
    {
      _id: userId,
      updateAt: currentTime,
    },
    {
      name,
      email,
      password,
      phoneNumber,
      address,
      joinTime,
    }
  );
  res.json(user);
  console.log("Update OK");
});

// DELETE 구현하기 -> DELETE
router.delete("/delete/:email", async (req, res) => {
  const { email } = req.params;
  const decodedEmail = decodeURIComponent(email);

  try {
    // 이메일을 기준으로 사용자를 삭제
    const deletedUser = await UserModel.deleteOne({ email: decodedEmail });
    if (deletedUser.deletedCount > 0) {
      res.json({ message: "사용자가 성공적으로 삭제되었습니다." });
    } else {
      res.status(404).json({ message: "삭제할 사용자를 찾을 수 없습니다." });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "서버 오류로 사용자를 삭제할 수 없습니다." });
  }
});

/*
// 회원가입 구현 (hashedPassword 사용)
// 로그인과 로그아웃 기능은 auth-router.js에 분리합니다.
router.post(
  "/join",
  asyncHandler(async (req, res) => {
    const { email, name, password, phoneNumber, address, admin } = req.body;

    // 이미 존재하는 이메일일 경우 400 에러 보내줌 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "이미 존재하는 이메일입니다." });
    }
    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

    const hashedPassword = hashPassword(password);
    const user = await UserModel.create({
      email,
      name,
      password: hashedPassword,
      phoneNumber,
      address,
      admin,
  '/join',
  asyncHandler(async (req, res) => {
    const { email, name, password, phoneNumber, address, admin } = req.body;
    const hashedPassword = hashPassword(password);
    const user = await UserModel.create({
        email,
        name,
        password: hashedPassword,
        phoneNumber,
        address,
        admin
    });
}));
*/

module.exports = router;
