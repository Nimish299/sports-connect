import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"
import PostListDisplay from "../../components/player/PostListDisplay"

const PlayerCoach = () => {

	const [playerPosts,setPlayerPosts]=useState([])
	const [sport,setSport]=useState([])

	const [filterinUse,setFilterinUse]=useState(false)

	const run=async()=>{
		const response=await fetch('/api/playerpost/allplayerposts',{
			method:'GET',
			headers:{
				'Content-type':'application/json'
			}
		})
		const json=await response.json()

		if(response.ok){
			setPlayerPosts(json);
		}
		else{
			console.log(json.error)
		}
	}

	useEffect(()=>{
		
		run()
	},[])

	const navigate=useNavigate()
	const gotoPlayerHome=()=>{
    return navigate('/player/home')
  }

	const filterPlayerPosts=async ()=>{
		const response =await fetch(`/api/playerpost/sport/${sport}`,{
			method:'GET',
			headers:{
				'Content-type':'application/json'
			}
		})
		const json =await response.json();
		setPlayerPosts(json);
		setFilterinUse(true);
	}
	
	const removeFilter=()=>{
		run();
		setFilterinUse(false);
	}
	const redirecttoapplied=()=>{
		return navigate('/player/starred')
	}
  const redirecttomyposts=()=>{
		return navigate('/player/myposts')
	}

	return (
		<div>
			<div>
				<button onClick={gotoPlayerHome}>back</button>
			</div>
			<div>
				<button onClick={redirecttoapplied}>go to starred posts</button>
			</div>
      <div>
				<button onClick={redirecttomyposts}>see all your posts</button>
			</div>

			<div>
				{
					!filterinUse &&
					<div>
							<button onClick={filterPlayerPosts}>filter based on sport</button>
						<input 
							type="text"
							value={sport}
							onChange={(e)=>{setSport(e.target.value)}}
						/>
					</div>	
					
				}
				{
					filterinUse &&
					<div>
						<h3>filtered category is : {sport}</h3>
						<button onClick={removeFilter}>remove filter</button>
					</div>	
				}
			</div>
			<h2>these are the available PlayerPosts</h2>

			<div>
				{playerPosts && playerPosts.map((post)=>(
					<PostListDisplay key={post.name} playerPost={post} navigate={navigate}/>
				))}
			</div>
		</div>
	)
}

export default PlayerCoach