import { NavLink, useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const CoachSignup = () => {
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [errDisplay, seterrDisplay] = useState("");
  const navigate = useNavigate();

  const SignupFormSubmit = async (e) => {
    e.preventDefault();
    const coach = { emailID, password };
    const response = await fetch(`/api/coach/signup`, {
      method: "POST",
      body: JSON.stringify(coach),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();

    if (response.ok) {
      console.log(json);
      return navigate("/coach/home");
    } else {
      console.log(json.error);
      seterrDisplay(json.error);
    }
  };

  return (
	<>
    <div className= "h-100 d-flex align-items-center justify-content-center">
    
      <form className="SignupForm" onSubmit={SignupFormSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
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
            value={emailID}
            onChange={(e) => setEmailID(e.target.value)}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
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
            name="password"
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
            name="cpassword"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={cpassword}
            onChange={(e) => {
              setCpassword(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>

      
      
    </div>
	<Link class="btn btn-primary" to="/" role="button">
	Back
  </Link>
  <div>{errDisplay && <p>{errDisplay}</p>}</div>
  </>
  );
};

export default CoachSignup;
