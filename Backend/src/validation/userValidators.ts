import joi from 'joi'

export const registerUserSchema = joi.object({
        name: joi.string(),
        email : joi.string().email(),
        phone_no: joi.string().min(10),
        password: joi.string()
})