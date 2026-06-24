import axios from 'axios';
import { Router } from 'express';
import redisClient from '../redisClient';
import { checkParam } from '../helpers/checkParam';

const getPeopleRouter = Router();

getPeopleRouter.get('/people', async (req, res) => {
  try {
    const page = Number(req.query.page);
    if (!checkParam(page)) {
      return res.status(400).json({ error: 'Invalid page number' });
    }

    const peopleRedis = await redisClient.get(`people:${page}`);
    if (peopleRedis) {
      console.log(`got people page ${page} from redis`);
      return res.json(JSON.parse(peopleRedis));
    }

    const { data } = await axios.get(`${process.env.SWAPI_API_BASE}/people`, {
      params: { page },
    });

    await redisClient.setEx(`people:${page}`, 60 * 15, JSON.stringify(data));
    res.json({ data });
  } catch (error) {
    console.log(`Error getting people: ${error}`);
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 502;

      return res.status(status).json({
        error: 'External API failed',
      });
    }

    return res.status(500).json({
      error: 'Unexpected server error',
    });
  }
});

export default getPeopleRouter;
