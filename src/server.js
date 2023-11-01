import express from 'express'
import { env } from '~/config/environment'
import { GET_DB , CONNECT_DB } from '~/config/mongodb'

const START_SERVER = ()=>{
  const app = express()

  app.get('/', (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })
  
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ${env.AUTHOR} Dev, I am running at ${ env.APP_HOST }:${ env.APP_PORT }/`)
  })
}
GET_DB()
.then(()=> console.log('Connected to MongoDB Clound Atlas'))
.then(()=> START_SERVER())
.catch(error => {
  console.log(error);
  process.exit(0)
})
