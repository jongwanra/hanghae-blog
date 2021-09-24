const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
require('dotenv').config();

//mongo db connect
try {
  mongoose.connect(
    'mongodb://test:test@13.125.89.15:27017/hanghae-blog?authSource=admin'
  );
} catch (error) {
  console.log('mongo connect error : ', error);
}

const Post = require('./schemas/post_info');
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

const postRouter = require('./routers/post');
app.use('/api/post', [postRouter]);

// view path와 확장자는 ejs로 설정
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// 전체 게시글 목록 조회 페이지(메인 페이지)로 이동하기
app.get('/', async (req, res) => {
  // 작성순으로 내림차순 정렬
  try {
    const posts = await Post.find({}).sort({ _id: -1 });
    res.render('main_page', { posts });
  } catch (err) {
    console.log(err);
  }
});

// 게시글 작성 페이지로 이동하기
app.get('/write', (req, res) => {
  res.render('write_page');
});

// 게시글 조회 페이지로 이동하기
app.get('/detail/:postID', async (req, res) => {
  const { postID } = req.params;
  const detailPost = await Post.find({ postID: postID }, { _id: false });
  res.render('detail_page', { detailPost });
});

// 게시글 수정 페이지로 이동하기
app.get('/modify/:postID', async (req, res) => {
  const { postID } = req.params;
  const detailPost = await Post.find({ postID: postID }, { _id: false });
  res.render('modify_page', { detailPost });
});

// 해당포트로 서버와 연결하기
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
