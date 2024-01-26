import ApiError from '~/utils/ApiError'
import { columnModel } from '~/models/columnModel'
const createNew = async (reqBody) => {
  try {
    // xử lí logic dữ liệu
    const newColumn = {
      ...reqBody
    }
    // gọi tới tầng model để lưu vào database
    const createdColumn = await columnModel.createdNew(newColumn)
    // phải có return để bay vào tầng controller
    // createdcolumn.insertedI : ObjectId
    const getNewColumn = await columnModel.fineOneById(createdColumn.insertedId)
    return getNewColumn
  } catch (error) {
    // Thêm xử lý lỗi cụ thể nếu cần
    // console.error('Error in createNew function:', error.message)
    throw new ApiError('Error creating new column', 500) // Ví dụ: Throw một ApiError với mã lỗi 500
  }
}

export const columnService = {
  createNew
}
