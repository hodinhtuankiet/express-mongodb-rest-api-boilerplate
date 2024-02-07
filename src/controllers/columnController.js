import { StatusCodes } from 'http-status-codes'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
import { columnService } from '~/services/columnService'

const createNew = async (req, res, next ) => {
  try {
    const createdColumn = await columnService.createNew(req.body)
    // return json về Clients
    res.status(StatusCodes.CREATED).json(createdColumn)

  } catch (error) {
    next(error)
  }
}
const deleteColumn = async (columnId) => {
  try {
    // Delete the column
    await columnModel.deleteColumnById(columnId)

    // Delete all cards in the column
    await cardModel.deleteAllCardById(columnId)

    // Return success message
    return { deleteResult: 'Column deleted successfully' }
  } catch (error) {
    // Handle errors gracefully
    console.error('Error deleting column:', error.message)
    throw error // Re-throw the error to propagate it
  }
}


export const columnController = {
  createNew,
  deleteColumn
}