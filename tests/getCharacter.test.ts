import axios from 'axios';
import { getCharacterHandler } from '../src/routes/getCharacter';

jest.mock('axios');

const mockReq = (id: any) =>
  ({
    params: { id },
  }) as any;

const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

test('returns 400 for invalid id', async () => {
  const req = mockReq('abc');
  const res = mockRes();

  await getCharacterHandler(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    error: 'Invalid character id',
  });
});

test('handles axios error', async () => {
  jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);
  (axios.get as jest.Mock).mockRejectedValue({
    isAxiosError: true,
    response: { status: 404 },
  });

  const req = mockReq(1);
  const res = mockRes();

  await getCharacterHandler(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({
    error: 'External API failed',
  });
});

test('returns character data', async () => {
  (axios.get as jest.Mock).mockResolvedValue({
    data: {
      name: 'Luke',
      height: '180',
      mass: '80',
      birth_year: '19BBY',
      films: [1, 2],
      created: '2020-01-01T00:00:00.000Z',
    },
  });

  const req = mockReq(1);
  const res = mockRes();

  await getCharacterHandler(req, res);

  expect(res.json).toHaveBeenCalled();
});
