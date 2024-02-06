const mongoose=require('mongoose')

const playerPostSchema=new mongoose.Schema({
    name :{
      type: String,
      required: true
    },
    quantity :{
      type: Number,
      required: true
    },
    sport:{
      type:String,
      required: true
    },
    pID:{
      type:String,
      required:true
    }
})


module.exports =mongoose.model('playerPost',playerPostSchema);

