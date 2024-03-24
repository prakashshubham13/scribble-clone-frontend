import React,{useRef,useEffect,useState,useLayoutEffect} from 'react'
import styles from "../../styles/Drawbox.module.css";
import { useSelector } from 'react-redux';



const Drawbox = ({room,socket}) => {
    const name = useSelector((state)=>state.info.name);
    const enableCanvas = useSelector((state)=>state.canvas.enableCanvas);
    const host = useSelector((state)=>state.game.host);
    const gameStatus = useSelector((state)=>state.game.gameStatusCode);

    const drawBoardRef = useRef(null);
    const drawDisableRef = useRef(true);
    const containerRef = useRef(null);
    const shouldDraw = useRef(false);
    const [currentUser, selectCurrentUser] = useState(null);
    const [showSelectWord, setShowSelectWord] = useState([]);

    const beginPath = (x,y) => {
        const canvas = drawBoardRef.current;
        const context = canvas.getContext('2d');
        context.beginPath();
        context.moveTo(x + 1,y);
        context.lineTo(x,y + 1);
        context.stroke();
        context.beginPath();
        context.moveTo(x,y);
    };

    const drawLine = (x,y) => {
        const canvas = drawBoardRef.current;
        const context = canvas.getContext('2d');
        context.lineTo(x,y);
        context.stroke();
    };

    const handleBeginPath = (path) => {
        beginPath(path.x,path.y);
    }

    const handleDrawLine = (path) => {
        drawLine(path.x,path.y);
    }


    const handleMouseDown = (e) => {
        
        
        if(drawDisableRef.current) return;
        shouldDraw.current = true;
        beginPath(e.clientX !== undefined ? e.offsetX : e.touches[0].clientX - e.currentTarget.getBoundingClientRect().left, e.clientY !== undefined ? e.offsetY : e.touches[0].clientY - e.currentTarget.getBoundingClientRect().top);
        socket.emit('beginPath',{room: room, arg:{x: e.clientX !== undefined ? e.offsetX : e.touches[0].clientX - e.currentTarget.getBoundingClientRect().left, y:e.clientY !== undefined ? e.offsetY : e.touches[0].clientY - e.currentTarget.getBoundingClientRect().top}});
        }

    const handleMouseMove = (e) => {
        if(drawDisableRef.current) return;
        if(!shouldDraw.current) return;
        drawLine(e.clientX !== undefined ? e.offsetX : e.touches[0].clientX - e.currentTarget.getBoundingClientRect().left, e.clientY !== undefined ? e.offsetY : e.touches[0].clientY - e.currentTarget.getBoundingClientRect().top);
        socket.emit('drawLine',{room: room, arg:{x: e.clientX !== undefined ? e.offsetX : e.touches[0].clientX - e.currentTarget.getBoundingClientRect().left, y:e.clientY !== undefined ? e.offsetY : e.touches[0].clientY - e.currentTarget.getBoundingClientRect().top}});
    }

    const handleMouseUp = (e) => {
        shouldDraw.current = false;
    }

    useLayoutEffect(()=>{

        if(!drawBoardRef.current) return;
        const canvas = drawBoardRef.current;
        const context = canvas.getContext('2d');
        const { innerWidth: width, innerHeight: height } = window;

        // canvas.width = 750;
        // canvas.height = 400;

        if (width <= 768) { // Mobile view
            canvas.width = width * 0.8; // Example: 80% of the viewport width
            canvas.height = height * 0.5; // Example: 50% of the viewport height
          } else { // Desktop view
            canvas.width = width * 0.6; // Example: 60% of the viewport width
            canvas.height = height * 0.7; // Example: 70% of the viewport height
          }
    

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);

        canvas.addEventListener('touchstart', handleMouseDown)
        canvas.addEventListener('touchmove', handleMouseMove)
        canvas.addEventListener('touchend', handleMouseUp)


        socket.on('beginPath', handleBeginPath);
        socket.on('drawLine', handleDrawLine);
        socket.on("getDraw",async(user)=>{
            let currentDrawing;
            currentDrawing = await canvas.toDataURL();
            socket.emit("sendDraw",{newUser:user,"drawing":currentDrawing});
        });
        socket.on("updateDraw",(data)=>{
            var image = new Image();
image.onload = function() {
  context.drawImage(image, 0, 0);
};
        image.src = data;
        });


        socket.on("select",(data)=>{
            console.log("select----",data.list);
            setShowSelectWord(data.list);
        });
        
        socket.on('clearCanvas',()=>{
            context.clearRect(0,0,canvas.width,canvas.height);
            drawDisableRef.current = true;
        });

        socket.on('draw',()=>{
            drawDisableRef.current = false;
        });

    },[]);
    const selectWord = (e,data) => {
        socket.emit('wordSelected',{word:data,room:room})
    }
    const requestStartGame = () => {
        socket.emit("requestStartGame",room);
    }
    useEffect(() => {
        console.log("useeffect >>>>>>>>>>>>>>>>>>>");
    socket.emit("join",{
        name,
        avatar:"type1",
        room:room
    });
    return ()=>{
        socket.emit("removePlayer",socket.id);
    }
    }, []);


  return (
        /**
     * status code
     * 0:start game
     * 1:waiting for host to start game
     * 2:please select current word
     * 3:player xyz is selecting word
     * 4:complate the drawing
     * 5:player xyz is drawing
     * 6:show score
     */
    <div ref={containerRef} className={styles.drawbox_container}>
    {gameStatus !== 4 && gameStatus !== 5 && <div className={styles.canvas_container}>
    {gameStatus === 0 && host.id === socket.id && <button onClick={requestStartGame}>Start Game</button>} 
    {gameStatus === 0 && host.id !== socket.id && `Waiting for ${host.name} to start game`} 
    {gameStatus === 2 && showSelectWord.map((data)=><li onClick={(e)=>selectWord(e,data)}>{data}</li>)}
    {gameStatus === 3 && `${host.name} is selecting word`} 
    </div>}
      <canvas ref={drawBoardRef} style={{background:"grey"}}></canvas>
    </div>
  )
}

export default Drawbox;
