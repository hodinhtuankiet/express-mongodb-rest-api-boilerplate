import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatter'
import { boardModel } from '~/models/boardModel'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  try {
    // xử lí logic dữ liệu
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // gọi tới tầng model để lưu vào database
    const createdBoard = await boardModel.createdNew(newBoard)
    console.log(createdBoard)

    // phải có return để bay vào tầng controller
    // createdBoard.insertedI : ObjectId
    const getNewBoard = await boardModel.fineOneById(createdBoard.insertedId)
    console.log(getNewBoard)
    return getNewBoard
  } catch (error) {
    // Thêm xử lý lỗi cụ thể nếu cần
    console.error('Error in createNew function:', error.message)
    throw new ApiError('Error creating new board', 500) // Ví dụ: Throw một ApiError với mã lỗi 500
  }
}
const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if(!board) {
      throw new ApiError(StatusCodes.NOT_FOUND)
    }
    return board
  } catch (error) {
    console.error('Error in createNew function:', error.message)
    throw new ApiError('Error creating new board', 500) // Ví dụ: Throw một ApiError với mã lỗi 500
  }
}
export const boardService = {
  createNew, getDetails
}
