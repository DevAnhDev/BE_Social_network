const { get_Current_User ,get_UserToSend } = require("../dummyuser");

const notificationSocket = (socket,io)=>{

    socket.on("requestAddFriend", (data)=>{
        const user_to_send = get_UserToSend(data.idToSend);
        if(user_to_send){
            user_to_send.forEach(e=>{
                io.to(e.socketId).emit("notifyRequestAddFriend",data);
            })
        }
    })
    socket.on("cancelAddFriend", (data)=>{
        const user_to_send = get_UserToSend(data.idToSend);
        if(user_to_send){
            user_to_send.forEach(e=>{
                io.to(e.socketId).emit("sendcancelAddFriend",{"idUser":data.idUser});
            })
        }
    })
    socket.on("acceptAddFriend", (data)=>{
        const user_to_send = get_UserToSend(data.idToSend);
        if(user_to_send){
            user_to_send.forEach(e=>{
                io.to(e.socketId).emit("sendAcceptAddFriend",data);
            })
        }
    })
    socket.on("rejectAddFriend", (data)=>{
        const user_to_send = get_UserToSend(data.idToSend);
        if(user_to_send){
            user_to_send.forEach(e=>{
                io.to(e.socketId).emit("sendRejectAddFriend",{"idUser":data.idUser});
            })
        }
    })
    socket.on("removeFriend", (data)=>{
        const user_to_send = get_UserToSend(data.idToSend);
        if(user_to_send){
            user_to_send.forEach(e=>{
                io.to(e.socketId).emit("sendRemoveFriend",{"idUser":data.idUser});
            })
        }
    })
}

module.exports = notificationSocket