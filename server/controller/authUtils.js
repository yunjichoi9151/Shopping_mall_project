function generateRefreshToken() {
  // 랜덤한 문자열을 생성하기 위한 함수
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const tokenLength = 64; // 토큰의 길이를 지정할 수 있습니다
  let refreshToken = "";

  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    refreshToken += characters[randomIndex];
  }

  return refreshToken;
}

module.exports = {
  generateRefreshToken: generateRefreshToken,
};
