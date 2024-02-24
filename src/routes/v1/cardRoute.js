import express from 'express'
import { cardValidation } from '~/validations/cardValidation'
import { cardController } from '~/controllers/cardController'
import multer from 'multer'

// import { uploadImagesCard } from '~/controllers/uploadImagesCard'
const Router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

Router.route('/')
// next() -> when cardValidation finished , we will redirect to cardController
  .post(upload.array('images'), cardValidation.createNew, cardController.createNew)
// Router.route('/upload')
//   .post(uploadImagesCard.uploadImageCard)
export const cardRoute = Router
