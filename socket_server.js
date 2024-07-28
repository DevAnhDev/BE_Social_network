const { get_Current_User, user_Disconnect, 
    join_User,get_UserToSend,checkUserCalling,
    removeUserCalling,filterUserOnline,updateLastLogin} = require("./dummyuser");

const messSocket = require('./ControllerSocket/mess.socket.controller');
const notificationSocket = require('./ControllerSocket/notification.socket.controller');
const postSocket = require('./ControllerSocket/post.socket.controller');

const socketSever = (socket,io)=>{
 
    socket.on('joinUser', user => {
        const currenUser = get_Current_User(socket.id);
        if(!currenUser){
            join_User(socket.id,user.idUser,user.followers);
            //Update online
            io.to(socket.id).emit("changeJoin")
            user.followers.forEach(e=>{
                const user_to_send = get_UserToSend(e.sourceId);
                user_to_send.forEach(p=>{
                    io.to(p.socketId).emit("changeJoin")
                })
            })
        }
    })

    //Handle socket message
    messSocket(socket,io);

    //Handle socket notify
    notificationSocket(socket,io);


    //Handle socket postSocket
    postSocket(socket,io);

    //Check online
    socket.on("checkUserOnline", (data)=>{
        const userOnline = filterUserOnline(data.followings)
        io.to(socket.id).emit("getUserOnline",userOnline);
    })

    //when the user exits the room
    socket.on("disconnect", () => {
        console.log("disconnect");
        //the user is deleted from array of users and a left room message displayed
        
        //Update Online
        const currenUser = get_Current_User(socket.id);
        if(currenUser){
            updateLastLogin(currenUser.idUser);
            currenUser.followers.forEach(e=>{
                const user_to_send = get_UserToSend(e.sourceId);
                user_to_send.forEach(p=>{
                    io.to(p.socketId).emit("changeJoin")
                })
            })
        }
        //remove if calling
        const calling = checkUserCalling(socket.id);
        if(calling){
            let i = 0;
            calling.forEach(e=>{
                socket.broadcast.to(e.targetId).emit("user-left-call",{positionSocket:i});
                socket.broadcast.to(e.sourceId).emit("user-left-call",{positionSocket:i});
                i++;
            })
            removeUserCalling(socket.id)
        }
        user_Disconnect(socket.id);
    });

    //Disconnet when log out
    socket.on('end', ()=>{
        socket.disconnect(0);
    });
}

module.exports = socketSever;