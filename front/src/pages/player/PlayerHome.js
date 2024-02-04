import { useNavigate } from "react-router-dom"

const PlayerHome = () => {


	const navigate=useNavigate()
	const logoutUser=async ()=>{
		console.log("logged out")
		await fetch('/api/player/logout', {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
			}
		})
		console.log("logged out")
		return navigate('/');
		
	}

	const gotoPlayerPlayer =()=>{
		return navigate('/player/playerplayer')
	}

	const gotoPlayerCoach =()=>{
		return navigate('/player/playerCoach')
	}


	return (
		<div>
			<div>
				<button onClick={logoutUser}>sign out</button>
			</div>

			<div>
				<p>do u want to find players in ur area to play sports with???</p>
				<button onClick={gotoPlayerPlayer}>find players</button>
			</div>

			<div>
				<p>do u want to find coaches in ur area to play sports with???</p>
				<button onClick={gotoPlayerCoach}>find coaches</button>
			</div>

		</div>
	)
}

export default PlayerHome