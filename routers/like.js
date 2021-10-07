const express = require('express');
const Like = require('../schemas/like_info');
const Post = require('../schemas/post_info');
const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

// 좋아요를 누른 경우, like_info에 데이터 추가
// 해당 postDB에서  like_cnt + 1
router.post('/:postID', authMiddleware, async (req, res) => {
  const { postID } = req.params;
  const user = res.locals.user;
  const userID = user.userID;

  //like_info에 데이터 추가
  try {
    await Like.create({ postID, userID });

    const postInfo = await Post.find({ postID }, { _id: false });
    const updatedLikeCnt = postInfo[0].postLikeCnt + 1;

    // postDB에서 like_cnt + 1
    await Post.updateOne(
      { postID: postID },
      { $set: { postLikeCnt: updatedLikeCnt } }
    );
    res.status(201).send({ updatedLikeCnt: updatedLikeCnt });
  } catch (error) {
    console.log(error);
  }
});

// 좋아요를 취소한 경우, like_info에서 데이터 삭제한 후,
// 해당 postDB에서  like_cnt - 1
router.delete('/:postID', authMiddleware, async (req, res) => {
  const { postID } = req.params;
  const user = res.locals.user;
  const userID = user.userID;

  //like_info에서  데이터 삭제
  try {
    await Like.deleteOne({ postID: postID, userID: userID });

    const postInfo = await Post.find({ postID }, { _id: false });
    const updatedLikeCnt = postInfo[0].postLikeCnt - 1;

    // postDB에서 like_cnt + 1
    await Post.updateOne(
      { postID: postID },
      { $set: { postLikeCnt: updatedLikeCnt } }
    );
    res.status(201).send({ updatedLikeCnt: updatedLikeCnt });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
