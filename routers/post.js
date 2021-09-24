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
// 게시글 삭제하기
router.delete('/delete', async (req, res) => {
  try {
    const { postID } = req.body;
    await Post.deleteOne({ postID: postID });
    res.send({ msg: '해당 게시글의 삭제를 완료하였습니다.' });
  } catch (error) {
    console.log(error);
  }
});

// 게시글 수정하기
router.put('/modify/:postID', async (req, res) => {
  try {
    const { postID } = req.params;
    const { postTitle, postContent, postPassword } = req.body;

    // 비밀번호가 일치하지 않을 경우
    if (await !isMatchPwd()) {
      res.send({ msg: '비밀번호가 일치하지 않습니다.' });
      return;
    }
    await Post.updateOne(
      { postID: postID },
      { $set: { postTitle: postTitle, postContent: postContent } }
    );
    res.send({ msg: '해당 게시글의 수정을 완료하였습니다.' });
  } catch (error) {
    console.log(error);
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

//비밀번호 DB에 있는 것과 일치하는지 확인
function isMatchPwd(password){
  return new Promise((resolve, reject) => {
      
  })
}

module.exports = router;
