"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerUserSchema = joi_1.default.object({
    fullname: joi_1.default.string(),
    email: joi_1.default.string().email(),
    phone_no: joi_1.default.string().min(10),
    password: joi_1.default.string(),
    role: joi_1.default.string()
});
