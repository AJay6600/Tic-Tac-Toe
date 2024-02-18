import React, { useState } from 'react'

function Player({initialName,symbol,isActive,onChangeName}) {
    const [isEditing,setIsEditing] = useState(false);
    const [name,setName] = useState(initialName)
    function handleEdit(){
        setIsEditing(!isEditing)

        if(isEditing){
            onChangeName(symbol,name)
        }
    }

    function handleChange (e){
        setName(e.target.value);
    }

   let playerName = <span className="player-name">{name}</span>;
   if(isEditing)
   {
    playerName = <input type="text" required  defaultValue={name} onChange={handleChange}/>
   }
   

  return (
    <li className={isActive ? 'active':undefined}>
    <span className="player">
        {playerName}
    {/* <span className="player-name">{name}</span> */}
    <span className="player-symbol">{symbol}</span>
    <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
    </span>
  </li>
  )
}

export default Player