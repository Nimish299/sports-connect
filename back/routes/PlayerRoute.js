const express=require('express')
const router =express.Router()

const {
  playermiddle
} =require ('../middleware/playerMiddleware')

const {
  signup,
  login,
  logout
} =require('../controllers/playerController')

router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',logout)

module.exports = router