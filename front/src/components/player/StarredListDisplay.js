const StarredListDisplay = ({ playerPost, playerPosts, setPlayerPosts }) => {
  const deletePlayerPost = async (e) => {
    e.preventDefault();
    console.log(playerPost);
    const response = await fetch(`/api/player/removefromstarred`, {
      method: 'DELETE',
      body: JSON.stringify(playerPost),
      headers: {
        'Content-type': 'application/json',
      },
    });
    console.log(response);
    const json = await response.json();
    console.log(json);
    const updatedApplied = playerPosts.filter((post) => post !== playerPost);
    setPlayerPosts(updatedApplied);
  };
  const name = playerPost.playersInfo?.[0]?.name || 'Name not available';
  const playerLocation =
    playerPost.playersInfo?.[0]?.playerLocation || 'Location not available';
  return (
    <div>
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
              onClick={(e) => {
                deletePlayerPost(e);
              }}
            >
              unstar this PlayerPost{' '}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarredListDisplay;
