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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbHelper_1 = __importDefault(require("../helpers/dbHelper"));
const userValidators_1 = require("../validation/userValidators");
const lodash_1 = require("lodash");
const dbhelper = new dbHelper_1.default;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { fullname, email, phone_number, password } = req.body;
        let { error } = userValidators_1.registerUserSchema.validate(req.body);
        if (error) {
            return res.status(404).json({ error: error.details });
        }
        const emailTaken = (yield dbhelper.query(`SELECT * FROM Users WHERE email = '${email}'`)).recordset;
        const phonenoTaken = (yield dbhelper.query(`SELECT * FROM Users WHERE phone_no = '${phone_number}'`)).recordset;
        // const id_no_Taken = (await dbhelper.query(`SELECT * FROM Employees WHERE id_no = '${id_no}'`)).recordset
        if (!(0, lodash_1.isEmpty)(emailTaken)) {
            return res.json({ error: "This email is already in use" });
        }
        if (!(0, lodash_1.isEmpty)(phonenoTaken)) {
            return res.json({ error: "This phone number is taken" });
        }
        // if(!isEmpty(id_no_Taken)){
        //     return res.json({error: "This ID number is taken"})
        // }
        let employee_id = (0, uuid_1.v4)();
        const hashedPwd = yield bcrypt_1.default.hash(password, 5);
        // const pool = await mssql.connect(sqlConfig)
        let result = dbhelper.execute('registerEmployee', {
            employee_id, fullname, email, phone_number, password: hashedPwd
        });
        console.log(result);
        return res.status(200).json({
            message: 'User registered successfully'
        });
    }
    catch (error) {
        return res.json({
            error: error
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { email, password } = req.body;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let user = yield (yield pool.request().input("email", email).input("password", password).execute('loginEmployee')).recordset;
        if (((_a = user[0]) === null || _a === void 0 ? void 0 : _a.email) == email) {
            const CorrectPwd = yield bcrypt_1.default.compare(password, (_b = user[0]) === null || _b === void 0 ? void 0 : _b.password);
            if (!CorrectPwd) {
                return res.status(401).json({
                    error: "Wrong password"
                });
            }
            const LoginCredentials = user.map(records => {
                const { phone_number } = records, rest = __rest(records, ["phone_number"]);
                return rest;
            });
            console.log(LoginCredentials);
            // dotenv.config()
            const token = jsonwebtoken_1.default.sign(LoginCredentials[0], process.env.SECRET, {
                expiresIn: '3000s'
            });
            return res.status(200).json({
                message: "Logged in successfully", token
            });
        }
        else {
            return res.json({
                error: "Email not found"
            });
        }
    }
    catch (error) {
        return res.json({
            error: error
        });
    }
});
exports.loginUser = loginUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let users = (yield pool.request().execute('fetchAllUsers')).recordset;
        // let users = (await pool.request().query('SELECT * FROM Employees')).recordset
        return res.status(200).json({
            users: users
        });
    }
    catch (error) {
        return res.json({
            error: error
        });
    }
});
exports.getAllUsers = getAllUsers;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.params.id;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let employee = (yield pool.request().input('employee_id', id).execute('fetchOneEmployee')).recordset;
        // let employees = (await pool.request().query('SELECT * FROM Employees')).recordset
        return res.status(200).json({
            employee: employee
        });
    }
    catch (error) {
        return res.json({
            error: error
        });
    }
});
exports.getOneUser = getOneUser;
const checkUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        return res.json({
            info: req.info
        });
    }
});
exports.checkUserDetails = checkUserDetails;
