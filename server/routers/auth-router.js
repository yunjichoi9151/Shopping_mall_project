const { Router } = require('express');
const passport = require('passport');

const router = Router();

// authenticate
// /person 경로를 작성한 이유 -> 사람 모양의 버튼을 눌렀을때 이동하기 위해서
router.post('/', passport.authenticate('local'), (req, res, next) => {
  res.redirect('/');
});

module.exports = router;