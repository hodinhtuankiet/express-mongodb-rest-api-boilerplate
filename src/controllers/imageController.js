import { StatusCodes } from 'http-status-codes'
import { imageService } from '~/services/imageService'

const createNew = async (req, res, next ) => {
  try {
    console.log('anh o cardController: ', req.file)
    const createdCard = await imageService.createNew(req.body)
    // return json về Clients
    res.status(StatusCodes.CREATED).json(createdCard)

  } catch (error) {
    next(error)
  }
}


export const imageController = {
  createNew
}