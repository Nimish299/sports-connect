import { NavLink } from "react-router-dom"

const CoachWelcome=()=> {
  return (
    <div>
      <h1>welcome coach</h1>
      <div>
        <div>
          <NavLink to ='/coach/login'>login</NavLink>
        </div>
        <div>
          <NavLink to ='/coach/signup'>signup</NavLink>
        </div>
        <div>
          <NavLink to ='/'>back</NavLink>
        </div>
      </div>
    </div>
  )
}

export default CoachWelcome
