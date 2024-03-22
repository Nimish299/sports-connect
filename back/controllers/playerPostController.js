const playerPostModel = require('../models/playerPostModel');
const playerModel = require('../models/playerModel');
const createPlayerPost = async (req, res) => {
  try {
    // Extract required fields from the request body
    const { title, description, sport, quantity, location, skill } = req.body;

    // Get the player's ID from the request
    const playerId = req.playerid;

    // Check if a player post with the same title already exists
    const existingPost = await playerPostModel.findOne({ title });
    if (existingPost) {
      return res
        .status(400)
        .json({ error: 'A player post with this title already exists' });
    }

    // Fetch the player's information directly within this function
    const player = await playerModel.findOne({ _id: playerId });
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    // Extract the name and general information from the player object
    const { name, emailID, mobileNumber, location: playerLocation } = player;

    // Construct the playerInfo object
    const playerInfo = {
      name,
      emailID,
      mobileNumber,
      playerLocation: playerLocation,
    };

    // Create the player post including playerInfo
    const playerPost = await playerPostModel.create({
      title,
      description,
      sport,
      quantity,
      location,
      createdBy: playerId,
      skill,
      playersInfo: [playerInfo], // Adding playerInfo to playersInfo array
    });

    // Return both the created player post and the player's information
    res.status(201).json({ playerPost });
  } catch (error) {
    console.error('Error creating player post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateQuantity = async (req, res) => {
  const { name, quantity } = req.body;
  const post = await playerPostModel.findOneAndUpdate(
    { name },
    { $set: { quantity } }
  );
  if (post) {
    return res.status(200).json(post);
  }
  return res.status(400).json({ error: 'this playerPost doesnt exists' });
};

const deletePlayerPost = async (req, res) => {
  const { name } = req.body;
  const acad = await playerPostModel.findOneAndDelete({ name });
  if (acad) {
    return res.status(200).json(acad);
  }
  return res.status(400).json({ error: 'this playerPost doesnt exist' });
};

const allPlayerPost = async (req, res) => {
  try {
    // Extract player ID from the request
    const playerId = req.playerid;

    // Find all player posts associated with the player ID
    const playerPosts = await playerPostModel.find({ createdBy: playerId });

    // Return the player posts in the response
    return res.status(200).json(playerPosts);
  } catch (error) {
    console.error('Error fetching player posts:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const allPlayerPosts = async (req, res) => {
  const posts = await playerPostModel.find();
  return res.status(200).json(posts);
};

const getdetails = async (req, res) => {
  console.log('hi');
  const name = req.params.name;
  const post = await playerPostModel.findOne({ name });
  console.log(name, post);
  return res.status(200).json(post);
};

const playerPostbySport = async (req, res) => {
  const sport = req.params.sport;
  const post = await playerPostModel.find({ sport });
  return res.status(200).json(post);
};

module.exports = {
  createPlayerPost,
  updateQuantity,
  deletePlayerPost,
  allPlayerPost,
  allPlayerPosts,
  getdetails,
  playerPostbySport,
};
