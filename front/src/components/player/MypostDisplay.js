import { useState, useEffect } from 'react';

const MypostDisplay = ({ playerPost, setPlayerPosts, playerPosts }) => {
  const [postRequests, setpostRequests] = useState([]);
  const [flag, setflag] = useState(false);
  const deletePlayerPost = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/playerpost/delete`, {
      method: 'DELETE',
      body: JSON.stringify(playerPost),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const json = await response.json();

    if (response.ok) {
      console.log(json);
      // Remove the deleted post from the local state
      const updatedPlayerPosts = playerPosts.filter(
        (post) => post._id !== playerPost._id
      );
      setPlayerPosts(updatedPlayerPosts);
    } else {
      console.log(json.error);
    }
  };
  const Getrequestonpost = async (e) => {
    e.preventDefault();

    try {
      console.log(`request`);
      const response = await fetch(
        `/api/playerpost/Getrequestonpost/${playerPost._id}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const json = await response.json();
      setpostRequests(json);
      setflag(true);
      console.log(postRequests);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust format as needed
  };
  const removerequest = () => {
    setflag(false);
  };
  useEffect(() => {
    console.log('Updated post requests:', postRequests);
  }, [postRequests]);
  // Assuming playerPost.playerInfo is an object containing name and emailID
  // Ensure playerPost.playerInfo exists before destructure
  const name = playerPost.playersInfo?.[0]?.name || 'Name not available';
  const playerLocation =
    playerPost.playersInfo?.[0]?.playerLocation || 'Location not available';

  // console.log(playerPost);
  return (
    <>
      <div
        className='card mx-2 my-2'
        style={{
          width: '18rem',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '20px', // Added margin-bottom
        }}
      >
        <div className='card-body'>
          <h5
            className='card-title'
            style={{
              marginBottom: '10px',
              fontSize: '1.25rem',
              fontWeight: 'bold',
            }}
          >
            {playerPost.title}
          </h5>
          <h6
            className='card-subtitle mb-2 text-muted'
            style={{ fontSize: '0.9rem' }}
          >
            Description: {playerPost.description}
          </h6>
          <p className='card-text' style={{ marginBottom: '5px' }}>
            Name: {name}
          </p>
          <p className='card-text' style={{ marginBottom: '5px' }}>
            Sports: {playerPost.sport}
          </p>
          <p className='card-text' style={{ marginBottom: '5px' }}>
            Skill: {playerPost.skill}
          </p>
          <p className='card-text' style={{ marginBottom: '5px' }}>
            Number of Openings: {playerPost.quantity}
          </p>
          <p className='card-text' style={{ marginBottom: '5px' }}>
            Court: {playerPost.location}
          </p>
          <p className='card-text' style={{ marginBottom: '5px' }}>
            City: {playerLocation}
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              className='btn btn-danger'
              onClick={deletePlayerPost}
              style={{ fontSize: '0.9rem', padding: '0.3rem 0.75rem' }}
            >
              Delete
            </button>
            {!flag && (
              <button
                className='btn btn-primary'
                onClick={Getrequestonpost}
                style={{ fontSize: '0.9rem', padding: '0.3rem 0.75rem' }}
              >
                Requests
              </button>
            )}
            {flag && (
              <button
                className='btn btn-primary'
                onClick={removerequest}
                style={{ fontSize: '0.9rem', padding: '0.3rem 0.75rem' }}
              >
                Hide Request
              </button>
            )}
          </div>
        </div>
      </div>
      {flag && (
        <div className='request_post_table-container'>
          {postRequests.map((post, index) => (
            <div key={index} className='request_post_table-column'>
              <div className='request_post_post-item'>
                <h3>Request {index + 1}</h3>
                <p>Message: {post.message}</p>
                <p>Timestamp: {formatTimestamp(post.timestamp)}</p>
                <p>Status: {post.status}</p>
                {/* Render player information */}
                {post.playerInfo && (
                  <div className='request_post_player-info'>
                    <h4>Player Information</h4>
                    <p>Name: {post.playerInfo.name}</p>
                    {/* <p>Email: {post.playerInfo.emailID}</p> */}
                    {/* <p>Mobile Number: {post.playerInfo.mobileNumber}</p> */}
                    {/* Render social media links */}
                    {post.playerInfo.social_media_links && (
                      <div className='request_post_social-media-links'>
                        <h5>Social Media Links</h5>
                        <p>
                          Facebook:{' '}
                          {post.playerInfo.social_media_links.facebook}
                        </p>
                        <p>
                          Twitter: {post.playerInfo.social_media_links.twitter}
                        </p>
                        <p>
                          Instagram:{' '}
                          {post.playerInfo.social_media_links.instagram}
                        </p>
                      </div>
                    )}
                    {/* Render feedback and ratings */}
                    {post.playerInfo.feedback_and_ratings && (
                      <div className='request_post_feedback-ratings'>
                        <h5>Feedback and Ratings</h5>
                        <p>
                          Reviews:{' '}
                          {post.playerInfo.feedback_and_ratings.reviews.join(
                            ', '
                          )}
                        </p>
                        <p>
                          Ratings:{' '}
                          {post.playerInfo.feedback_and_ratings.ratings}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default MypostDisplay;
