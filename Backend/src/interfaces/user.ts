import { Request } from "express";

export interface User{
    fullname:string,
    email: string,
    UserID: string,
    role : string,
    phone_no: string
}

export interface LoginUser extends Request{
    email: string,
    password: string
}