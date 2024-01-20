import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validator'
// define collection
const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
  // CUSTOME MESSAGES ERRORS
  // tại sao validate thêm ở tầng model trong khi boardValidation đã validate ??
  title: Joi.string().required().min(3).max(50).trim().strict().messages({
    'any.required':'Title is required',
    'string.empty':'Title is not allowed to be empty',
    'string.min' : 'Title min 3 chars',
    'string.max' : 'Title max 50 chars',
    'string.trim' : 'Title must not have leading or trailing spaces'
  }),
  description: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  // array contain ids of columns for board
  columOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  // bảng ghi này đã bị xóa hay chưa ? true or false
  _destroy: Joi.boolean().default(false)
})


const createdNew = async (data) => {
  try {
    // const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(data)
    return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(data)
    // return về service
  } catch (error) { throw new Error(error) }
}
const fineOneById = async (id) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
      _id : new ObjectId(id)
    })
    return result
  } catch (error) { throw new Error(error) }
}
const getDetails = async (id) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
      _id : new ObjectId(id)
    })
    return result
  } catch (error) {
    // throw new Error(error)
  }
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createdNew,
  fineOneById,
  getDetails
}
