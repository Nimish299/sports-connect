const express=require('express')
const router=express.Router();

//middleware
const {
  playermiddle
}=require('../middleware/academyMiddleware')

const {
  createPlayerPost,
  updateQuantity,
  deletePlayerPost,
  allPlayer,
  allPlayerPosts,
  getdetails,
  playerPostbySport
} =require('../controllers/playerPostController');

 


router.use(['/delete','/updatequantity','/create','/allplayer','/allplayerposts'],playermiddle)

router.delete('/delete',deletePlayerPost)
router.patch('/updatequantity',updateQuantity)
router.post('/create',createPlayerPost);
router.get('/allplayer',allPlayer)
router.get('/allplayerposts',allPlayerPosts);
router.get('/details/:name',getdetails)
router.get('/sport/:sport',playerPostbySport)

module.exports=router;