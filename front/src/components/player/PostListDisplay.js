import { useState } from "react"


const PostListDisplay=({playerPost,navigate})=>{
  
  const [errDisplay,seterrDisplay]=useState('');
  const [applied,setApplied]=useState(false);
  const apply=async(e)=>{
    e.preventDefault();
    const name=playerPost.name;
    const item={name};
    const response = await fetch('/api/player/addtostarred',{
      method: 'POST',
      body:JSON.stringify(item),
      headers:{
        'Content-type':'application/json'
      }
    })

    const json=await response.json();
    if(response.ok){
      console.log(json);
      setApplied(true);
    }
    else{
      console.log(json.error);
      seterrDisplay(json.error);
    }

  }

  const acceptadded=(e)=>{
    e.preventDefault();
    seterrDisplay('');
    setApplied(false);
  }


  const gotoPost=(e)=>{
    e.preventDefault();
    return navigate(`/playerpost/${playerPost.name}`)
  }

  return(
    <div>
      <div>
        <h3>name :{playerPost.name} </h3>
        <p>sport : {playerPost.sport}</p>
      </div>
      <div>
      {
        !applied &&
        <div>
          <button onClick={(e)=>{apply(e)}}>add</button>
          <button onClick={(e)=>{gotoPost(e)}}>see details</button>
          {errDisplay && <p>{errDisplay}</p>}
        </div>
      }
      {
        applied &&
        <div>
          <label>added to starred</label>
          <button onClick={(e)=>{acceptadded(e)}}>ok</button>
        </div>  
      }
      </div>
    </div>
  )
}
export default PostListDisplay