const express= require("express");
const mongoose= require("mongoose")
const url="mongodb://localhost:27017/rkdb"
const app= express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
mongoose.connect(url,
    {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    });

const db=mongoose.connection;
db.on('open',()=>
{
    console.log("connected to mongodb");
})

const rkrouter= require('./routers/rk')
app.use('/rk',rkrouter)
app.listen(3000,()=>{
    console.log("server started");
})