const playerModel =require('../models/playerModel');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')

const maxAge=3 * 24 * 60 * 60;//3 days
createToken=(id)=>{
  return jwt.sign({id},process.env.JWT,{
    expiresIn: maxAge
  })
}

const signup= async(req,res)=>{

 
  const {emailID,password}=req.body;
  const player=await playerModel.findOne({emailID})

  if(!player){
    try{
      const player=await playerModel.create({emailID,password})
      console.log(player);
      const token=createToken(player._id)
      res.cookie('playerid',token, { httpOnly: true, maxAge: maxAge * 1000 })
      res.status(200).json(player);
    }
    catch(err){
      return res.status(400).json({error:err});
    }
    
  }
  else{
    res.status(400).json({error:"already exists"});
  }

}

const login= async(req,res)=>{
  const {emailID,password}=req.body;
  try{
    player=await playerModel.login(emailID,password)
  }
  catch(e){
    return res.status(400).json({error:e.message});
  }

  const token=createToken(player._id)
  res.cookie('playerid',token, { httpOnly: true, maxAge: maxAge * 1000 })
  res.status(200).json(player);
}

//we set lifetime to 1 ms so it goes
const logout= async(req,res)=>{
  console.log("okkk")
  res.cookie('playerid','',{maxAge:1});
  return res.status(200).json('')
}


module.exports={
  signup,
  login,
  logout,
}