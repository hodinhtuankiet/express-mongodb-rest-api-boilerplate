import ApiError from '~/utils/ApiError'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
const createNew = async (reqBody) => {
  try {
    // xử lí logic dữ liệu
    const newCard = {
      ...reqBody
    }
    // gọi tới tầng model để lưu vào database
    const createdCard = await cardModel.createdNew(newCard)
    // phải có return để bay vào tầng controller
    // createdCard.insertedI : ObjectId
    const getNewCard = await cardModel.fineOneById(createdCard.insertedId)
    if (getNewCard) {
      // handle after created new column -> cards with [empty]
      await columnModel.pushCardOrderIds(getNewCard)
    }
    return getNewCard
  } catch (error) {
    // Thêm xử lý lỗi cụ thể nếu cần
    console.error('Error in createNew function:', error.message)
    throw new ApiError('Error creating new card', 500) // Ví dụ: Throw một ApiError với mã lỗi 500
  }
}

export const cardService = {
  createNew
}
