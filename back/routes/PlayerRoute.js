const express=require('express')
const router =express.Router()

const {
  playermiddle
} =require ('../middleware/playerMiddleware')

const {
  signup,
  login,
  logout,
  applied,
  applytoacad,
  leaveacad
} =require('../controllers/playerController')

router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',logout)


router.use(['/applytoacad','/applied','/leaveacad'],playermiddle)
router.post('/applytoacad',applytoacad)
router.get('/applied',applied)
router.delete('/leaveacad',leaveacad)


module.exports = router