import { useState } from 'react';

const PostListDisplay = ({ playerPost, navigate }) => {
  console.log(playerPost);
  const [errDisplay, seterrDisplay] = useState('');
  const [applied, setApplied] = useState(false);
  const apply = async (e) => {
    e.preventDefault();
    const name = playerPost.name;
    const item = { name };
    const response = await fetch('/api/player/addtostarred', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-type': 'application/json',
      },
    });

    const json = await response.json();
    if (response.ok) {
      console.log(json);
      setApplied(true);
    } else {
      console.log(json.error);
      seterrDisplay(json.error);
    }
  };

  const acceptadded = (e) => {
    e.preventDefault();
    seterrDisplay('');
    setApplied(false);

    alert('Added to starred List');
  };
  // console.log(playerPost._id);
  const gotoPost = (e) => {
    e.preventDefault();
    console.log(playerPost._id);
    return navigate(`/playerpost/${playerPost._id}`);
  };
  const name = playerPost.playersInfo?.[0]?.name || 'Name not available';
  const playerLocation =
    playerPost.playersInfo?.[0]?.playerLocation || 'Location not available';
  const status = playerPost?.request?.[0]?.status;
  return (
    <div className='card mx-3 my-3' style={{ width: '18rem' }}>
      <div className='card-body'>
        <h5
          className='card-title mb-3'
          style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
        >
          {playerPost.title}
        </h5>
        <h6
          className='card-subtitle mb-2 text-muted'
          style={{ fontSize: '0.9rem' }}
        >
          Description: {playerPost.description}
        </h6>
        <p className='card-text mb-1'>Name: {name}</p>
        <p className='card-text mb-1'>Sports: {playerPost.sport}</p>
        <p className='card-text mb-1'>Skill: {playerPost.skill}</p>
        <p className='card-text mb-1'>
          Number of Openings: {playerPost.quantity}
        </p>
        <p className='card-text mb-1'>Court: {playerPost.location}</p>
        <p className='card-text mb-1'>City: {playerLocation}</p>
        <div className='flex-end'></div>

        <div className='btn-group'>
          {!applied && (
            <div>
              <button
                className='btn btn-primary btn-sm mx-2'
                onClick={(e) => {
                  apply(e);
                }}
              >
                Add
              </button>
              <button
                className='btn btn-primary btn-sm mx-2'
                onClick={(e) => {
                  gotoPost(e);
                }}
              >
                See details
              </button>
              {status && (
                <button
                  className={`post-button button-${status}`}
                  // onClick={handleRequest}
                >
                  Status
                </button>
              )}
              {errDisplay && <p>{errDisplay}</p>}
            </div>
          )}
          {applied && (
            <div>
              <label>Added to starred</label>
              <button
                className='btn btn-danger btn-sm'
                onClick={(e) => {
                  acceptadded(e);
                }}
              >
                Ok
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default PostListDisplay;
