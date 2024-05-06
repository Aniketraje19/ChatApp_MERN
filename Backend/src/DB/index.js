import mongoose from "mongoose"

const connectDB = async () => {
    try{

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/CHAT_APP_MERN`);
        console.log(`\n\n MongoDB connected!  \n DB Host: ${connectionInstance.connection.host}`)

    }catch(error){
        console.error(`MongoDB Connection failed! : ${error}`)
        process.exit(1)
    }
}

export default connectDB