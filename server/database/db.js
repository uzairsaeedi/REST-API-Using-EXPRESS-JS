import mongoose from "mongoose";

const Connection = async (username,password)=> {

    const URL = `mongodb://localhost:27017/`;

    try{

        await mongoose.connect(URL,{useUnifiedTopology : true, useNewUrlParser: true });
        console.log('Database Connected Successfully');
    }catch(error){
        console.log('Error While connecting with the database ',error);
    }
}

export default Connection;