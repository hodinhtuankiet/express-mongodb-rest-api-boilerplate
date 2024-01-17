const { MongoClient, ServerApiVersion } = require('mongodb')
import { env } from '~/config/environment'

// init variable null (not connected yet)
let trelloDatabaseInstance = null

// init object mongoClientInstance to connect to mongodb server
const mongoClientInstance = new MongoClient( env.MONGODB_URL, {
  // serverApi have 5.0 version higher
  serverApi: {
    version: ServerApiVersion.v1, // Specify the desired MongoDB server API version (in this case, version 1)
    strict: true, // enforces compatibility with the specified API version
    // If you use a method from a higher version than the specified server API version, it will announce deprecation errors
    deprecationErrors: true
  }
}
)
export const CONNECT_DB = async () => {
  // connect will be availbe when new MongoClient
  // Call connect to MongoDB Atlas with URL declare in mongoClientInstance
  await mongoClientInstance.connect()
  // When finished connect , assign name db
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}
// export when connect success to use many different places
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to database first')
  // if available
  return trelloDatabaseInstance
}

export const CLOSE_DB = async () => {
  console.log('code chay vao day')
  await mongoClientInstance.close()
}