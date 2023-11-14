import { Request } from "express";

export interface User{
    fullname:string,
    email: string,
    employee_id: string,
    role : string
}

export interface LoginUser extends Request{
    email: string,
    password: string
}