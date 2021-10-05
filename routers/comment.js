const Comment = require('../schemas/comment_info');
const uuid = require('uuid');
const authMiddleware = require('../middlewares/auth-middleware');
const express = require('express');
const router = express.Router();

// 댓글 작성하기
router.post('/:postID', authMiddleware, async (req, res) => {
  try {
    const user = res.locals.user;
    const { postID } = req.params;
    const { commentContent } = req.body;
    // 임시로 데이터 주기

    const commentID = uuid.v1();
    const commentWriter = user.userNickname;
    const commentDate = getCurrentTime();

    Comment.create({
      postID,
      commentID,
      commentContent,
      commentWriter,
      commentDate,
    });

    res.send({ result: true, message: '댓글을 추가하는데 성공했습니다.' });
  } catch (error) {
    console.log('error 발생');
    res.send({
      result: false,
      message: '댓글을 추가하는데 문제가 발생했습니다.',
      error: error,
    });
  }
});

// 댓글 수정하기
router.put('/:postID/:commentID', authMiddleware, async (req, res) => {
  try {
    // 해당 포스트ID와 commentID값을 가져온다.
    const { postID, commentID } = req.params;
    // 바꿀 댓글 내용을 가져온다.
    const { commentContent } = req.body;
    const commentDate = getCurrentTime();

    // 해당 게시물의 해당 댓글ID의 댓글 내용을 수정한다.
    await Comment.updateOne(
      { postID: postID, commentID: commentID },
      { $set: { commentContent: commentContent, commentDate: commentDate } }
    );
    res.send({ result: true, message: '해당 댓글의 수정을 완료하였습니다.' });
  } catch (error) {
    res.send({
      result: false,
      message: '댓글을 수정하는데 문제가 발생했습니다',
      error: error,
    });
  }
});

// 댓글 삭제하기
router.delete('/:postID/:commentID', authMiddleware, async (req, res) => {
  try {
    const { postID, commentID } = req.params;

    await Comment.deleteOne({ postID: postID, commentID: commentID });
    res.send({ result: true, message: '해당 댓글이 삭제되었습니다.' });
  } catch (error) {
    res.send({
      result: false,
      message: '댓글을 삭제하는데 문제가 발생했습니다.',
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
