import {useNavigate} from "react-router-dom"
import MypostDisplay from "../../components/player/MypostDisplay"
import { useEffect,useState } from "react"

const MyPosts = () => {
	const navigate=useNavigate()
	const [playerPosts,setPlayerPosts]=useState([]);

	const [name,setName]=useState('');
	const [quantity,setQuantity]=useState(0);
	const [sport,setSport]=useState('');
	const [errDisplay,seterrDisplay]=useState('');

	useEffect(()=>{
		const run=async()=>{
			const response=await fetch('/api/playerpost/allplayer', {
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
				}
			})
			const json=await response.json()

			if (response.ok) {
				console.log(json)
				setPlayerPosts(json);
			}
			else {
				console.log(json.error)
			}
		}
		run();

	},[])

	const addacad =async (e)=>{
		e.preventDefault();
		const playerPost={name,quantity,sport}
		const response = await fetch(`/api/playerpost/create`, {
			method: 'POST',
			body: JSON.stringify(playerPost),
			headers: {
				'Content-type': 'application/json',
			}
		})
		const json =await  response.json()
		if (response.ok) {
			console.log(json)
			setName('');
			setQuantity(0);
			setSport('');
			seterrDisplay('');
			setPlayerPosts((prev)=>[...prev ,playerPost])
		}
		else {
			console.log(json.error)
			seterrDisplay(json.error)
		}
	}

  const gotoplayerplayer=(e)=>{
    e.preventDefault()
    return navigate('/player/playerplayer')
  }

	return (
		<div>
      <div>
        <button onClick={(e)=>gotoplayerplayer(e)}>back</button>
      </div>
			<div>
				<h2>add playerPost</h2>
				<form onSubmit={addacad}>
					<div>
						<label>name </label>
						<input 
            type='text'
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
          	/> 
					</div>
					<div>
						<label>quantity </label>
						<input 
            type='number'
            value={quantity}
            onChange={(e)=>{setQuantity(e.target.value)}}
          	/> 
					</div>
					<div>
						<label>category </label>
						<input 
            type='text'
            value={sport}
            onChange={(e)=>{setSport(e.target.value)}}
          	/> 
					</div>
					<button> add</button>
				</form>
				<div>
					{errDisplay && <p>{errDisplay}</p>}
				</div>
			</div>
			<div>
				<h1>u have added all these playerPost openings</h1>
			</div>
			<div>
				{playerPosts && playerPosts.map((acad)=>(
					<MypostDisplay key={acad.name} playerPosts={playerPosts} setPlayerPosts={setPlayerPosts} playerPost={acad} />
				))}
			</div>
			
		</div>
	)
}
export default MyPosts