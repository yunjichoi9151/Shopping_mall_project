require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routers/user-router');
const categoryRouter = require('./routers/category-router');
const itemRouter = require('./routers/item-router');
const viewsRouter = require('./routers/views-router');
// passport.js 를 쓰기 위한 require
const session = require('express-session');
const passport = require('passport');
// orderRouter추가
const orderRouter = require('./routers/order-router');
//orderAdmin추가
const orderAdminRouter = require('./routers/orderAdmin-router');
const { MONGO_URI } = process.env;
// 로그인이 필수로 필요한 페이지에 middleware 작성할 예정
const loginRequired = require('./middlewares/login-required');

// mongoose settings (4)
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// express 기본 세팅 (1)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(viewsRouter);
// passport
// app.use(passport.initialize());
// app.use(passport.session());

//루트에 api붙임
app.get('/', (req, res) => {
  res.send('main page');
});

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/item', itemRouter);
app.use('/api/order', orderRouter);
app.use('/api/admin', orderAdminRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
