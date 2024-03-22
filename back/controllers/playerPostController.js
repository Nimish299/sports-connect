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

//no needed
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
  // const posts = await playerPostModel.find();
  const playerId = req.playerid;

  // Fetch all posts excluding those created by the player
  const posts = await playerPostModel.find({ createdBy: { $ne: playerId } });
  return res.status(200).json(posts);
};

const getdetails = async (req, res) => {
  console.log('hi');
  const _id = req.params._id;
  console.log(_id);
  const post = await playerPostModel.findOne({ _id });

  console.log(post); // Log the retrieved post object
  return res.status(200).json(post);
};

const playerPostbySport = async (req, res) => {
  const sport = req.params.sport;
  const post = await playerPostModel.find({ sport });
  return res.status(200).json(post);
};

const requestonpost = async (req, res) => {
  try {
    // Extract required fields from the request body
    const { message } = req.body;
    const playerId = req.playerid;
    const postId = req.params._id;

    // Find the player post
    const post = await playerPostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const existingRequest = post.requests.find(
      (request) => request.playerId === playerId
    );

    if (existingRequest) {
      // If a request already exists for the playerId, send an error response
      return res.status(400).json({ error: 'Request already exists ' });
    }
    // Construct the request object
    const request = {
      playerId,
      message,
      status: 'pending', // Assuming the default status is pending
    };

    // Push the request to the post's requests array
    post.requests.push(request);

    // Save the updated post
    await post.save();

    res.status(201).json({ message: 'Request created successfully' });
  } catch (error) {
    console.error('Error in Request player post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const Statusonpost = async (req, res) => {
  try {
    const playerId = req.playerid;
    const postId = req.params._id;
    console.log('Player ID:', playerId); // Log player ID
    console.log('Post ID:', postId);
    const post = await playerPostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    console.log('All playerIds in requests array:');
    post.requests.forEach((request) => {
      console.log(request.playerId);
    });
    const existingRequest = post.requests.find(
      (request) => request.playerId === playerId
    );

    if (!existingRequest) {
      return res.status(404);
    }

    // Send the status of the existing request
    res.status(200).json({ status: existingRequest.status });
  } catch (error) {
    console.error('Error in Request player post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createPlayerPost,
  updateQuantity,
  deletePlayerPost,
  allPlayerPost,
  allPlayerPosts,
  getdetails,
  playerPostbySport,
  requestonpost,
  Statusonpost,
};
