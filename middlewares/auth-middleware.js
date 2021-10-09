const jwt = require('jsonwebtoken');
const User = require('../schemas/user_info');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
  // cookie-parser에서 token을 가져온다.
  const token = req.cookies.user;

  // tokenType이 일치하지 않는 경우
  if (!token) {
    return res.status(401).send({
      errorMessage: '로그인 후 사용하세요',
    });
  }

  // 토큰이 제대로 존재할 경우,
  // 해당 user 권한을 확인한다.

  const { userID } = jwt.verify(token, SECRET_KEY);
  const tmp = User.findOne({ userID: userID }, { _id: false });
  console.log(tmp);
  tmp
    .then((user) => {
      res.locals.user = user;
      next();
    })
    .catch((error) => {
      console.log(error);
      return res.status(401).send({
        errorMessage: '로그인 후 사용하세요',
      });
    });
};
