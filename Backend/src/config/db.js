import mongoose from 'mongoose'
const connectDb=async()=>{
    try{
        const url=process.env.MONGODB_URI||""
        await mongoose.connect(url)
        console.log("Database connected Sucessfully")


    }catch(e){
        console.log(`Error in Database ${e}`)
        process.exit(1)

    }
}
export default connectDb;