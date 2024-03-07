import express from 'express'
import { cardValidation } from '~/validations/cardValidation'
import { cardController } from '~/controllers/cardController'
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
  }, cardValidation.createNew, cardController.createNew)
Router.route('/:id')
  .get(async (req, res) => {
    const cardId = req.params.id
    console.log(cardId)
    try {
      const cardData = await cardController.readDetail(cardId)
      res.json(cardData) // Assuming you want to send the card data as JSON response to the client
    } catch (error) {
      console.error('Error reading card data:', error)
      res.status(500).send('Internal Server Error')
    }
  })
export const cardRoute = Router
