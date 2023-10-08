import express from 'express';
import path from 'path';

const viewsRouter = express.Router();

viewsRouter.use('/', serveStatic('home'));
viewsRouter.use('/cart', serveStatic('cart'));
viewsRouter.use('/detail', serveStatic('detail'));
viewsRouter.use('/order', serveStatic('order'));

// viewsRouter.use('/', serveStatic(''));

function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../../src/views/${resource}`);
  console.log(resourcePath);
  const option = { index: `${resource}.html` };
  return express.static(resourcePath, option);
}

export { viewsRouter };
