import express from 'express';
import {
  categoryRouter,
  itemRouter,
  orderRouter,
  userRouter,
  viewsRouter,
} from '../server/routers';

const app = express();
console.log('hey');
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(viewsRouter);

app.use('/api/categories', categoryRouter);
app.use('/api/items', itemRouter);
app.use('/api/orders', orderRouter);
app.use('/api/users', userRouter);

export { app };
