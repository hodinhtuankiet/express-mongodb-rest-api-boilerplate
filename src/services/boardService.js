import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatter'
import { boardModel } from '~/models/boardModel'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
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
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, '')
    }
    // cloneDeep create new data board(resBoard) to avoid alter data
    const resBoard = cloneDeep(board)
    resBoard.columns.forEach(column => {
      // Here data cards located on the same level as the column
      // column.cards to create new data cards after filter
      // filter response new array cards with(c.columnId === column._id) -> then create array cards
      // Must use toString() Cuz columnId & column._id is ObjectId()
      column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
      // OR
      // column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
    })
    // After create new array cards located in columns array
    // Then delete array cards has same level clumns array in resboard
    delete resBoard.cards
    return resBoard
  } catch (error) {
    console.error('Error in createNew function:', error.message)
    throw new ApiError('Error creating new board', 500) // Ví dụ: Throw một ApiError với mã lỗi 500
  }
}
export const boardService = {
  createNew, getDetails
}
