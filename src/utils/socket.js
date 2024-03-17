import { io } from "socket.io-client";
// const URL = 'http://localhost:5000'
const URL = 'https://scribble-clone-backend.onrender.com';
export const socket = io(URL);
console.log(socket);