const express = require('express');
const router = express.Router();

//middleware
const { playermiddle } = require('../middleware/academyMiddleware');

const {
  createPlayerPost,
  updateQuantity,
  deletePlayerPost,
  allPlayerPost,
  allPlayerPosts,
  getdetails,
  playerPostbySport,
} = require('../controllers/playerPostController');

router.use(
  [
    '/delete',
    '/updatequantity',
    '/create',
    '/allPlayerPost',
    '/allplayerposts',
  ],
  playermiddle
);

router.delete('/delete', deletePlayerPost);
router.patch('/updatequantity', updateQuantity);
router.post('/create', createPlayerPost);
router.get('/allPlayerPost', allPlayerPost);
router.get('/allplayerposts/', allPlayerPosts);
router.get('/details/:_id', getdetails);
router.get('/sport/:sport', playerPostbySport);

module.exports = router;
