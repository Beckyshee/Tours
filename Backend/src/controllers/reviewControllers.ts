// review.controller.ts

import { Request, Response } from 'express';
import Connection from '../helpers/dbHelper';

const dbhelper = new Connection();

// export const getReviewsByTourId = async (req: Request, res: Response) => {
//   const { tourId } = req.params;

//   try {
//     const results = await dbhelper.query('SELECT * FROM reviews WHERE tourid = @tourId', {
//       tourId: +tourId, // ERROR HERE
//     });
//     res.json(results);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

export const createReview = async (req: Request, res: Response) => {
  const { userId, tourId, rating, comment } = req.body;

  try {
    const newReview = await dbhelper.execute('sp_CreateReview', {
      userId,
      tourId,
      rating,
      comment,
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const updatedReview = await dbhelper.execute('sp_UpdateReview', {
      id,
      rating,
      comment,
    });

    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await dbhelper.execute('sp_DeleteReview', { id });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
