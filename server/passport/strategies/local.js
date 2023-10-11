const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./db/models/user-model');
const hashPassword = require('../../utils/hash-password');

const config = {
    // 'email' 필드 사용하도록 설정
  usernameField: 'email',
  // 'password' 필드 사용하도록 설정
  passwordField: 'password'
};

const local = new LocalStrategy(config, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('회원을 찾을 수 없습니다.');
    }
    // 검색 한 유저의 비밀번호와 요청된 비밀번호의 해쉬값이 일치하는지 확인
    if (user.password !== hassPassword(password)) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    done (null, {
      shortId: user.shortId,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    done(err, null);
  }
});

module.exports = local;