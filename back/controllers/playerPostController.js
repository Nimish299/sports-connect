const playerPostModel=require('../models/playerPostModel')

const createPlayerPost=async (req,res)=>{
  const {name,sport,quantity}=req.body;
  const pID=req.playerid
  console.log("here");
  console.log({name,sport,quantity,pID})

  const post=await playerPostModel.findOne({name:name});
  if(post)
  {
    return res.status(400).json({error:"this playerPost already exists"});
  }
  
  const playerPost=await playerPostModel.create({name,sport,quantity,pID})
  return res.status(200).json(playerPost);
}

const updateQuantity=async(req,res)=>{
  const {name,quantity}=req.body
  const post=await playerPostModel.findOneAndUpdate({name},{$set:{quantity}});
  if(post)
  {
    return  res.status(200).json(post);
  }
  return res.status(400).json({error:"this playerPost doesnt exists"});
}


const deletePlayerPost=async(req,res)=>{
  const {name}=req.body
  const acad=await playerPostModel.findOneAndDelete({name});
  if(acad)
  {
    return  res.status(200).json(acad);
  }
  return res.status(400).json({error:"this playerPost doesnt exist"});
}

const allPlayer= async(req,res)=>{
  const pID=req.playerid
  const acads=await playerPostModel.find({pID})
  return res.status(200).json(acads);
}

const allPlayerPosts= async(req,res)=>{
  const posts=await playerPostModel.find()
  return res.status(200).json(posts); 
}

const getdetails=async(req,res)=>{
  console.log("hi");
  const name=req.params.name;
  const post=await playerPostModel.findOne({name});
  console.log(name, post)
  return res.status(200).json(post);
}

const playerPostbySport= async(req,res)=>{
  const sport=req.params.sport;
  const post=await playerPostModel.find({sport})
  return res.status(200).json(post); 
}

module.exports={
  createPlayerPost,
  updateQuantity,
  deletePlayerPost,
  allPlayer,
  allPlayerPosts,
  getdetails,
  playerPostbySport
}