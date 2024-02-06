const playerModel =require('../models/playerModel');
const academyModel=require('../models/academyModel')
const playerPostModel = require('../models/playerPostModel')
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

const applytoacad= async(req,res)=>{
  const player=await playerModel.findOne({_id:req.playerid});
  if(!player){
    return res.status(400).json({error:"no such player"});
  }

  const {name}=req.body;
  const nameobj={name}
  const acad=await academyModel.findOne({name})
  if(!acad){
    return res.status(400).json({error:"no such academy"});
  }
  const tryfind=await playerModel.findOne(
    {_id:req.playerid,'applied.name':name}
  )
  if(tryfind){
    return res.status(400).json({error:'already applied'});
  }
  if(acad.quantity<1){
    return res.status(400).json({error:'no place available right now '});
  }
  const newquant=acad.quantity-1
  await academyModel.findOneAndUpdate({name},{$set:{quantity:newquant}});

  



  const tryupdate=await playerModel.findOneAndUpdate(
    {_id:req.playerid},{$push:{applied:nameobj}}
  )

  console.log("here");
  return res.status(200).json({tryupdate})

}

const applied=async(req,res)=>{
  const player= await playerModel.findOne({_id:req.playerid})
  console.log(player);
  return res.status(200).json({player})
}

const leaveacad=async(req,res)=>{
  console.log(req.body);
  const {name} = req.body;
  await academyModel.findOneAndUpdate({name},{$inc:{'quantity':1}});
  
  console.log(name);
  console.log(req.playerid);
  
  const retval= await playerModel.findOneAndUpdate(
    {_id:req.playerid},
    {$pull:{'applied':{name}}}
  )

  return res.status(200).json({retval});
  

}






const addtostarred= async(req,res)=>{
  const player=await playerModel.findOne({_id:req.playerid});
  if(!player){
    return res.status(400).json({error:"no such player"});
  }

  const {name}=req.body;
  const nameobj={name}
  const post=await playerPostModel.findOne({name})
  if(!post){
    return res.status(400).json({error:"no such playerPost here"});
  }
  const tryfind=await playerModel.findOne(
    {_id:req.playerid,'starred.name':name}
  )
  if(tryfind){
    return res.status(400).json({error:'already starred'});
  }
  // if(post.quantity<1){
  //   return res.status(400).json({error:'no place available right now '});
  // }
  //const newquant=post.quantity-1
  //await playerPostModel.findOneAndUpdate({name},{$set:{quantity:newquant}});

  const tryupdate=await playerModel.findOneAndUpdate(
    {_id:req.playerid},{$push:{starred:nameobj}}
  )

  console.log("here");
  return res.status(200).json({tryupdate})

}

const starred=async(req,res)=>{
  const player= await playerModel.findOne({_id:req.playerid})

  console.log(player);
  return res.status(200).json({player})
}

const removefromstarred=async(req,res)=>{
  console.log(req.body);
  const {name} = req.body;
  await playerPostModel.findOneAndUpdate({name},{$inc:{'quantity':1}});
  
  console.log(name);
  console.log(req.playerid);
  
  const retval= await playerModel.findOneAndUpdate(
    {_id:req.playerid},
    {$pull:{'starred':{name}}}
  )

  return res.status(200).json({retval});
  

}



module.exports={
  signup,
  login,
  logout,
  applied,
  applytoacad,
  leaveacad,
  addtostarred,
  starred,
  removefromstarred
}