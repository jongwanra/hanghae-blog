const Post = require('../schemas/post_info');
const uuid = require('uuid');
const express = require('express');
const router = express.Router();

// 작성한 글 추가하기
router.post('/add/content', async (req, res) => {
  try {
    const { postTitle, postWriter, postContent, postPassword } = req.body;

    //mongoDB에 작성한 글 추가
    const postID = uuid.v1();
    const postDate = getCurrentTime();

    Post.create({
      postID,
      postTitle,
      postContent,
      postWriter,
      postDate,
      postPassword,
    });
    // res.render("main_page");
    res.send({ result: 'success' });
  } catch (error) {
    // 실패할 경우,
    res.send({
      result: 'fail',
      message: '컨텐츠를 추가하는데 문제가 발생했습니다.',
      error: error,
    });
  }
});

// 현재시간을 만들어서 내보냄
function getCurrentTime() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const date = today.getDate();

  const currentTime = `${year}.${month}.${date}`;
  return currentTime;
}

module.exports = router;
