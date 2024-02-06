import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const PlayerSignup = () => {
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [errDisplay, seterrDisplay] = useState("");
  const [name,setName] = useState("");
  const [cpassword,setCpassword] = useState("");
  
  const navigate = useNavigate();

  const LoginFormSubmit = async (e) => {
    e.preventDefault();
    const user = { emailID, password };
    const response = await fetch(`/api/player/signup`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();

    if (response.ok) {
      console.log(json);
      return navigate("/player/home");
    } else {
      console.log(json.error);
      seterrDisplay(json.error);
    }
  };

  return (
    
      <div>
        <form onSubmit={LoginFormSubmit}>

            <div className="mb-3">
            <label  className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            
          </div>



          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={emailID}
              onChange={(e) => setEmailID(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>

        <div>{errDisplay && <p>{errDisplay}</p>}</div>
        <div>
          <NavLink to="/">back</NavLink>
        </div>
      </div>

      
    
  );
};

export default PlayerSignup;
