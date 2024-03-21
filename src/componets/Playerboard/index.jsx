import styles from '../../styles/Playerboard.module.css';
import { useSelector } from 'react-redux';

const Playerbox = ({socket}) => {
  const playerList = useSelector((state)=>state.player.playerList);
  const hostDetail = useSelector((state)=>state.game.host);
  return (
    <div className={styles.playbox_container}>
      <div className={styles.header}>Playerbox</div>
      {playerList.map((data)=><li className={`${data.guess ? styles.success : ''} ${hostDetail.id === data.id ? styles.host : styles.a} ${data.id === socket.id ? styles.user : ''}`} key={data.id}>
      <div>{data.name}</div>
      <div>{data.score}</div>
      </li>)}
    </div>
  )
}

export default Playerbox
