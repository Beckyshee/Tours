"use strict";
// tours.controller.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTour = exports.updateTour = exports.createTour = exports.getTours = void 0;
const dbHelper_1 = __importDefault(require("../helpers/dbHelper"));
const dbhelper = new dbHelper_1.default();
const getTours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield dbhelper.query('SELECT * FROM tours');
        res.json(results.recordset);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});
exports.getTours = getTours;
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
const createTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tourTitle, shortDescription, destination, duration, price, tourType } = req.body;
    try {
        const newTour = yield dbhelper.execute('sp_CreateTour', {
            tourTitle,
            shortDescription,
            destination,
            duration,
            price,
            tourType,
        });
        res.status(201).json(newTour);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createTour = createTour;
const updateTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { tourTitle, shortDescription, destination, duration, price, tourType } = req.body;
    try {
        const updatedTour = yield dbhelper.execute('sp_UpdateTour', {
            id,
            tourTitle,
            shortDescription,
            destination,
            duration,
            price,
            tourType,
        });
        res.json(updatedTour);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateTour = updateTour;
const deleteTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield dbhelper.execute('sp_DeleteTour', { id });
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteTour = deleteTour;
