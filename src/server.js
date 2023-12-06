import express from 'express'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment'
import { GET_DB , CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import {APIs_v1} from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = ()=>{
    const app = express()
    // enable req.body json data
    app.use(express.json())

    app.use('/v1',APIs_v1)
    //Middleware xử lí lỗi tập trung 
    app.use(errorHandlingMiddleware)
         
    app.listen(env.APP_PORT, env.APP_HOST, () => {
      // eslint-disable-next-line no-console
      console.log(`Hello ${env.AUTHOR} Dev, I am running at ${ env.APP_HOST }:${ env.APP_PORT }/`)
    })
    
    exitHook(()=>{
      console.log('4.Disconnecting Mongo');
      CLOSE_DB();
      console.log('5.Disconnecting Mongo');
    })
}

(async ()=>{ 
  try {
    console.log('1.Connecting to MongoDB Clound Atlas...')
    await CONNECT_DB()
    console.log('2.Connected to MongoDB Clound Atlas')
    START_SERVER()
  } catch (error) {
    console.log(error);
    process.exit(0)
  }
})()
// CONNECT_DB()
// .then(()=> console.log('Connected to MongoDB Clound Atlas'))
// .then(()=> START_SERVER())
// .catch(error => {
//   console.log(error);
//   process.exit(0)
// })
