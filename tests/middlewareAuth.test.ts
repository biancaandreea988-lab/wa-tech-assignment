import { authMiddleware } from '../src/routes/middleware/authMiddleware';

test('authMiddleware returns 401 if no token', () => {
  const req = { headers: {} };
  const res = {
    sendStatus: jest.fn(),
  };
  const next = jest.fn();

  authMiddleware(req as any, res as any, next);

  expect(res.sendStatus).toHaveBeenCalledWith(401);
  expect(next).not.toHaveBeenCalled();
});

test('authMiddleware calls next if token valid', () => {
  const req = {
    headers: {
      authorization: 'fake-access-token',
    },
  };

  const res = {
    sendStatus: jest.fn(),
  };

  const next = jest.fn();

  authMiddleware(req as any, res as any, next);

  expect(next).toHaveBeenCalled();
});
