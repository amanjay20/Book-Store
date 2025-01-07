import Mongoose from 'mongoose'


const connectDB = async () =>{
    try {
        const conn = await Mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDB database ${Mongoose.connection.host}`)
        
    } catch (error) {

        console.log(`MongoDb Error ${error}`)
        
    }
}

export default connectDB