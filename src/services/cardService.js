import ApiError from '~/utils/ApiError'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    const { ...otherFields } = reqBody

    const newCard = {
      ...otherFields
    }

    const createdCard = await cardModel.createdNew(newCard)

    if (!createdCard._id) {
      throw new Error('Error creating new card: No valid ID returned')
    }

    // Retrieve the newly created card by its ID
    const getNewCard = await cardModel.fineOneById(createdCard._id)

    if (getNewCard) {
      // Handle after creating a new card -> update column order IDs
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
    throw new ApiError('Error creating new card at service', 500)
  }
}

export const cardService = {
  createNew
}
