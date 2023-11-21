import { Request, Response } from "express";
import mssql from "mssql";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import { sqlConfig } from "../config/sqlConfig";
import jwt from "jsonwebtoken";
// import dotenv from 'dotenv'
import { LoginUser, User } from "../interfaces/user";
import { ExtendedUser } from "../middleware/verifyToken";
import Connection from "../helpers/dbHelper";
import { registerUserSchema } from "../validation/userValidators";
import { isEmpty } from "lodash";
import { execute } from "../helpers/databaseHelper";
import { generateToken } from "../helpers/generateToken";

const dbhelper = new Connection();

export const registerUser = async (req: Request, res: Response) => {
  try {
    let { fullname, email, phone_no, password } = req.body;

    let { error } = registerUserSchema.validate(req.body);

    if (error) {
      return res.status(404).json({ error: error.details });
    }

    const emailTaken = (
      await dbhelper.query(`SELECT * FROM Users WHERE email = '${email}'`)
    ).recordset;

    console.log("becky");
    const phonenoTaken = (
      await dbhelper.query(`SELECT * FROM Users WHERE phone_no = '${phone_no}'`)
    ).recordset;
    // const id_no_Taken = (await dbhelper.query(`SELECT * FROM Users WHERE id_no = '${id_no}'`)).recordset

    if (!isEmpty(emailTaken)) {
      return res.json({ error: "This email is already in use" });
    }
    if (!isEmpty(phonenoTaken)) {
      return res.json({ error: "This phone number is taken" });
    }
    // if(!isEmpty(id_no_Taken)){
    //     return res.json({error: "This ID number is taken"})
    // }

    let UserID = v4();

    const hashedPwd = await bcrypt.hash(password, 5);

    // const pool = await mssql.connect(sqlConfig)

    let result = dbhelper.execute("registerUser", {
      UserID,
      fullname,
      email,
      phone_no,
      password: hashedPwd,
    });

    console.log(result);

    return res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const procedureName = "getUserByEmail";
    const params = {
      email,
    };

    const result = await execute(procedureName, params);

    if (result) {
      //   console.log(result);

      const recordset = result.recordset;
      const user = recordset[0];

      if (!user) {
        return res.send("User Does not exist");
      }

      const CorrectPwd = await bcrypt.compare(password, user.password);

      if (!CorrectPwd) {
        return res.status(401).json({
          error: "Wrong password",
        });
      }

      const token = generateToken(
        user.UserID,
        user.fullname,
        user.role,
        user.email
      );

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
    } else {
      return res.json({
        error: "Account not Found",
      });
    }
  } catch (error) {
    console.log(error);

    return res.json({
      error: error,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);

    let users = (await pool.request().execute("fetchAllUsers")).recordset;
    // let users = (await pool.request().query('SELECT * FROM Users')).recordset

    return res.status(200).json({
      users: users,
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};
export const getOneUser = async (req: Request, res: Response) => {
  try {
    let UserID = req.params.UserID;

    const pool = await mssql.connect(sqlConfig);

    let user = (
      await pool.request().input("UserID", UserID).execute("fetchOneUsers")
    ).recordset;
    // let Users = (await pool.request().query('SELECT * FROM Users')).recordset

    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export const checkUserDetails = async (req: ExtendedUser, res: Response) => {
  if (req.info) {
    return res.json({
      info: req.info,
    });
  }
};
