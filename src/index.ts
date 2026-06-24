import express from 'express';
import healthRouter from './routes/health';
import getPeopleRouter from './routes/getPeople';
import { config } from 'dotenv';
import { connectRedis } from './redisClient';
import getCharacterRouter from './routes/getCharacter';
import loginRouter from './routes/login';
import logoutRouter from './routes/logout';
import tokenRefreshRouter from './routes/tokenRefresh';
import getFavoritesRouter from './routes/getFavorites';

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(healthRouter);
app.use(getPeopleRouter);
app.use(getCharacterRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(tokenRefreshRouter);
app.use(getFavoritesRouter);

async function start() {
  try {
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
