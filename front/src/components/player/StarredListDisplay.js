
const StarredListDisplay =({playerPost,playerPosts,setPlayerPosts})=>{

  const deletePlayerPost = async(e)=>{
    e.preventDefault()
    console.log(playerPost);
    const response = await fetch(`/api/player/removefromstarred`, {
			method: 'DELETE',
			body: JSON.stringify(playerPost),
			headers: {
				'Content-type': 'application/json',
			}
		})
    console.log(response);
    const json=await response.json()
    console.log(json);
    const updatedApplied=playerPosts.filter((post)=>post!==playerPost);
    setPlayerPosts(updatedApplied);
  }

  return(
    <div>
      <h4>name : {playerPost.name}</h4>
      <button onClick={(e)=>{deletePlayerPost(e)}}>unstar this PlayerPost </button>
    </div>
  )
}

export default StarredListDisplay