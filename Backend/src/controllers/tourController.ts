// tours.controller.ts

import { Request, Response } from 'express';
import Connection from '../helpers/dbHelper';

const dbhelper = new Connection();

export const getTours = async (req: Request, res: Response) => {
  try {
    const results = await dbhelper.query('SELECT * FROM tours');
    res.json(results.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

// export const getTourById = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const results = await dbhelper.query('SELECT * FROM tours WHERE tourid = @id', {
//       id: +id, //CAUSING ERRORS
//     });
//     res.json(results);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

export const createTour = async (req: Request, res: Response) => {
  const { tourTitle, shortDescription, destination, duration, price, tourType } = req.body;

  try {
    const newTour = await dbhelper.execute('sp_CreateTour', {
      tourTitle,
      shortDescription,
      destination,
      duration,
      price,
      tourType,
    });
    
    res.status(201).json(newTour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateTour = async (req: Request, res: Response) => {
  
  const {  TourID } = req.params;
  const {tourTitle, shortDescription, Destination, Duration, Price, tourType } = req.body;
  

  try {
    const updatedTour = await dbhelper.execute('sp_UpdateTour', {
      TourID,
      tourTitle,
      shortDescription,
      Destination,
      Duration,
      Price,
      tourType,
    });
    console.log(updatedTour)

    res.json(updatedTour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

export const deleteTour = async (req: Request, res: Response) => {
  const { TourID } = req.params;

  try {
    await dbhelper.execute('sp_DeleteTour', { TourID });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
