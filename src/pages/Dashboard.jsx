import {useEffect, useLayoutEffect} from 'react';
import styles from "../styles/Dashboard.module.css";
import Infobox from '../componets/Infoboard';
import Playerbox from '../componets/Playerboard';
import Drawbox from '../componets/Drawboard';
import Chatbox from '../componets/Chatboard';
import { useParams,useNavigate } from 'react-router-dom';
import { socket } from '../utils/socket';
import { useSelector } from 'react-redux';
import { updateGameStatusCode, updateHint, updateHost } from '../slice/gameSlice';
import { UseSelector, useDispatch } from 'react-redux';
import { updatePlayerList } from '../slice/playerSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const name = useSelector((state)=>state.info.name);
    const room = useSelector((state)=>state.info.room);
    useEffect(() => {
    socket.on('dissolveRoom',()=>{
      navigate('/');
    });
    if(!room || !name)
    navigate('/');
    return () => {
    // socket.emit("leaveRoom",room);
    };
    }, []);
  return (
    <div className={styles.dashboard_container}>
      <div className={styles.column}>
      <Infobox/>
      <div className={`${styles.row} ${styles.column_s_e}`}>
      <div className={`${styles.item} ${styles.item1}`}><Playerbox socket={socket}/></div>
      <div className={`${styles.item} ${styles.item2}`}><Drawbox room={room} socket = {socket}/></div>
      <div className={`${styles.item} ${styles.item3}`}><Chatbox room={room} socket = {socket}/></div>
      </div>
      </div>
    </div>
  )
}

export default Dashboard
