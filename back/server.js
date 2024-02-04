const express=require('express')
require('dotenv').config()
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')

const playerRoute=require ('./routes/PlayerRoute')


const app=express()

app.use(express.json());
app.use(cookieParser());

app.use((req,res,next)=>{
  console.log(req.path,"  ",req.method);
  console.log(req.body);
  next();
})

app.use('/api/player',playerRoute)

mongoose.connect(process.env.DB_URI)
  .then(()=>{
    app.listen(process.env.PORT,()=>{
      console.log("connected to db")
    })
  })
  .catch((err)=>{
    console.log(err)
  })