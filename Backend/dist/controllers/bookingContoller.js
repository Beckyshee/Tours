"use strict";
// booking.controller.ts
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
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBookings = void 0;
const dbHelper_1 = __importDefault(require("../helpers/dbHelper"));
const dbhelper = new dbHelper_1.default();
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield dbhelper.query('SELECT * FROM bookings');
        res.json(results);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getBookings = getBookings;
// export const getBookingById = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const results = await dbhelper.query('SELECT * FROM bookings WHERE bookingid = @id', {
//       id: +id, // CAUSING ERRORS
//     });
//     res.json(results);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { UserID, TourID, bookingDate } = req.body;
    try {
        const newBooking = yield dbhelper.execute('sp_CreateBooking', {
            UserID,
            TourID,
            bookingDate,
        });
        res.status(201).json(newBooking);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createBooking = createBooking;
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { BookingID } = req.params;
    const { userId, tourId, bookingDate } = req.body;
    try {
        const updatedBooking = yield dbhelper.execute('sp_UpdateBooking', {
            BookingID,
            userId,
            tourId,
            bookingDate,
        });
        res.json(updatedBooking);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateBooking = updateBooking;
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { BookingID } = req.params;
    try {
        yield dbhelper.execute('sp_DeleteBooking', { BookingID });
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteBooking = deleteBooking;
