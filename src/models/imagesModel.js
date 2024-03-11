import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validator'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
// Define Collection (name & schema)
const CARD_COLLECTION_NAME = 'images'
const CARD_COLLECTION_SCHEMA = Joi.object({
  // regex
  images: Joi.string().allow('').optional(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})
const validateBeforeCreate = async (data) => {
  return await CARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: true })
}
const createdNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const newCardToAdd = {
      ...validData,
      images: validData.images
    }
    const result = await GET_DB().collection(CARD_COLLECTION_NAME).insertOne(newCardToAdd)
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const fineOneById = async (id) => {
  try {
    const result = await GET_DB().collection(CARD_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    // Check if the document was found
    if (result) {
      return result
    } else {
      throw new Error('No card found with the specified ID')
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const imagesModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createdNew,
  fineOneById,
}