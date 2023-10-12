require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routers/user-router');
const authRouter = require('./routers/auth-router');
const categoryRouter = require('./routers/category-router');
const itemRouter = require('./routers/item-router');
const viewsRouter = require('./routers/views-router');
const orderRouter = require('./routers/order-router');
const orderAdminRouter = require("./routers/orderAdmin-router");

// passport.js 를 쓰기 위한 require
// const session = require('express-session');
// const passport = require("passport");
const { MONGO_URI } = process.env;

// mongoose setting
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// express setting
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//루트에 api붙임
app.use(viewsRouter);
// passport
// app.use(passport.initialize());
// app.use(passport.session());

app.get("/", (req, res) => {
  res.send("main page");
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);
app.use('/api/item', itemRouter);
app.use('/api/order', orderRouter);
app.use('/api/admin', orderAdminRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});