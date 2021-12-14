// Socket.io server configuration
const socket = io("10.25.184.97:1555");
//const socket = io("https://kak-socketio-server.herokuapp.com");

socket.on("connect", () => {
  console.log("Client connected to: " + socket.id);
  online = true;
});

socket.on('private', function(msg) {
  console.log(msg);
})
socket.on("messages", function(data){
  console.log(data);
})

socket.on('send-data', res => {
  console.log(res);
  recieveData(res); 

});

socket.on("disconnect", () => {
  console.log("Client disconnected from" + socket.id); 
});