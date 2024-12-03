import {io} from 'socket.io-client';
//io - used to get the individual socket

const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");
const nameInput = document.getElementById("name-input");

const socket = io('http://localhost:80');//connecting to server

//this display to which id the socket is connected(in chat)
socket.on('connect', () => {
    displayMessage(`You're connected with id: ${socket.id}`);
})

socket.on("message", (data) => {
    const redisUserName = data.name;
    const redisMessage = data.message;
    displayMessage(redisUserName, redisMessage);
})

socket.on('receive-message', (clientId, message) => {//we're getting the message from server
    displayMessage(clientId, message);
})

//when we submit the form, it'll call displayMessage
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    const room = roomInput.value;
    const name = nameInput.value;
    if(message === "") return;
    displayMessage(name, message);
    socket.emit('send-message', name, message, room);//we're sending message from the clinet's input
    messageInput.value = "";
})

//this is used in joining rooms
joinRoomButton.addEventListener("click", () => {
    const room = roomInput.value;
    const name = nameInput.value;
    socket.emit('join-room', {room, name}, message => {
        displayMessage(socket.id, message);//this is a callback function; like it'll be notified like "Joined ${room}"
    });//join-room will take in the room we wanna join; (listen this in server side)
})

//it displays the message in the chat
function displayMessage(clientId, message) {
    const div = document.createElement("div");
    div.textContent = `${clientId}: ${message}`;
    document.getElementById("message-container").append(div);
}
