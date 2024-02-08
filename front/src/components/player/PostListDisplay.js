import { useState } from "react";

const PostListDisplay = ({ playerPost, navigate }) => {
  const [errDisplay, seterrDisplay] = useState("");
  const [applied, setApplied] = useState(false);
  const apply = async (e) => {
    e.preventDefault();
    const name = playerPost.name;
    const item = { name };
    const response = await fetch("/api/player/addtostarred", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-type": "application/json",
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
    seterrDisplay("");
    setApplied(false);

    alert("Added to starred List");
  };

  const gotoPost = (e) => {
    e.preventDefault();
    return navigate(`/playerpost/${playerPost.name}`);
  };

  return (
    
      <div className="card mx-3 my-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">name :{playerPost.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            sport : {playerPost.sport}
          </h6>

          <div>
            {!applied && (
              <div>
                <button
                  className="btn btn-primary btn-sm mx-2"
                  onClick={(e) => {
                    apply(e);
                  }}
                >
                  Add
                </button>
                <button
                  className="btn btn-primary btn-sm mx-2"
                  onClick={(e) => {
                    gotoPost(e);
                  }}
                >
                  See details
                </button>
                {errDisplay && <p>{errDisplay}</p>}
              </div>
            )}
            {applied && (
              <div>
                <label>Added to starred</label>
                <button
                  className="btn btn-danger btn-sm"
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
