import { useState } from 'react';

const MypostDisplay = ({ playerPost, setPlayerPosts, playerPosts }) => {
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
          </div>
        </div>
      </div>
    </>
  );
};
export default MypostDisplay;
