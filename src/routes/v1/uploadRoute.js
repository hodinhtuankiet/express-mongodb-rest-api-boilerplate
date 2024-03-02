import express from 'express'
import { imageValidation } from '~/validations/imageValidation'
import { imageController } from '~/controllers/imageController'
// import multer from 'multer'
const multer = require('multer')
const Router = express.Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + file.originalname)
  }
})
// const upload = multer({ storage: storage })
const upload = multer({ storage: storage })

// next() -> when cardValidation finished , we will redirect to cardController
Router.route('/')
  .post(upload.single('image'), async (req, res, next) => {
    try {
      console.log(req.body)
      next()
    } catch (error) {
      console.error('Error uploading image:', error)
      res.status(500).send('Internal Server Error')
    }
  }, imageValidation.createNew, imageController.createNew)
export const uploadRoute = Router
