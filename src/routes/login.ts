import { Router } from 'express';

const loginRouter = Router();

loginRouter.post('/auth/login', async (_req, res) => {
  res.json({
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
    user: { id: 1, name: 'Bianca' },
  });
});

export default loginRouter;
