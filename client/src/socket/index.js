import createNotification from '../components/notification';
import {server} from "../config.js";

const socket = io({autoConnect:false});

socket.on("recLogin", function(data) {
  createNotification(data.username, '上线了', server+'/'+data.avater);
  console.log(data);
});

socket.on("recLogout", function(data) {
  console.log(data);
});

socket.on('recMessages', (data)=>{
	console.log('recMessages');
	console.log(data);
});

export default socket;