import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'

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


export const cardController = {
  createNew
}