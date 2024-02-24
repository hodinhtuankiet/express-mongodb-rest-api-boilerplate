import ApiError from '~/utils/ApiError'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    const { images, ...otherFields } = reqBody
    console.log('Images received:', images)
    console.log('otherFields received:', { ...otherFields })

    const imageBuffers = Array.isArray(images)
      ? images.map((base64Image) => Buffer.from(base64Image, 'base64'))
      : []

    const newCard = {
      ...otherFields,
      images: imageBuffers
    }
    const createdCard = await cardModel.createdNew(newCard)

    if (!createdCard._id) {
      throw new Error('Error creating new card: No valid ID returned')
    }
    // phải có return để bay vào tầng controller
    // createdCard.insertedI : ObjectId
    const getNewCard = await cardModel.fineOneById(createdCard._id)
    if (getNewCard) {
      // handle after created new column -> cards with [empty]
      await columnModel.pushCardOrderIds(getNewCard)
    }

    return getNewCard
  } catch (error) {
    console.error('Error in createNew function:', error.message)
    console.error('Error details:', {
      request_body: reqBody,
      error_message: error.message,
      stack_trace: error.stack
    })
    throw new ApiError('Error creating new card at service ', 500)
  }
}

export const cardService = {
  createNew
}
