import express from 'express';
import { StatusCodes } from 'http-status-codes'
import { boardRoutes } from '~/routes/v1/boardRoute'

const Router = express.Router();

Router.get('/status',(req,res)=>{
    res.status(StatusCodes.OK).json({ message: 'Already to use '})
})
Router.use('/boards', boardRoutes)

export const APIs_v1 = Router
