const connectDb = require('./connStr');
const express = require('express');
const router = require('./routes');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors())
app.use(express.json());
app.use('/todo', router);


const start = async ()=>{
    try{
        await connectDb(process.env.MONGO_URL)
        app.listen(9000, ()=>console.log('runnin'));
    }
    catch(err){
        console.log(err)
    }
}


start();