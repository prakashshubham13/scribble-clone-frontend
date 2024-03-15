import {useEffect, useLayoutEffect} from 'react';
import styles from "../styles/Dashboard.module.css";
import Infobox from '../componets/Infoboard';
import Playerbox from '../componets/Playerboard';
import Drawbox from '../componets/Drawboard';
import Chatbox from '../componets/Chatboard';
import { useParams,useNavigate } from 'react-router-dom';
import { socket } from '../utils/socket';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const navigate = useNavigate();
    const {roomid} = useParams();
    const name = useSelector((state)=>state.info.name);
    useLayoutEffect(() => {
      if(!roomid || !name)
      navigate('/');
      return () => {
        socket.emit("leaveRoom",{userId:socket.id,room:roomid});
      };
    }, []);
  return (
    <div className={styles.dashboard_container}>
      <div className={styles.column}>
      <Infobox/>
      <div className={`${styles.row} ${styles.column_s_e}`}>
      <Playerbox roomid={roomid} socket = {socket}/>
      <Drawbox roomid={roomid} socket = {socket}/>
      <Chatbox roomid={roomid} socket = {socket}/>
      </div>
      </div>
    </div>
  )
}

export default Dashboard
