import React,{useRef,useEffect,useState,useLayoutEffect} from 'react'
import styles from "../../styles/Drawbox.module.css";
import { useSelector } from 'react-redux';
// import { socket } from '../../utils/socket';



const Drawbox = ({roomid,socket}) => {
    const name = useSelector((state)=>state.info.name);

    const drawBoardRef = useRef(null);
    const containerRef = useRef(null);
    const shouldDraw = useRef(false);
    const imageData = useRef(null);
    const [timer, updateTimer] = useState(0);
    const [data, updateData] = useState('');
    const [gameStatus, updateGameStatus] = useState(0);
    const [currentUser, selectCurrentUser] = useState(null);

    const [showSelectWord, setShowSelectWord] = useState([]);

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


    useLayoutEffect(()=>{
        if(!drawBoardRef.current) return;
        console.log("ksanx");
        const canvas = drawBoardRef.current;
        const context = canvas.getContext('2d');



        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;

        canvas.width = 750;
        canvas.height = 400;

//   canvas.style.width ='100%';
//   canvas.style.height='100%';
//   canvas.width  = canvas.offsetWidth;
//   canvas.height = canvas.offsetHeight;



        const beginPath = (x,y) => {
            console.log(context);
            context.beginPath();
            context.moveTo(x + 1,y);
            context.lineTo(x,y + 1);
            context.stroke();

            context.beginPath();
            context.moveTo(x,y);
        };

        const drawLine = (x,y) => {
            console.log("-----------",x,y);
            context.lineTo(x,y);
            context.stroke();
        };

        const handleBeginPath = (path) => {
            console.log("-------------begin-path");
            beginPath(path.x,path.y);
        }

        const handleDrawLine = (path) => {
            console.log("sdcasjkdxbjksbnmxasdmxbasjkbcajksxasxbkasjj");
            drawLine(path.x,path.y);
        }


        const handleMouseDown = (e) => {
            console.log(e.clientX,e.pageX,e.offsetX);
            shouldDraw.current = true;
            beginPath(e.clientX !== undefined ? e.offsetX : e.touches[0].clientX, e.clientY !== undefined ? e.offsetY : e.touches[0].clientY);
            socket.emit('beginPath',{room: roomid, arg:{x: e.clientX !== undefined ? e.offsetX : e.touches[0].clientX, y:e.clientY !== undefined ? e.offsetY : e.touches[0].clientY}});
        }

        const handleMouseMove = (e) => {
            if(!shouldDraw.current) return;
            drawLine(e.clientX !== undefined ? e.offsetX : e.touches[0].clientX, e.clientY !== undefined ? e.offsetY : e.touches[0].clientY);
            socket.emit('drawLine',{room: roomid, arg:{x: e.clientX !== undefined ? e.offsetX : e.touches[0].clientX, y:e.clientY !== undefined ? e.offsetY : e.touches[0].clientY}});
        }

        const handleMouseUp = (e) => {
            shouldDraw.current = false;
            console.log(context.getImageData(0,0,canvas.width,canvas.height));
            console.log(canvas.toDataURL());
            // imageData.current = context.getImageData(0,0,canvas.width,canvas.height);
        }

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);

        canvas.addEventListener('touchstart', handleMouseDown)
        canvas.addEventListener('touchmove', handleMouseMove)
        canvas.addEventListener('touchend', handleMouseUp)


        const updateCounter = (n) =>{
            console.log("timer>>>>>>>>");
            updateTimer(n);
        };

        socket.on('beginPath', handleBeginPath);
        socket.on('drawLine', handleDrawLine);
        socket.on("startGame",()=>{});
        socket.on("timer",(time)=>updateTimer(time));
        socket.on("select",(data)=>{
            console.log("select----",data.list);
            updateGameStatus(1);
            setShowSelectWord(data.list);
        });
        socket.on("selecting",(data)=>{
            selectCurrentUser(data.currentUser);
            updateGameStatus(3);
        });
        socket.on("draw",()=>{
            console.log("drawwwwww");
            updateGameStatus(2);
        });
        socket.on("getDraw",async(user)=>{
            let currentDrawing = "fghh";
            console.log("getdata");
            console.log(user);
            // currentDrawing = await context.getImageData(0,0,canvas.width,canvas.height);
            currentDrawing = await canvas.toDataURL();
            console.log(canvas.toDataURL());
            socket.emit("sendDraw",{newUser:user,"drawing":currentDrawing});
        });
        socket.on("updateDraw",(data)=>{
            updateGameStatus(2);
            // console.log(data);
            var image = new Image();
image.onload = function() {
  context.drawImage(image, 0, 0);
};
        image.src = data;
            // context.putImageData(JSON.parse(data),0,0,canvas.width,canvas.height);
        });

        // socket.on('counter',updateCounter);
//         socket.on('time',(data)=>{updateTimer(data)});
//         socket.on('joined',(d)=>{context.putImageData(d,0,0,canvas.width,canvas.height);console.log("---09876");});
// socket.on('private',(a)=>updateData(a));

    },[]);

    useEffect(() => {
    socket.emit("join",{
        name,
        avatar:"type1",
        room:roomid
    });
    return ()=>{
        socket.emit("removePlayer",socket.id);
    }
    }, []);


  return (
    <div ref={containerRef} className={styles.drawbox_container}>
    {socket.id}
    {gameStatus !== 2 && <div className={styles.canvas_container}>
    {gameStatus === 1 && showSelectWord.map((data)=><li>{data}</li>)}
    {gameStatus === 3 && `${currentUser.name} is selecting word`} 
    </div>}
      <canvas ref={drawBoardRef} style={{background:"grey"}}></canvas>
    </div>
  )
}

export default Drawbox;
