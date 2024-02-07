import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validator'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
// Define Collection (name & schema)
const COLUMN_COLLECTION_NAME = 'columns'
const COLUMN_COLLECTION_SCHEMA = Joi.object({
  // ObjectId("507f191e810c19729de860ea").toString()
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),

  // Lưu ý các item trong mảng cardOrderIds là ObjectId nên cần thêm pattern cho chuẩn nhé, (lúc quay video số 57 mình quên nhưng sang đầu video số 58 sẽ có nhắc lại về cái này.)
  cardOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})
const validateBeforeCreate = async (data) => {
  return await COLUMN_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: true })
}
const createdNew = async (data) => {
  try {
    // const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(data)
    const validData = await validateBeforeCreate(data)
    // Convert string of boardId to ObjectId
    const newColumnToAdd = {
      ...validData,
      boardId: new ObjectId(validData.boardId)
    }
    // If do not collection in database -> Collection Column will be generated
    return await GET_DB().collection(COLUMN_COLLECTION_NAME).insertOne(newColumnToAdd)
    // return về service
  } catch (error) { throw new Error(error) }
}
const fineOneById = async (id) => {
  try {
    const result = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOne({
      _id : new ObjectId(id)
    })
    return result
  } catch (error) { throw new Error(error) }
}
const pushCardOrderIds = async (card) => {
  try {
    const result = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOneAndUpdate(
      // Find the board containing this column
      { _id: new ObjectId(card.columnId) },
      // Push the ID of this column into columnOrderIds of the board
      { $push: { cardOrderIds: new ObjectId(card._id) } },
      // Use returnDocument('after') to return the updated board after the push
      // Use returnDocument('before') to return the original board
      { returnDocument: 'after' }
    )

    // findOneAndUpdate must return result.value
    return result.value
  } catch (error) {
    // Provide a more specific error message
    console.error('Error pushing cardOrderIds:', error.message)
    throw new Error('Error pushing cardOrderIds', 500)
  }
}
const deleteColumnById = async (columnId) => {
  try {
    const result = await GET_DB().collection(COLUMN_COLLECTION_NAME).deleteOne({
      _id : new ObjectId(columnId)
    })
    console.log('Result delete in column model', result)
    return result
  } catch (error) { console.error('Error deleting column:', error)
    throw new Error(error) }
}
export const columnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  createdNew,
  fineOneById,
  pushCardOrderIds,
  deleteColumnById
}