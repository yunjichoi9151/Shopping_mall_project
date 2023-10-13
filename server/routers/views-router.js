const express = require('express');
const path = require('path');

const viewsRouter = express.Router();

viewsRouter.use('/', serveStatic('home'));
viewsRouter.use('/cart', serveStatic('cart'));
viewsRouter.use('/detail', serveStatic('detail'));
viewsRouter.use('/order', serveStatic('order'));
viewsRouter.use('/admin', serveStatic('admin'));
viewsRouter.use('/join', serveStatic('join'));
viewsRouter.use('/login', serveStatic('login'));
viewsRouter.use('/mypage', serveStatic('mypage'));
viewsRouter.use('/amino', categoryServeStatic('amino'));
viewsRouter.use('/carbohydrate', categoryServeStatic('carbohydrate'));
viewsRouter.use('/diet', categoryServeStatic('diet'));
viewsRouter.use('/fitness', categoryServeStatic('fitness'));
viewsRouter.use('/nutrients', categoryServeStatic('nutrients'));
viewsRouter.use('/protein', categoryServeStatic('protein'));
viewsRouter.use('/', serveStatic(''));

function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../../src/views/${resource}`);
  console.log(resourcePath);
  const option = { index: `${resource}.html` };
  return express.static(resourcePath, option);
}

function categoryServeStatic(resource) {
  const resourcePath = path.join(__dirname, '../../src/views/category');
  console.log(resourcePath);
  const option = { index: `${resource}.html` };
  return express.static(resourcePath, option);
}

module.exports = viewsRouter;
