import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next ) => {
  try {
    // console.log(req.body);

    const createdBoard = await boardService.createNew(req.body)
    // return json về Clients
    res.status(StatusCodes.CREATED).json(createdBoard)

  } catch (error) {
    // res.status(StatusCodes.int).json({
    // just get string error message
    //     errors: new Error(error).message
    // })
    next(error)
  }
}
const getDetails = async (req, res, next ) => {
  try {
    const boardId = req.body.id
    const Board = await boardService.createNew(boardId)
    // return json về Clients
    res.status(StatusCodes.OK).json(Board)

  } catch (error) {
    next(error)
  }
}
export const boardController = {
  createNew, getDetails
}