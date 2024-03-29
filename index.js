require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authMiddleware = require('./middlewares/auth-middleware');
const SECRET_KEY = process.env.SECRET_KEY;
const HOST = process.env.HOST;
const USER_ID = process.env.USER_ID;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;
const PORT = process.env.PORT;
const jwt = require('jsonwebtoken');

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

// swagger
const swaggerDefinition = {
  info: {
    title: "Jongwan's Blog API",
    version: '1.0.0',
    description: "Jongwan's Blog API",
  },
  host: 'localhost:3000',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./swagger/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', (req, res) => {
  res.setHeader('content-Type', 'application/json');
  res.send(swaggerSpec);
});

// swagger

//mongo db connect
try {
  mongoose.connect(
    `mongodb://${USER_ID}:${PASSWORD}@${HOST}:27017/${DATABASE}?authSource=admin`
  );
} catch (error) {
  console.log('mongo connect error : ', error);
}

const Comment = require('./schemas/comment_info');
const User = require('./schemas/user_info');
const Like = require('./schemas/like_info');
const Post = require('./schemas/post_info');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// css, javascript 파일과 같은 정적 파일을 제공하기 위한 미들웨어 함수
app.use(express.static('public'));

app.use('/api/post', [require('./routers/post')]);
app.use('/api/comment', [require('./routers/comment')]);
app.use('/api/user', [require('./routers/user')]);
app.use('/api/like', [require('./routers/like')]);

// view path와 확장자는 ejs로 설정
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// 전체 게시글 목록 조회 페이지(메인 페이지)로 이동하기
app.get('/', async (req, res) => {
  // 작성순으로 내림차순 정렬
  try {
    const posts = await Post.find({}).sort({ _id: -1 });

    // 로그인한 유저 정보 가져오기
    const token = req.cookies.user;

    // 로그인 하지 않은 유저일 경우
    if (!token) {
      return res.render('main_page', {
        posts,
        userNickname: undefined,
        userID: undefined,
        postIDs: [],
      });
    }

    //token에서 userID 가져오기
    const { userID } = jwt.verify(token, SECRET_KEY);
    try {
      const user = await User.findOne({ userID: userID }, { _id: false });
      const userPressedLike = await Like.find(
        { userID: userID },
        { _id: false }
      );

      // 로그인 한 유저의 좋아요 누른 postID를 가져온다.
      const postIDs = userPressedLike.reduce((acc, value) => {
        acc.push(value.postID);
        return acc;
      }, []);

      return res.render('main_page', {
        posts,
        userNickname: user.userNickname,
        userID: user.userID,
        postIDs: postIDs,
      });
    } catch (error) {
      return res.render('main_page', {
        posts,
        userNickname: undefined,
        userID: undefined,
        postIDs: [],
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// 글 작성 페이지로 이동하기.
app.get('/write', authMiddleware, (req, res) => {
  const user = res.locals.user;
  res.render('write_page', { user });
});

// 게시글 조회 페이지로 이동하기
app.get('/detail/:postID', async (req, res) => {
  const { postID } = req.params;

  // 해당 포스트 내용 가져오기
  const detailPost = await Post.find({ postID: postID }, { _id: false });

  // 포스트에 해당하는 댓글들 가져오기.
  const detailComment = await Comment.find(
    { postID: postID },
    { _id: false }
  ).sort({ _id: -1 });

  // 로그인한 유저 정보 가져오기
  const token = req.cookies.user;

  // 로그인 하지 않은 유저일 경우
  if (!token) {
    return res.render('detail_page', {
      detailPost,
      detailComment,
      userNickname: undefined,
      postIDs: [],
    });
  }
  // 로그인 한 유저일 경우(로그인한 유저만 자기 자신의 댓글을 지울 수 있음.)
  const { userID } = jwt.verify(token, SECRET_KEY);
  try {
    const user = await User.findOne({ userID: userID }, { _id: false });
    const userPressedLike = await Like.find({ userID: userID }, { _id: false });

    // 로그인 한 유저의 좋아요 누른 postID를 가져온다.
    const postIDs = userPressedLike.reduce((acc, value) => {
      acc.push(value.postID);
      return acc;
    }, []);

    return res.render('detail_page', {
      detailPost,
      detailComment,
      userNickname: user.userNickname,
      postIDs: postIDs,
    });
  } catch (error) {
    return res.render('detail_page', {
      detailPost,
      detailComment,
      userNickname: undefined,
      postIDs: [],
    });
  }
});

// 게시글 수정 페이지로 이동하기
app.get('/modify/:postID', authMiddleware, async (req, res) => {
  const user = res.locals.user;

  const { postID } = req.params;
  const detailPost = await Post.find({ postID: postID }, { _id: false });
  res.render('modify_page', { detailPost, user });
});

// 로그인 페이지로 이동하기
app.get('/login', (req, res) => {
  res.render('login_page');
});

// 회원가입 페이지로 이동하기
app.get('/register', (req, res) => {
  res.render('signup_page');
});

// 해당포트로 서버와 연결하기
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
