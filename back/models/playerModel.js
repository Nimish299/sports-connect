const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const playerSchema=new mongoose.Schema({
    emailID :{
      type: String,
      required: true
    },
    password :{
      type: String,
      required: true
    },
    cart:[
      {
        name:{
          type:String
        },
        quantity:{
          type:Number
        }
      }
    ]

},{Timestamps:true})

playerSchema.pre('save',async function(next){
  const salt=await bcrypt.genSalt();
  this.password=await bcrypt.hash(this.password,salt);
  next();
})

playerSchema.statics.login=async function(emailID,password){
  const player=await this.findOne({emailID})
  if(!player)
    throw Error('no such player')
  const auth=await bcrypt.compare(password,player.password);
  if(!auth)
    throw Error('wrong password')
  return player;
}

module.exports =mongoose.model('player',playerSchema);

