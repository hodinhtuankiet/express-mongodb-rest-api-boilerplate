import express from 'express'
import { cardValidation } from '~/validations/cardValidation'
import { cardController } from '~/controllers/cardController'

const Router = express.Router()

Router.route('/')
// next() -> when cardValidation finished , we will redirect to cardController
  .post(cardValidation.createNew, cardController.createNew)

export const cardRoute = Router
