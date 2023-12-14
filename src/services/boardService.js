// Hàm service nào cũng có return -> nếu không có thì không có kết quả trả về cho Controller
import ApiError from "~/utils/ApiError"
import { slugify } from "~/utils/formatter"
import { boardModel } from "~/models/boardModel"

const createNew = async (reqBody) => {
    try {
        // xu lí logic dữ liệu
        const newBoard = {
            ...reqBody,
            slug: slugify(reqBody.title)
        }

        // gọi tới tầng model để lưu vào database
        const createdBoard = await boardModel.createdNew(newBoard)
        console.log(createdBoard);
        // phải có return để bay vào tầng controller
        // createdBoard.insertedI : ObjectId
        const getNewBoard = await boardModel.fineOneById(createdBoard.insertedId)
        console.log(getNewBoard);
        return getNewBoard


    } catch (error) {
        throw error
    }
}

export const boardService = {
    createNew
}