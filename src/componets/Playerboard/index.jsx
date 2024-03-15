import React, { useEffect, useState } from 'react';
import styles from '../../styles/Playerboard.module.css';
const Playerbox = ({roomid, socket}) => {
  const [playerList, updattePlayerList] = useState([]);
  useEffect(()=>{
    socket.on("updatePlayerList",(data)=>{
      console.log(data);
      updattePlayerList(data);
    })
  },[]);
  return (
    <div>
      Playerbox
      {playerList.map((data)=><li>{data.name}   ---   {data.score}</li>)}
    </div>
  )
}

export default Playerbox
