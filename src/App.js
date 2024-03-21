import React,{useEffect} from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { UseSelector,useDispatch } from 'react-redux'
import { socket } from './utils/socket'
import { updatePlayerList } from './slice/playerSlice'
import { updateGameStatusCode, updateHint, updateHost, updateRoundNumber, updateWord } from './slice/gameSlice'
import { enableCanvas } from './slice/canvasSlice'

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on('updatePlayerList',(data)=>{
      console.log(data);
      dispatch(updatePlayerList(data));
    });
    socket.on("updateHost",(data)=>{
      dispatch(updateHost(data));
  });
    socket.on("startGame",()=>{
      dispatch(updateGameStatusCode(0));
  });
    socket.on("select",()=>{
      dispatch(updateGameStatusCode(2));
  });
  socket.on("selecting",()=>{
      dispatch(updateGameStatusCode(3));
  });
  socket.on("drawing",(data)=>{
    dispatch(enableCanvas(false));
    dispatch(updateGameStatusCode(5));
    dispatch(updateWord(data));
  });
  socket.on("draw",(data)=>{
    dispatch(enableCanvas(true));
    dispatch(updateGameStatusCode(4));
    dispatch(updateWord(data));
  });
  socket.on("updateRoundNumber",(data)=>{
    dispatch(updateRoundNumber(data));
  });
  socket.on("revealWord",(data)=>{
    dispatch(updateHint(data));
  })},[]);
  socket.on('roundend',()=>{
    dispatch(enableCanvas(false));
    dispatch(updateGameStatusCode(6));
    dispatch(updateHint(''));
  })
  return (
    <RouterProvider router={router}/>
  )
}

export default App;
