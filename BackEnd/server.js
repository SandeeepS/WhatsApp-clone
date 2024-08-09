//importing 

import express from 'express'
import mongoose from 'mongoose'

//app config
const app = express()
const port = process.env.PORT || 9000



//middleware


//DB congifgure
const connection_url = 'mongodb+srv://admin:sandeepwhatsapppasscod@cluster0.3jlsh.mongodb.net/whatsappdb?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(connection_url)
//???


// api routes
app.get('/',(req,res) => {
    res.status(200)
    res.send("hello world");
})

//listen
app.listen(port,()=>{
    console.log(`server running on the port  ${port}`)
})