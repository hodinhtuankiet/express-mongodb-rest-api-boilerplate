import express from 'express'
import { columnValidation } from '~/validations/columnValidation'
import { columnController } from '~/controllers/columnController'

const Router = express.Router()

Router.route('/')
// next() -> when columnValidation finished , we will redirect to columnController
  .post(columnValidation.createNew, columnController.createNew)
Router.route('/:id')
  .delete(columnValidation.deleteColumn, columnController.deleteColumn)

export const columnRoute = Router
