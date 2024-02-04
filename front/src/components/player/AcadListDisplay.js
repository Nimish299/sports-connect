
const AcadListDisplay=({academy,navigate})=>{
  
  const gotoAcad=(e)=>{
    e.preventDefault();
    return navigate(`/academy/${academy.name}`)
  }

  return(
    <div>
      <div>
        <h3>name :{academy.name} </h3>
        <p>sport : {academy.sport}</p>
        <button onClick={(e)=>{gotoAcad(e)}}>see details</button>
      </div>
    </div>
  )
}
export default AcadListDisplay