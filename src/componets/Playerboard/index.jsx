import React, { useEffect, useState } from 'react';
import styles from '../../styles/Playerboard.module.css';
const Playerbox = ({roomid, socket}) => {
  const [playerList, updattePlayerList] = useState([
    {name:"dcsdc",score:31},
    {name:"dcsdc",score:31},
    {name:"dcsdc",score:31},
    {name:"dcsdc",score:31},
    {name:"dcsdc",score:31}
  ]);
  useEffect(()=>{
    socket.on("updatePlayerList",(data)=>{
      console.log(data);
      updattePlayerList(data);
    })
  },[]);
  return (
    <div className={styles.playbox_container}>
      <div className={styles.header}>Playerbox</div>
      {playerList.map((data)=><li className={styles.header}>
      <div>{data.name}</div>
      <div>{data.score}</div>
      </li>)}
    </div>
  )
}

export default Playerbox
