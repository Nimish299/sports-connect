const express = require('express');
const router = express.Router();

const { playermiddle } = require('../middleware/playerMiddleware');

const {
  signup,
  login,
  logout,
  profile,
  updateProfile,
  applied,
  applytoacad,
  leaveacad,
  addtostarred,
  starred,
  removefromstarred,
} = require('../controllers/playerController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

router.use(
  [
    '/applytoacad',
    '/applied',
    '/leaveacad',
    '/profile',
    '/addtostarred',
    '/starred',
    '/removefromstarred',
    '/updateProfile',
  ],
  playermiddle
);
router.get('/profile', profile);
router.put('/updateProfile', updateProfile);
router.post('/applytoacad', applytoacad);
router.get('/applied', applied);
router.delete('/leaveacad', leaveacad);

router.post('/addtostarred', addtostarred);
router.get('/starred', starred);
router.delete('/removefromstarred', removefromstarred);

module.exports = router;
