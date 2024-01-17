import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from '~/routes/v1/boardRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Already to use ' })
})

// BOARD API
Router.use('/boards', boardRoute)

export const APIs_v1 = Router
