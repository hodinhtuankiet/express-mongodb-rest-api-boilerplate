import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from '~/routes/v1/boardRoute'
import { columnRoute } from '~/routes/v1/columnRoute'
import { cardRoute } from '~/routes/v1/cardRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Already to use ' })
})

// BOARD API
Router.use('/boards', boardRoute)
// BOARD API
Router.use('/columns', columnRoute)
// BOARD API
Router.use('/cards', cardRoute)

export const APIs_v1 = Router
