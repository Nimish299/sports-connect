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
  leaveacad,
  addtostarred,
  starred,
  removefromstarred
} =require('../controllers/playerController')

router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',logout)


router.use(['/applytoacad','/applied','/leaveacad','/addtostarred','/starred','/removefromstarred'],playermiddle)
router.post('/applytoacad',applytoacad)
router.get('/applied',applied)
router.delete('/leaveacad',leaveacad)

router.post('/addtostarred',addtostarred)
router.get('/starred',starred)
router.delete('/removefromstarred',removefromstarred)


module.exports = router