const User = require('../schemas/user_info');
const uuid = require('uuid');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

// user 생성
router.post('/register', async (req, res) => {
  const { userNickname, userEmail, userPassword } = req.body;

  const existUsers = await User.find({
    $or: [{ userNickname: userNickname }, { userEmail: userEmail }],
  });

  if (existUsers.length) {
    res.status(400).send({
      errorMessage: '이미 가입된 이메일 또는 닉네임이 있습니다.',
    });
    return;
  }

  const userID = uuid.v1();
  await User.create({ userID, userEmail, userNickname, userPassword });

  res.status(201).send({});
});

// 로그인
router.post('/auth', async (req, res) => {
  const { userEmail, userPassword } = req.body;

  const user = await User.find(
    { userEmail: userEmail, userPassword: userPassword },
    { _id: false }
  );

  console.log(user);

  if (!user) {
    res.status(400).send({
      errorMessage: '이메일 또는 패스워드가 잘못됐습니다.',
    });
    return;
  }

  const token = jwt.sign({ userID: user.userID }, SECRET_KEY);
  res.status(200).send({
    token,
  });
});

module.exports = router;
