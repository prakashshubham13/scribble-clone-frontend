import React,{useState,useEffect, useLayoutEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../styles/Home.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { changeName } from '../slice/infoSlice.js'

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const Home = ({socket}) => {
  console.log("sfcdc");
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const[errorMssg,setErrorMssg] = useState('');

    useLayoutEffect(() => {
      console.log(socket);
    socket.on("allow",({id,mssg})=>{
      if(id === true){
        navigate(`/dashboard`);
      }else{
        setErrorMssg(mssg);
      }
    });
    }, []);

    const [formData, updateFormData] = useState({
      'form1_name':'',
      'form2_name':'',
      'form2_code':'',
    });

    const changeFormData = (e) => {
      console.log(e,e.target.name,e.target.value);
      updateFormData((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    const createRoom = () => {
      let roomid = generateString(6);
      dispatch(changeName({name: formData.form1_name,room:roomid}));
        socket.emit('createRoom',{name:formData.form1_name,room:roomid});
    }

    const joinRoom = () => {
        dispatch(changeName({name: formData.form2_name, room:formData.form2_code}));
        socket.emit('joinRoom',{name:formData.form2_name,room:formData.form2_code});
        navigate(`/dashboard`);
    }
  return (
    <div className={styles.form_container}>
     {errorMssg}
     <div className={styles.form}>
     <fieldset>
     <legend>Create Room</legend>
     <div>
     <div><input name='form1_name' placeholder='Enter Name' value={formData.form1_name} onChange={(e)=>changeFormData(e)}/></div>
     <button onClick={createRoom}>Create New Room</button>
     </div>
     </fieldset>
     Or
     <fieldset>
     <legend>Join Room</legend>
     <div>
     <div><input name='form2_name' placeholder='Enter Name' value={formData.form2_name} onChange={(e)=>changeFormData(e)}/>
     <input name='form2_code' placeholder='Enter Room Id' onChange={(e)=>changeFormData(e)}/>
     </div>
     <button onClick={joinRoom}>Join Room</button>
     </div>
     </fieldset>
     </div>
    </div>
  )
}

export default Home
