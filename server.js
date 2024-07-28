const express = require('express')
const app = express()
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const socketSever = require('./socket_server');
const socket = require("socket.io");

dotenv.config({path: './.env'});

const port = 3001;

var cors = require('cors')
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

// get image in file upload
app.use('/upload', express.static('Upload'));
app.use('/uploads',require("./Route/upload.route"));
app.use('/user',require('./Route/user.route'));
app.use('/post',require('./Route/post.route'));
app.use('/messenges',require('./Route/messenges.route'));
app.use('/friends',require('./Route/friend.route'));
app.use('/notification',require('./Route/notification.route'));
app.use('/profile',require('./Route/profile.route'));
app.use('/detect',require('./Route/detect.route'));

const server = app.listen(port,()=>console.log(`App listening at http://localhost:${port}`))


const io = socket(server,{
    cors: {
        origin: "*",
		methods: [ "GET", "POST" ]
    }
});

io.on("connection", (socket) => {
    socketSever(socket,io);
})
