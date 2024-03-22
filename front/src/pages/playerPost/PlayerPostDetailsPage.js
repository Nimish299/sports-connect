import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PlayerPostDetailsPage = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  console.log(`id:`);
  console.log(_id);
  console.log(`id:`);
  const [post, setPost] = useState(null); // State to store the fetched post

  const gotoPlayerCoach = () => {
    return navigate('/player/playerCoach');
  };
  const redirecttoplayerplayer = () => {
    return navigate('/player/playerplayer');
  };

  useEffect(() => {
    const getDetails = async () => {
      try {
        console.log(_id);
        const response = await fetch(`/api/playerpost/details/${_id}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch post details');
        }
        const data = await response.json();
        setPost(data);
        console.log(post);
      } catch (error) {
        console.error('Error fetching post details:', error.message);
      }
    };
    getDetails();
  }, []);
  const name = post?.playersInfo?.[0]?.name || 'Name not available';
  const playerLocation =
    post?.playersInfo?.[0]?.playerLocation || 'Location not available';
  const status = post?.request?.[0]?.status;

  return (
    <div>
      {post ? (
        <>
          <div class='post-container'>
            {post ? (
              <div class='post-card'>
                <h2 class='post-title'>Title: {post.title}</h2>
                <h3 class='post-subtitle'>Description: {post.description}</h3>
                {/* Display other details as needed */}
                <div class='post-body'>
                  <p class='post-text'>Name: {name}</p>
                  <p class='post-text'>Sports: {post.sport}</p>
                  <p class='post-text'>Skill: {post.skill}</p>
                  <p class='post-text'>Number of Openings: {post.quantity}</p>
                  <p class='post-text'>Court: {post.location}</p>
                  <p class='post-text'>City: {playerLocation}</p>
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
            <button class='post-button' onClick={redirecttoplayerplayer}>
              Back to posts
            </button>
            <button class='post-button'>Request</button>
            {status && (
              <button
                className={`post-button button-${status}`}
                // onClick={handleRequest}
              >
                Status
              </button>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={redirecttoplayerplayer}>Back to posts</button>
    </div>
  );
};

export default PlayerPostDetailsPage;
