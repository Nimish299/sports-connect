import { useState } from "react"

const MypostDisplay=({playerPost,setPlayerPosts,playerPosts})=>{

  const [quantity,setQuantity]=useState(0);

  const updatePlayerPost=async (e,istrue)=>{
    e.preventDefault();
    
    if(istrue){
      let temp=parseInt(playerPost.quantity,10)+parseInt(quantity,10)
      playerPost.quantity=temp
    }
    else{
      playerPost.quantity=quantity
    }

    const response = await fetch(`/api/playerpost/updatequantity`, {
			method: 'PATCH',
			body: JSON.stringify(playerPost),
			headers: {
				'Content-type': 'application/json',
			}
		})
		const json =await  response.json()

		if (response.ok) {
			console.log(json)
		}
		else {
			console.log(json.error)
		}
		const updatedPlayerPosts=playerPosts.map(acad=>{
      if(acad.name ===playerPost.name)
      {
        acad.quantity=playerPost.quantity;
      }
      return acad
    })
		setPlayerPosts(updatedPlayerPosts)
  }
  const deletePlayerPost=async (e)=>{
    e.preventDefault();

    const response = await fetch(`/api/playerpost/delete`, {
			method: 'DELETE',
			body: JSON.stringify(playerPost),
			headers: {
				'Content-type': 'application/json',
			}
		})
		const json =await  response.json()

		if (response.ok) {
			console.log(json)
      console.log("here")
		}
		else {
			console.log(json.error)
		}
		const updatedPlayerPosts=playerPosts.filter((acad)=>acad.emailID!==json.emailID)
		setPlayerPosts(updatedPlayerPosts)

  }

  return(
    <div>
      <div>
        <div>
          <h5>playerPost name: {playerPost.name}</h5>
        </div>
        <div>
          <p>number of openings : {playerPost.quantity}</p>
        </div>
        <div>
          <p>sport: {playerPost.sport}</p>
        </div>
        <button onClick={deletePlayerPost}>delete</button>
        <div>
          <input 
            type='number'
            value={quantity}
            onChange={(e)=>{setQuantity(e.target.value)}}
          />  
          <button onClick={(e)=>{updatePlayerPost(e,true)}}>add this amount</button>
          <button onClick={(e)=>{updatePlayerPost(e,false)}}>set this amount</button>
          
        </div>
      </div>
    </div>
  )
}
export default MypostDisplay