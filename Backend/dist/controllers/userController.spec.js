"use strict";
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
const mssql_1 = __importDefault(require("mssql"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userControllers_1 = require("./userControllers");
describe("user registration", () => {
    it("successfully registers a user", () => __awaiter(void 0, void 0, void 0, function* () {
        let req = {
            body: {
                fullname: "Test Test",
                email: "test2@yopmail.com",
                phone_no: "0234567890",
                password: "hashedPassword123",
            },
        };
        let res = {
            status: jest.fn().mockReturnThis(), //to make our function chainable
            json: jest.fn() //mock function
        };
        // jest.mock('bcrypt', ()=>({
        //     hash: jest.fn().mockResolvedValue("hashedPassword_fvchh_fyyd")
        // }))
        //using spyOn
        jest.spyOn(bcrypt_1.default, 'hash').mockResolvedValueOnce("hashedPassword123");
        // jest.mock('uuid', ()=>({
        //     v4: jest.fn()
        // }))
        // const mockedV4 = jest.requireMock("uuid").v4;
        // mockedV4.mockImplementation(() => "uniqueid_ccgcuucvucv");
        // console.log(v4());
        const mockedInput = jest.fn().mockReturnThis();
        const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });
        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        };
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        };
        //method 1 using jest.mock
        // jest.mock('mssql',()=>({
        //     connect: jest.fn().mockResolvedValue(mockedPool)
        // }))
        //method 2 using jest.spyOn
        jest.spyOn(mssql_1.default, "connect").mockResolvedValue(mockedPool);
        yield (0, userControllers_1.registerUser)(req, res);
        //our assertions
        expect(res.json).toHaveBeenCalledWith({
            message: "User registered successfully",
        });
    }));
});
