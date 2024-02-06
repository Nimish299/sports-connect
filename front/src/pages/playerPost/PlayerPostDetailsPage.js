import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PlayerPostDetailsPage=()=>{
  const navigate=useNavigate()
  const {name}= useParams()
  const [quantity,setQuantity]=useState()
  const gotoPlayerCoach =()=>{
    return navigate('/player/playerCoach');
  }

  useEffect(()=>{
    const getDetails=async()=>{
      const response=await fetch(`/api/playerpost/details/${name}`,{
        method:'GET',
        headers:{
          'Content-type':'application/json'
        }
      })
      const json=await response.json();
      setQuantity(json.quantity);
    }
    getDetails();
  },[])

  return (
    <div>
      <h2>name: {name}</h2>
      <h3>quantity:{quantity}</h3>
      <button onClick={(e)=>{gotoPlayerCoach()}}>back to posts</button>
    </div>
  )
}

export default PlayerPostDetailsPage;