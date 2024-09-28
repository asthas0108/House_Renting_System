import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


//VrKP0PyLoG3TfY9Q
mongoose.connect(process.env.MONGO).then(() => {
    console.log("connected to mongoDB");
}).catch((err) => {
    console.log(err);
})

const app = express();


app.listen(3000, () => {
    console.log(`server is running at port 3000`);
})