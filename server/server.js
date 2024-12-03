//socket - used when talking/contacting to single user; one single user webpage
//io - used when talking/contacting to all users; all webpages using the chat-app
//socket.emit - it'll emit data to that single user
//io.emit - it'll emit data to all users



//require('socket.io') is a function, so connecting with 3000 server PORT
const io = require('socket.io')(3000, {//cors - helps us to connect between client side and server side
    cors: {//as the port numbers are different
        origin: ['http://localhost:80']//8080 is client PORT
    }
});
//const redis = require('redis');//redis
//const client = redis.createClient();//redis
//connecting nodejs to redis
const { createClient } = require('redis');
const client = createClient({host: 'redis', port: 6379});
client.on('error', err => console.log('Redis client error', err));
client.on('connect', () => {
    console.log('Connected to redis');
})

//this function is going to loop through the "messages" array, for each message, it's going to send
//local event and data is going to be the message. This function is used for keeping the messages
//on screen if anyone refreshes the page. local event - refreshes only for the user triggering this msg
function sendMessage(socket) {
    client.lrange("messages", 0, -1, (err, data) => {//similar to "lrange messages 0 -1" in redis"
        data.map(x => {
            const userNameMessage = x.split(":");
            const redisUserName = userNameMessage[0];
            const redisMessage = userNameMessage[1];
            socket.emit("message", {
                name: redisUserName,
                message: redisMessage
            })  
        })
    })
}

//this event happens when everytime when client connects to server
io.on('connection', socket => {
    console.log(socket.id);
    sendMessage(socket);//when user refreshes webpage, the chat should not vanish
    socket.on('send-message', (name, message, room) => {
        //creating array in redis to store messages in format ["username1:message1", "username2:message2"]
        client.rpush("messages", `${name}: ${message}`);//pushing data to the redis array
        if(room === "") {
            //io.emit('receive-message', message);//sends message to all sockets(clients) including sender; check script.js, we're sending 2 displayMessage in this
            socket.broadcast.emit('receive-message', name, message);//sends message to all clients excluding sender
        } else {
            socket.to(room).emit('receive-message', name, message);//room is user-kept name; everyone in that room will receive that msg; to(room) itself takes care of broadcast
        }
    })
    socket.on('join-room', ({room, name}) => {//listens from client here, and does it's job
        socket.join(room);
    })
    socket.on('disconnect', (room) => {
        socket.leave(room);
    })
})

// Updated line for Docker compatibility
// const PORT = process.env.PORT || 3000;
// io.listen(PORT, { '0.0.0.0': PORT }, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
