"use strict";
// review.controller.ts
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
exports.deleteReview = exports.updateReview = exports.createReview = void 0;
const dbHelper_1 = __importDefault(require("../helpers/dbHelper"));
const dbhelper = new dbHelper_1.default();
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
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { UserID, TourID, rating, comment } = req.body;
    try {
        const newReview = yield dbhelper.execute('sp_CreateReview', {
            UserID,
            TourID,
            rating,
            comment,
        });
        res.status(201).json(newReview);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createReview = createReview;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ReviewID } = req.params;
    const { rating, comment } = req.body;
    try {
        const updatedReview = yield dbhelper.execute('sp_UpdateReview', {
            ReviewID,
            rating,
            comment,
        });
        res.json(updatedReview);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateReview = updateReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ReviewID } = req.params;
    try {
        yield dbhelper.execute('sp_DeleteReview', { ReviewID });
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteReview = deleteReview;
