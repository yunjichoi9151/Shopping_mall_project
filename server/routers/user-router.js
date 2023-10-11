// CRUD 구현하기
// C : 사용자 정보 생성
// R : 사용자 정보 조회
// U : 사용자 정보 수정
// D : 사용자 정보 삭제

const { Router } = require('express');
const UserModel = require('../db/models/user-model');
const asyncHandler = require('../middlewares/async-handler');
const hashPassword = require('../middlewares/hash-password');

const router = Router();

// READ 구현하기 -> GET
router.get('/', async (req, res) => {
  const user = await UserModel.find({});

  res.json(user);

  console.log('data OK');
});

router.get('/:userId', async (req, res) => {
  const search_id = req.params.userId;
  const user = await UserModel.find({ _id: search_id });

  res.json(user);
});

// CREATE 구현하기 -> POST
router.post('/', async (req, res) => {
  const { _id, name, email, password, joinTime } = req.body;

  const user = await UserModel.create({
    _id,
    name,
    email,
    password,
    joinTime,
  });
  res.json(user);
});

// UPDATE 구현하기 -> PUT
router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { name, email, password, joinTime } = req.body;

  const user = await UserModel.updateOne(
    {
      _id: userId,
    },
    {
      name,
      email,
      password,
      joinTime,
    }
  );
  res.json(user);
  console.log('Update OK');
});

// DELETE 구현하기 -> DELETE
router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;

  const user = await UserModel.deleteOne({ _id: userId });
  res.json(user);
  console.log('Delete OK');
});

// 로그인 구현

// 로그인 페이지에서 로그인 되었을 경우, 되지 않았을 경우 어느 경로로 갈지 결정
router.get('/', (req, res) => {
  if (req.user) {
    res.redirect('/user');
    return;
  }
  res.redirect('/login');
});

// 회원가입 (hashedPassword 사용)
router.post(
  '/join',
  asyncHandler(async (req, res) => {
    const { email, name, password } = req.body;
    const hashedPassword = hashPassword(password);
    const user = await UserModel.create({
      email,
      name,
      password: hashedPassword,
    });

    res.redirect('/');
  })
);

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
