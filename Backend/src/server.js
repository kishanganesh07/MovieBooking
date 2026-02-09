import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/db.js';
import movieRoutes from './routes/moviesroutes.js'

const app=express()
app.use(cors());
app.use(express.json())
app.use("/api/movies", movieRoutes);

const initializationOfServer=async()=>{
    try{ 
        await connectDb();
        const PORT=process.env.PORT|| 3000
        app.listen(PORT,"0.0.0.0",()=> console.log(`Server is Running at ${PORT}`))
    }catch(e){
        console.log(e)
        process.exit(1)
    }

}
initializationOfServer();