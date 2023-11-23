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
exports.checkUserDetails = exports.getOneUser = exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sqlConfig_1 = require("../config/sqlConfig");
const dbHelper_1 = __importDefault(require("../helpers/dbHelper"));
const userValidators_1 = require("../validation/userValidators");
const lodash_1 = require("lodash");
const databaseHelper_1 = require("../helpers/databaseHelper");
const generateToken_1 = require("../helpers/generateToken");
const dbhelper = new dbHelper_1.default();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { fullname, email, phone_no, password } = req.body;
        let { error } = userValidators_1.registerUserSchema.validate(req.body);
        if (error) {
            return res.status(404).json({ error: error.details });
        }
        const emailTaken = (yield dbhelper.query(`SELECT * FROM Users WHERE email = '${email}'`)).recordset;
        console.log("becky");
        const phonenoTaken = (yield dbhelper.query(`SELECT * FROM Users WHERE phone_no = '${phone_no}'`)).recordset;
        // const id_no_Taken = (await dbhelper.query(`SELECT * FROM Users WHERE id_no = '${id_no}'`)).recordset
        if (!(0, lodash_1.isEmpty)(emailTaken)) {
            return res.json({ error: "This email is already in use" });
        }
        if (!(0, lodash_1.isEmpty)(phonenoTaken)) {
            return res.json({ error: "This phone number is taken" });
        }
        // if(!isEmpty(id_no_Taken)){
        //     return res.json({error: "This ID number is taken"})
        // }
        let UserID = (0, uuid_1.v4)();
        const hashedPwd = yield bcrypt_1.default.hash(password, 5);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let result = yield pool
            .request()
            .input("UserID", mssql_1.default.VarChar, UserID)
            .input("fullname", mssql_1.default.VarChar, fullname)
            .input("email", mssql_1.default.VarChar, email)
            .input("phone_no", mssql_1.default.VarChar, phone_no)
            .input("password", mssql_1.default.VarChar, hashedPwd)
            .execute("registerUser");
        // let result = dbhelper.execute("registerUser", {
        //   UserID,
        //   fullname,
        //   email,
        //   phone_no,
        //   password: hashedPwd,
        // });
        // console.log(result);
        return res.status(200).json({
            message: "User registered successfully",
        });
    }
    catch (error) {
        return res.json({
            error: error,
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const procedureName = "getUserByEmail";
        const params = {
            email,
        };
        const result = yield (0, databaseHelper_1.execute)(procedureName, params);
        if (result) {
            //   console.log(result);
            const recordset = result.recordset;
            const user = recordset[0];
            if (!user) {
                return res.send("User Does not exist");
            }
            const CorrectPwd = yield bcrypt_1.default.compare(password, user.password);
            if (!CorrectPwd) {
                return res.status(401).json({
                    error: "Wrong password",
                });
            }
            const token = (0, generateToken_1.generateToken)(user.UserID, user.fullname, user.role, user.email);
            return res.status(200).json({
                message: "Logged in successfully",
                token,
                user: {
                    fullname: user.fullname,
                    role: user.role,
                    email: user.email,
                    UserID: user.UserID,
                },
            });
        }
        else {
            return res.json({
                error: "Account not Found",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.json({
            error: error,
        });
    }
});
exports.loginUser = loginUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let users = (yield pool.request().execute("fetchAllUsers")).recordset;
        // let users = (await pool.request().query('SELECT * FROM Users')).recordset
        return res.status(200).json({
            users: users,
        });
    }
    catch (error) {
        return res.json({
            error: error,
        });
    }
});
exports.getAllUsers = getAllUsers;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let UserID = req.params.UserID;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let user = (yield pool.request().input("UserID", UserID).execute("fetchOneUsers")).recordset;
        // let Users = (await pool.request().query('SELECT * FROM Users')).recordset
        return res.status(200).json({
            user: user,
        });
    }
    catch (error) {
        return res.json({
            error: error,
        });
    }
});
exports.getOneUser = getOneUser;
const checkUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        return res.json({
            info: req.info,
        });
    }
});
exports.checkUserDetails = checkUserDetails;
