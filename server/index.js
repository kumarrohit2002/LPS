const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
app.use(cors());

const PORT=process.env.PORT || 4000;

app.use(express.json());

//add apis
const authRoutes=require('./src/routes/authRoutes');
app.use('/api/v1',authRoutes);

const questionRoutes=require('./src/routes/questionRoutes');
app.use('/api/v1',questionRoutes);





//DB connection
const {connect}=require('./src/config/database');
connect();



//server activation
app.listen(PORT,()=>{
    console.log(`server is lisning on : http://localhost:${PORT}`);
})

// app.use('/',(req,res)=>{
//     res.send("Hello How are you");
// })