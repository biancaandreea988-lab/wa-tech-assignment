import { Router } from 'express';
import { authMiddleware } from './middleware/authMiddleware';

const getFavoritesRouter = Router();

getFavoritesRouter.get('/favorites', authMiddleware, (_req, res) => {
  res.json([
    {
      name: 'Sebulba',
      height: 1.12,
      mass: '40',
      birth_year: 'unknown',
      number_of_films: 1,
      date_added: '19.12.2014',
    },
    {
      name: 'Darth Vader',
      height: 2.02,
      mass: '136',
      birth_year: '41.9BBY',
      number_of_films: 4,
      date_added: '10.12.2014',
    },
    {
      name: 'Wat Tambor',
      height: 1.93,
      mass: '48',
      birth_year: 'unknown',
      number_of_films: 1,
      date_added: '20.12.2014',
    },
  ]);
});

export default getFavoritesRouter;
