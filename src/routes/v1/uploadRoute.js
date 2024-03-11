import express from 'express'
import { ObjectId } from 'mongodb'
import { imagesModel } from '~/models/imagesModel'
// import multer from 'multer'
const multer = require('multer')
const Router = express.Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + file.originalname)
  }
})
// const upload = multer({ storage: storage })
const upload = multer({ storage: storage })
Router.route('/upload')
  .post(upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ status: 'error', message: 'No file uploaded' })
      }
      console.log('req.body: ', req.body)
      // const newImagesId = new ObjectId()
      const imageName = req.file.filename
      // Merge newImagesId into req.body
      const requestData = { images: imageName }

      console.log('requestData: ', requestData)
      await imagesModel.createdNew(requestData)
      res.json({ status: 'ok' })
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message })
    }
  })
Router.route('/:id')
  .get(async (req, res) => {
    try {
      const { id } = req.params
      const data = await imagesModel.fineOneById(id)
      res.send({ status: 'ok', data: data })
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message })
    }
  })

export const uploadRoute = Router
