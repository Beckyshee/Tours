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
const databaseHelper_1 = require("../helpers/databaseHelper");
const uuid_1 = require("uuid");
const dbhelper = new dbHelper_1.default();
const getTours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield dbhelper.query("SELECT * FROM tours");
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
    const { tourImage, tourTitle, shortDescription, Destination, Duration, Price, tourType, } = req.body;
    console.log(req.body);
    try {
        const newTour = yield (0, databaseHelper_1.execute)("sp_CreateTour", {
            TourID: (0, uuid_1.v4)(),
            tourTitle,
            shortDescription,
            Destination,
            Duration,
            Price,
            tourType,
            tourImage,
        });
        res.status(201).json(newTour);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createTour = createTour;
const updateTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { TourID } = req.params;
    const { tourImage, tourTitle, shortDescription, Destination, Duration, Price, tourType, } = req.body;
    try {
        const updatedTour = yield dbhelper.execute("sp_UpdateTour", {
            tourImage,
            TourID,
            tourTitle,
            shortDescription,
            Destination,
            Duration,
            Price,
            tourType,
        });
        console.log(updatedTour);
        res.json(updatedTour);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});
exports.updateTour = updateTour;
const deleteTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { TourID } = req.params;
    try {
        yield dbhelper.execute("sp_DeleteTour", { TourID });
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteTour = deleteTour;
