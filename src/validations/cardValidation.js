import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validator'

const createNew = async (req, res, next ) => {
  const correctCondition = Joi.object({
    // CUSTOME MESSAGES
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    // kiểu dữ liệu chỉ muốn public và private -> khác thì lỗi lun
    title: Joi.string().required().min(2).max(50).strict(),
    // Allow an empty string for description
    description: Joi.string().allow('').min(0).max(50).trim(),
    // images: Joi.string().allow('').min(0).max(50).trim()
    images: Joi.array().items(Joi.string()).allow().optional()
  })
  try {
    // abortEarly: false -> the validation process will collect all validation errors in the data, instead of stopping at the first encountered error
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // next to Controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error.message)))
  }
}
export const cardValidation = {
  createNew
}