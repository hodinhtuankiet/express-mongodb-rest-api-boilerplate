import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { columnValidation } from '~/validations/columnValidation'
import { columnController } from '~/controllers/columnController'

const Router = express.Router()

Router.route('/')
// next() -> when columnValidation finished , we will redirect to columnController
  .post(columnValidation.createNew, columnController.createNew)

export const columnRoute = Router
