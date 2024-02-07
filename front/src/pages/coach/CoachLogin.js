import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const CoachLogin = () => {
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [errDisplay, seterrDisplay] = useState("");
  const navigate = useNavigate();

  const LoginFormSubmit = async (e) => {
    e.preventDefault();
    const coach = { emailID, password };
    const response = await fetch(`/api/coach/login`, {
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
      <div className="h-100 d-flex align-items-center justify-content-center">
        <form className="loginForm" onSubmit={LoginFormSubmit}>
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <div>{errDisplay && <p>{errDisplay}</p>}</div>

      <div>
        <NavLink className="btn btn-primary my-3" to="/coach">
          back
        </NavLink>
      </div>
    </>
  );
};

export default CoachLogin;
