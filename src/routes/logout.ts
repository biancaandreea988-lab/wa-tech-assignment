import { Router } from 'express';

const logoutRouter = Router();

logoutRouter.post('/auth/logout', async (_req, res) => {
  res.sendStatus(204);
});

export default logoutRouter;
