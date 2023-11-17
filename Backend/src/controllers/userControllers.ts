import { Request, Response } from 'express'
import mssql from 'mssql'
import {v4} from 'uuid'
import bcrypt from 'bcrypt'
import { sqlConfig } from '../config/sqlConfig'
import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'
import { LoginUser } from '../interfaces/user'
import { ExtendedUser } from '../middleware/verifyToken'
import Connection from '../helpers/dbHelper'
import { registerUserSchema } from '../validation/userValidators'
import { isEmpty } from 'lodash'

const dbhelper = new Connection
 
export const registerUser = async(req:Request, res: Response) =>{
    try {
        let {fullname, email, phone_number,  password} = req.body

        let {error} = registerUserSchema.validate(req.body)

        if(error){
            return res.status(404).json({error: error.details})
        }

        const emailTaken = (await dbhelper.query(`SELECT * FROM Users WHERE email = '${email}'`)).recordset
        const phonenoTaken = (await dbhelper.query(`SELECT * FROM Users WHERE phone_no = '${phone_number}'`)).recordset
        // const id_no_Taken = (await dbhelper.query(`SELECT * FROM Users WHERE id_no = '${id_no}'`)).recordset
      

        if(!isEmpty(emailTaken)){
            return res.json({error: "This email is already in use"})
        }
        if(!isEmpty(phonenoTaken)){
            return res.json({error: "This phone number is taken"})
        }
        // if(!isEmpty(id_no_Taken)){
        //     return res.json({error: "This ID number is taken"})
        // }
        

        let UserID = v4()

        const hashedPwd = await bcrypt.hash(password, 5)

        // const pool = await mssql.connect(sqlConfig)

        
        
        let result = dbhelper.execute('registerUser', {
            UserID, fullname, email, phone_number, password: hashedPwd
        })
        
        console.log(result);

        return res.status(200).json({
            message: 'User registered successfully'
        })
        
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export const loginUser = async(req:Request, res: Response) =>{
    try {
        const {email, password} = req.body

        const pool = await mssql.connect(sqlConfig)

        let user = await (await pool.request().input("email", email).input("password", password).execute('loginUser')).recordset
        
        if(user[0]?.email  == email){
            const CorrectPwd = await bcrypt.compare(password, user[0]?.password)

            if(!CorrectPwd){
                return res.status(401).json({
                    error: "Wrong password"
                })
            }

            const LoginCredentials = user.map(records =>{
                const {phone_number, ...rest}=records

                return rest
            })

            console.log(LoginCredentials);

            // dotenv.config()
            const token = jwt.sign(LoginCredentials[0], process.env.SECRET as string, {
                expiresIn: '3000s'
            }) 

            return res.status(200).json({
                message: "Logged in successfully", token
            })
            
        }else{
            return res.json({
                error: "Email not found"
            })
        }

    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export const getAllUsers = async(req:Request, res:Response)=>{
    try {

        const pool = await mssql.connect(sqlConfig)

        let users = (await pool.request().execute('fetchAllUsers')).recordset
        // let users = (await pool.request().query('SELECT * FROM Users')).recordset

        return res.status(200).json({
           users:users 
        })
        
    } catch (error) {
        return res.json({
            error: error
        })
    }
}
export const getOneUser = async(req:Request, res:Response)=>{
    try {

        let UserID = req.params.UserID

        const pool = await mssql.connect(sqlConfig)

        let user = (await pool.request().input('UserID',UserID).execute('fetchOneUsers')).recordset
        // let Users = (await pool.request().query('SELECT * FROM Users')).recordset

        return res.status(200).json({
            user: user
        })
        
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export const checkUserDetails = async (req:ExtendedUser, res:Response)=>{
    
    if(req.info){

        return res.json({
            info: req.info 
        })
    }
    
}