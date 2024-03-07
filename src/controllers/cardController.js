import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'
import { cardModel } from '~/models/cardModel'
const createNew = async (req, res, next ) => {
  try {
    console.log('anh o cardController: ', req.file)
    const createdCard = await cardService.createNew(req.body)
    // return json về Clients
    res.status(StatusCodes.CREATED).json(createdCard)

  } catch (error) {
    next(error)
  }
}
const readDetail = async (cardId) => {
  try {
    const getDataCard = await cardModel.fineOneById(cardId)
    // You might want to process or manipulate the data here before returning it
    return getDataCard
  } catch (error) {
    throw new Error(error.message) // Re-throw the error with a more descriptive message
  }
}


export const cardController = {
  createNew, readDetail
}