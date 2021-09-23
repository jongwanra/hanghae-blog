const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const path = require('path');
//mongo db connect
const connect = require('./schemas');
const Post = require('./schemas/post_info');
connect();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

const postRouter = require('./routers/post');
app.use('/api/post', [postRouter]);

// view path와 확장자는 ejs로 설정
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// 전체 게시글 목록 조회 페이지(메인 페이지)로 이동하기
app.get('/', (req, res) => {
  Post.find((err, posts) => {
    if (err) return res.status(500).send({ error: `database failuere` });
    console.log(posts);
    try {
      res.render('main_page', { posts });
    } catch (error) {
      console.log(error);
      res.render('main_page');
    }
  });
});

// 게시글 작성 페이지로 이동하기
app.get('/write', (req, res) => {
  res.render('write_page');
});

// 게시글 조회 페이지로 이동하기
// async 와 await를 빼면 안받아진다 왜일까 ?
app.get('/detail/:postID', async (req, res) => {
  const { postID } = req.params;
  const detailPost = await Post.find({ postID: postID }, { _id: false });
  res.render('detail_page', { detailPost });
});

// 게시글 수정 페이지로 이동하기
app.get('/modify', (req, res) => {
  res.render('modify_page');
});

// 해당포트로 서버와 연결하기
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
