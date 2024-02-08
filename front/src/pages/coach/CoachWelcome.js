import { NavLink , Link} from "react-router-dom";

const CoachWelcome = () => {
  return (
    <div>
      <h2>
        Welcome, where passionate coaches connect
        with eager students to elevate their sports performance to new heights.
        As a coach on our platform, You can guide and inspire athletes
        on their journey to success.
      </h2>
      <div>
        <div>
          <NavLink className = "btn btn-primary my-2" to="/coach/login">login</NavLink>
        </div>
        <div>
          <NavLink className = "btn btn-primary my-2" to="/coach/signup">signup</NavLink>
        </div>
        <div>
          <NavLink className = "btn btn-primary my-2" to="/">back</NavLink>
        </div>
      </div>
    </div>
  );
};

export default CoachWelcome;
