import { useNavigate } from "react-router-dom"

const PlayerPlayer =()=>{
  const navigate=useNavigate()
  const gotoPlayerHome=()=>{
    return navigate('/player/home')
  }
  return (
    <div>
      <div>
        <button onClick={gotoPlayerHome}>back</button>
      </div>
      <h3>these are the players around you</h3>
      
    </div>
  )
}

export default PlayerPlayer;