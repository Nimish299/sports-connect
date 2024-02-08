import { useState } from "react";

const MypostDisplay = ({ playerPost, setPlayerPosts, playerPosts }) => {
  const [quantity, setQuantity] = useState(0);

  const updatePlayerPost = async (e, istrue) => {
    e.preventDefault();

    if (istrue) {
      let temp = parseInt(playerPost.quantity, 10) + parseInt(quantity, 10);
      playerPost.quantity = temp;
    } else {
      playerPost.quantity = quantity;
    }

    const response = await fetch(`/api/playerpost/updatequantity`, {
      method: "PATCH",
      body: JSON.stringify(playerPost),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();

    if (response.ok) {
      console.log(json);
    } else {
      console.log(json.error);
    }
    const updatedPlayerPosts = playerPosts.map((acad) => {
      if (acad.name === playerPost.name) {
        acad.quantity = playerPost.quantity;
      }
      return acad;
    });
    setPlayerPosts(updatedPlayerPosts);
  };
  const deletePlayerPost = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/playerpost/delete`, {
      method: "DELETE",
      body: JSON.stringify(playerPost),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();

    if (response.ok) {
      console.log(json);
      console.log("here");
    } else {
      console.log(json.error);
    }
    const updatedPlayerPosts = playerPosts.filter(
      (acad) => acad.emailID !== json.emailID
    );
    setPlayerPosts(updatedPlayerPosts);
  };

  return (
    <>
      <div className="card mx-2 my-2" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">PlayerPost name: {playerPost.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            number of openings : {playerPost.quantity}
          </h6>
          <p className="card-text">sport: {playerPost.sport}</p>
          <div>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            ></input>
            <button
              className="btn btn-primary my-2"
              onClick={(e) => {
                updatePlayerPost(e, true);
              }}
            >
              Add this amount
            </button>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                updatePlayerPost(e, false);
              }}
            >
              Set this amount
            </button>
            <button className="btn btn-danger mx-2" onClick={deletePlayerPost}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default MypostDisplay;
