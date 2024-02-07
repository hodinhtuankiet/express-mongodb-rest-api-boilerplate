import ApiError from '~/utils/ApiError'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    const { images, ...otherFields } = reqBody

    const imageBuffers = Array.isArray(images)
      ? images.map((base64Image) => Buffer.from(base64Image, 'base64'))
      : []

    const newCard = {
      ...otherFields,
      images: imageBuffers
    }

    const createdCard = await cardModel.createdNew(newCard)

    const getNewCard = await cardModel.fineOneById(createdCard.insertedId.toString())

    // if (!getNewCard) {
    //   throw new Error('No card found with the specified ID')
    // }

    // await columnModel.pushCardOrderIds(getNewCard)

    return createdCard
  } catch (error) {
    console.error('Error in createNew function:', error.message)
    console.error('Error details:', {
      request_body: reqBody,
      error_message: error.message,
      stack_trace: error.stack
    });
    throw new ApiError('Error creating new card at service ${error.message}', 500)
  }
}

export const cardService = {
  createNew
}
