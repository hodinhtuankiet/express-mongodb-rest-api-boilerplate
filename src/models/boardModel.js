import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validator'
import { BOARDS_TYPES } from '~/utils/constants'
import { columnModel } from './columnModel'
import { cardModel } from './cardModel'
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
  type: Joi.string().valid(BOARDS_TYPES.PUBLIC, BOARDS_TYPES.PRIVATE).required(),

  // array contain ids of columns for board
  columOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  // bảng ghi này đã bị xóa hay chưa ? true or false
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: true })
}

const createdNew = async (data) => {
  try {
    // const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(data)
    const validData = await validateBeforeCreate(data)
    return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
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
    // const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id : new ObjectId(id) })

    // aggregate nhận vào một mảng , query tổng hợp (nhiều điều kiện)
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
      { $match:{
        // tìm một bảng ghi với id này , điều kiện destroy là false
        _id : new ObjectId(id),
        _destroy : false
      } },
      { $lookup: {
        from: columnModel.COLUMN_COLLECTION_NAME,
        // collection hiện tại của chúng ta
        localField: '_id',
        // khóa ngoại
        foreignField: 'boardId',
        // collection board chạy sang column để tìm boardId = _id của board
        as: 'columns'
      } },
      { $lookup: {
        from: cardModel.CARD_COLLECTION_NAME,
        // collection hiện tại của chúng ta
        localField: '_id',
        // khóa ngoại
        foreignField: 'boardId',
        // collection column chạy sang cards để tìm boardId = _id của column
        as: 'cards'
      } }
    ]).toArray()
    console.log(result)
    // nếu có dữ liệu thì lấy phần tử đầu
    return result[0] || {}
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
