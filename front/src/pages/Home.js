import { NavLink } from "react-router-dom"

const Home=()=> {
  return (
    <div>
      <h1>welcome</h1>
      <div>
        <p>breif desc about website here (player point of view) </p>
        <div>
          <NavLink to ='/player/login'>login</NavLink>
        </div>
        <div>
          <NavLink to ='/player/signup'>signup</NavLink>
        </div>
        <div>
          <h3>are you a coach ?? </h3>
          <NavLink to ='/coach'>coach home page</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Home
