// CRUD 구현하기
// C : 사용자 정보 생성
// R : 사용자 정보 조회
// U : 사용자 정보 수정
// D : 사용자 정보 삭제


const { Router } = require("express");
<<<<<<< HEAD
const UserModel = require("../db/models/user-model");
// const asyncHandler = require('../middlewares/async-handler');
// const hashPassword = require('../middlewares/hash-password');
=======
const UserModel = require("./db/models/user-model");
const asyncHandler = require('../middlewares/async-handler');
const hashPassword = require('../middlewares/hash-password');
>>>>>>> 7ad8e97 (🔔 Merge Request: Resolving conflict)

const router = Router();

// READ 구현하기 -> GET
router.get("/", async (req, res) => {
    // const deletedAt = req.params.deletedAt;
    const user = await UserModel.find({ deletedAt: null });

  console.log('data OK');
});

router.get('/:userId', async (req, res) => {
  const search_id = req.params.userId;
  const user = await UserModel.find({ _id: search_id });

  res.json(user);
});

// CREATE 구현하기 -> POST
router.post("/", async (req, res) => {
    const { _id, name, email, password, phoneNumber, address, admin, joinTime } = req.body;
    
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
})

// UPDATE 구현하기 -> PUT
router.put("/put/:userId", async (req, res) => {
    const { userId } = req.params;
    const { name, email, password, phoneNumber, address, joinTime } = req.body;
    const currentTime = Date.now();

    const user = await UserModel.updateOne(
        {
            _id: userId,
            updateAt: currentTime
        },
        {
            name,
            email,
            password,
            phoneNumber,
            address,
            joinTime
        }
    );
    res.json(user);
    console.log("Update OK");
});

// DELETE 구현하기 -> DELETE
router.put("/delete/:userId", async (req, res) => {
    const { userId } = req.params;
    const currentTime = Date.now();

    const user = await UserModel.updateOne(
        {
            _id: userId
        },
        {
            deletedAt: currentTime
        });
    res.json(user);
    console.log("Delete OK");
});

<<<<<<< HEAD
/*
=======
>>>>>>> 7ad8e97 (🔔 Merge Request: Resolving conflict)
// 회원가입 구현 (hashedPassword 사용)
// 로그인과 로그아웃 기능은 auth-router.js에 분리합니다.
router.post(
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
<<<<<<< HEAD
*/

module.exports = router;
=======

module.exports = router;

>>>>>>> 7ad8e97 (🔔 Merge Request: Resolving conflict)
