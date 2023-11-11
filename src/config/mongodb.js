const { MongoClient, ServerApiVersion } = require("mongodb");
import { env } from '~/config/environment'

// init variable null (not connected yet) 
let trelloDatabaseInstance = null

// init object mongoClientInstance to connect to mongodb server
const mongoClientInstance = new MongoClient( env.MONGODB_URL,{
    // serverApi have 5.0 version higher 
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        // when u use version 7 so call methods of version 6 then deprecationErrors will announce errors 
        deprecationErrors: true,
    }
    }
)
export const CONNECT_DB = async () =>{
    // connect will be availbe when new MongoClient
    // Call connect to MongoDB Atlas with URL declare in mongoClientInstance
    await mongoClientInstance.connect()
    // When finished connect , assign name db 
    trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}
// export when connect success to use many different places
export const GET_DB = () =>{
    if(!trelloDatabaseInstance) throw new Error('Must connect to database first')
    // if available
    return trelloDatabaseInstance;
}

export const CLOSE_DB =  async () =>{
    console.log('code chay vao day');
    await mongoClientInstance.close();
}