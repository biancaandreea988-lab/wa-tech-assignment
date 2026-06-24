import axios from 'axios';
import { Request, Response, Router } from 'express';
import { format } from 'date-fns';
import { checkParam } from '../helpers/checkParam';

const getCharacterRouter = Router();

export const getCharacterHandler = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!checkParam(id)) {
      return res.status(400).json({ error: 'Invalid character id' });
    }

    const { data } = await axios.get(
      `${process.env.SWAPI_API_BASE}/people/${id}`,
    );

    return res.json({
      name: data.name,
      height: data.height ? +data.height / 100 : 0,
      mass: data.mass,
      birth_year: data.birth_year,
      number_of_films: data.films?.length,
      date_added: format(new Date(data.created), 'dd.MM.yyyy'),
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return res.status(error.response?.status ?? 502).json({
        error: 'External API failed',
      });
    }

    return res.status(500).json({
      error: 'Unexpected server error',
    });
  }
};

getCharacterRouter.get('/people/:id', getCharacterHandler);
export default getCharacterRouter;
