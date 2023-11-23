import mssql from 'mssql'
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import { registerUser } from './userControllers';
import { Request, Response } from 'express';

describe("user registration", ()=>{
    it("successfully registers a user", async()=>{
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
            json: jest.fn()//mock function
        }

        // jest.mock('bcrypt', ()=>({
        //     hash: jest.fn().mockResolvedValue("hashedPassword_fvchh_fyyd")
        // }))

        //using spyOn
        jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce("hashedPassword123" as never)

        // jest.mock('uuid', ()=>({
        //     v4: jest.fn()
        // }))

        // const mockedV4 = jest.requireMock("uuid").v4;
        // mockedV4.mockImplementation(() => "uniqueid_ccgcuucvucv");
        // console.log(v4());

        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        //method 1 using jest.mock
        // jest.mock('mssql',()=>({
        //     connect: jest.fn().mockResolvedValue(mockedPool)
        // }))

        //method 2 using jest.spyOn
        jest.spyOn(mssql, "connect").mockResolvedValue(mockedPool as never);


        await registerUser(req as Request, res as any)

        //our assertions
        expect(res.json).toHaveBeenCalledWith({
          message: "User registered successfully",
        });
    });
})
