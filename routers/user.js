const User = require('../schemas/user_info');
const uuid = require('uuid');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

// user 생성
router.post('/register', async (req, res) => {
  const { userNickname, userPassword } = req.body;

  const existUsers = await User.find(
    { userNickname: userNickname },
    { _id: false }
  );

  if (existUsers.length >= 1) {
    return res.status(400).send({
      errorMessage: '중복된 닉네임입니다.',
    });
  }

  const userID = uuid.v1();
  await User.create({ userID, userNickname, userPassword });

  res.status(201).send({});
});

// 로그인
router.post('/auth', async (req, res) => {
  const { userNickname, userPassword } = req.body;

  const user = await User.find(
    { userNickname: userNickname, userPassword: userPassword },
    { _id: false }
  );

  if (user.length === 0) {
    return res.status(400).send({
      errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
    });
  }

  const token = jwt.sign({ userID: user[0].userID }, SECRET_KEY);

  // cookie 저장
  res.cookie('user', token);
  res.status(200).send({
    message: '로그인에 성공하였습니다.',
  });
});

// 로그아웃
router.get('/logout', (req, res) => {
  res.clearCookie('user');
  res.status(200).redirect('/');
});

module.exports = router;
