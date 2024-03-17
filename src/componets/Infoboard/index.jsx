import React,{useEffect,useState} from 'react'
import {socket} from '../../utils/socket.js'
import styles from '../../styles/InfoBoard.module.css'


const Infobox = () => {
  const status = (code, time, data= null) => {
    let value;
    switch(code){
        case 1: 
        value = 'Need atleast 2 player to start';
        break;
        case 2:
            value = "Select one word";
        break;
        case 3:
            value = `${data} is selecting word`;
        break;
        case 4:
            value = `/60 seconds left to complete the drawing`;
        break;
        case 5:
            value = `/60 seconds left to guess the word`;
        break;
        case 6:
            value = "";
        break;
        case 7:
            value = "";
        break;
        default:
            break;
    }
    updateGameStatus(value);
};

const [gameStatus, updateGameStatus] = useState('Need atleast 2 player to start');
const [timer, updateTimer] = useState(0);
  useEffect(() => {
    socket.on("startGame",()=>status(1,timer));
    socket.on("timer",(time)=>updateTimer(time));
    socket.on("select",(data)=>status(2,timer,'player1'));
    socket.on("selecting",()=>status(3,timer));
    // socket.on("draw",()=>status(4,timer));
  }, [])
  return (
    <div className={styles.infonox_container}>
    <div>Rank</div>
    <div>{gameStatus}</div>
      <div>{60 - timer}/60 seconds</div>
    </div>
  )
}

export default Infobox
