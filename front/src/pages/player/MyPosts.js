import { useNavigate } from "react-router-dom";
import MypostDisplay from "../../components/player/MypostDisplay";
import { useEffect, useState } from "react";

const MyPosts = () => {
  const navigate = useNavigate();
  const [playerPosts, setPlayerPosts] = useState([]);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [sport, setSport] = useState("");
  const [errDisplay, seterrDisplay] = useState("");

  useEffect(() => {
    const run = async () => {
      const response = await fetch("/api/playerpost/allplayer", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const json = await response.json();

      if (response.ok) {
        console.log(json);
        setPlayerPosts(json);
      } else {
        console.log(json.error);
      }
    };
    run();
  }, []);

  const addacad = async (e) => {
    e.preventDefault();
    const playerPost = { name, quantity, sport };
    const response = await fetch(`/api/playerpost/create`, {
      method: "POST",
      body: JSON.stringify(playerPost),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();
    if (response.ok) {
      console.log(json);
      setName("");
      setQuantity(0);
      setSport("");
      seterrDisplay("");
      setPlayerPosts((prev) => [...prev, playerPost]);
    } else {
      console.log(json.error);
      seterrDisplay(json.error);
    }
  };

  const gotoplayerplayer = (e) => {
    e.preventDefault();
    return navigate("/player/playerplayer");
  };

  return (
    <div>
      
      <div>
        <h2>Add playerPost</h2>
        

        <form style ={{maxWidth: '500px'}}onSubmit={addacad}>
          <div class="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              class="form-control"
              id="name"
              aria-describedby="emailHelp"
              placeholder="Enter Name"
            />
          </div>
          <div class="form-group">
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              class="form-control"
              id="quantity"
              aria-describedby="emailHelp"
              placeholder="Enter Quantity"
            />
          </div>
          <div class="form-group">
            <label>Category</label>
            <input
              value={sport}
              onChange={(e) => {
                setSport(e.target.value);
              }}
              type="number"
              class="form-control"
              id="sport"
              placeholder="Enter Quantity"
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Add
          </button>
        </form>

        <div>{errDisplay && <p>{errDisplay}</p>}</div>
      </div>
      <div>
        <h1>u have added all these playerPost openings</h1>
      </div>
      <div className="row">
        {playerPosts &&
          playerPosts.map((acad) => (
            <MypostDisplay
              key={acad.name}
              playerPosts={playerPosts}
              setPlayerPosts={setPlayerPosts}
              playerPost={acad}
            />
          ))}
      </div>
	  <div>
        <button className ="btn btn-primary" onClick={(e) => gotoplayerplayer(e)}>back</button>
      </div>
    </div>
  );
};
export default MyPosts;
