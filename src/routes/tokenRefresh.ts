import { Router } from 'express';

const tokenRefreshRouter = Router();

tokenRefreshRouter.post('/auth/refresh', async (_req, res) => {
  res.json({
    accessToken: 'fake-access-token',
  });
});

export default tokenRefreshRouter;
