// Hàm service nào cũng có return -> nếu không có thì không có kết quả trả về cho Controller
import ApiError from "~/utils/ApiError"
import { slugify } from "~/utils/formatter"

const createNew = async (reqBody) => {
    try {
        // xu lí logic dữ liệu
        const newBoard = {
            ...reqBody,
            slug: slugify(reqBody.title)
        }

        // gọi tới tầng model để lưu vào database
        return newBoard


    } catch (error) {
        throw error
    }
}

export const boardService = {
    createNew
}