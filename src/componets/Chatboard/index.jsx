import React, { useEffect, useRef, useState } from 'react';
import styles from "../../styles/Chatbox.module.css";
import { UseSelector, useSelector } from 'react-redux';

const Chatbox = ({roomid,socket}) => {
  const name = useSelector((state)=>state.info.name);
  const chatboxRef = useRef(null);
  const [textData, updateTextData] = useState('');
  const [chatList, uodateChatList] = useState([]);
  useEffect(()=>{
socket.on('recieveChat',(data)=>{
  console.log(data);
  console.log(chatList);
  uodateChatList((prev)=>[...prev,data]);
  console.log(chatboxRef);
  // chatboxRef.current.scrollIntoView();

});
  },[]);
  const emitSend = () => {
    socket.emit("sendChat",{room:roomid,senderId:socket.id,senderName:name,mssg:textData});
  }
  useEffect(()=>{
    console.log(chatboxRef.current.scrollHeight, chatboxRef.current.scrollTop, chatboxRef.current.clientHeight);
    console.log(chatboxRef.current.scrollHeight - chatboxRef.current.scrollTop <= chatboxRef.current.clientHeight + 150);
    if(chatboxRef.current.scrollHeight - chatboxRef.current.scrollTop <= chatboxRef.current.clientHeight + 100){
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    console.log(chatboxRef.current.scrollTop,chatboxRef.current.scrollHeight);
    }
  },[chatList])
  return (  
    <div className={styles.chatbox_container}>
      <div className={styles.header}>Chatbox</div>
      <div className={styles.chat_area} ref={chatboxRef}>
      {chatList.map((data)=><li className={data.match && styles.match}>{data.senderName} {`--->  `} {data.mssg}</li>)}
      </div>
      <div className={styles.input_section}>
      <textarea value={textData} onChange={(e)=>updateTextData(e.target.value)}>
      </textarea>
      <button onClick={emitSend}>Send</button>
      </div>
    </div>
  )
}

export default Chatbox
