// import Joi from 'joi'
// import { StatusCodes } from 'http-status-codes'
// import ApiError from '~/utils/ApiError'
// import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validator'

// const createNew = async (req, res, next ) => {
//   const correctCondition = Joi.object({
//     // CUSTOME MESSAGES
//     imagesId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
//     images: Joi.string().allow('').min(0).max(500).trim()
//   })
//   try {
//     await correctCondition.validateAsync(req.body, { abortEarly: false })
//   } catch (error) {
//     next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error.message)))
//   }
// }
// export const imageValidation = {
//   createNew
// }