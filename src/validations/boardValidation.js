import Joi from 'joi'
import { StatusCodes } from 'http-status-codes';

const createNew = async (req , res , next ) => {
    const correctCondition = Joi.object({
        // CUSTOME MESSAGES
        title: Joi.string().required().min(3).max(50).trim().strict().messages({
            'any.required':'Title is required',
            'string.empty':'Title is not allowed to be empty',
            'string.min' : 'Title min 3 chars',
            'string.max' : 'Title max 50 chars',
            'string.trim' : 'Title must not have leading or trailing spaces'
        }),
        description: Joi.string().required().min(3).max(50).trim().strict(),   
    }) 
    try {
    console.log(req.body);
    // abortEarly: false -> See if validation stops early or not -> return multiple errors
    await correctCondition.validateAsync(req.body, { abortEarly: false})
    next()
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            // just get string error message
            errors: new Error(error).message
        })
    }
}        
export const boardValidation = {
    createNew
}