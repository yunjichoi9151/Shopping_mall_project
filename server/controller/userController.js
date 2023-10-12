const signin = async (req, res, next) => {
    try {
      passport.authenticate("signin", (err, user, info) => {
        if (err || !user) {
          res.status(400).json({ message: info });
          return;
        }

        req.login(user, (err) => {
          console.log(user);
          if (err) {
            res.json({
              message: err,
            });
          }

          User.findOne({
            where: { email: user.email },
          }).then((user) => {
            const token = generateAccessToken({
              id: user.id,
            });
              sendAccessToken(res, token);
              res.json({
                auth: true,
                token: token,
                maessage: "토큰 발급 완료",
            });
          });
        });
      })(req, res, next);
    } catch (e) {
      res.json({
        message: e,
      });
    }
}
  
module.exports = signin;