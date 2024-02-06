import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StarredListDisplay from "../../components/player/StarredListDisplay";

const StarredPosts=()=>{

  const navigate=useNavigate();
  const [playerPosts,setPlayerPosts]=useState([]);

  const gotoplayerplayer=()=>{
    navigate('/player/playerplayer');
  }


  useEffect(()=>{
    const getPlayerPosts=async()=>{

      const response=await fetch('/api/player/starred',{
        method:'GET',
        headers:{
          'Content-type':'application/json'
        } 
      })
      const json=await response.json();
      const player=json.player;

      console.log(json);
      console.log("ok"); 
      setPlayerPosts(player.starred);
      console.log(playerPosts);
    }
 
    getPlayerPosts()

  },[])

  return(
    <div>
      <button onClick={gotoplayerplayer}>go back to available PlayerPost list</button>
      <h2>your starred posts</h2>
      {playerPosts && 
      <div>
      <div>
        {playerPosts.map((playerPost)=>(<StarredListDisplay key={playerPost.name} playerPost={playerPost} playerPosts={playerPosts} setPlayerPosts={setPlayerPosts} /> ))}
      </div>  
      </div>}
      {!playerPosts && <h4>empty  </h4>}
    </div>
  )

}

export default StarredPosts;