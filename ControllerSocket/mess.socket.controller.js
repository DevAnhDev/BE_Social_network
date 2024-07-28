const { get_Current_User,get_UserToSend,addUserCalling} = require("../dummyuser");

const messSocket = (socket,io)=>{
     //user sending message
     socket.on("chat", (data) => {
        const {text,targetId,idRoom,typeMess} = data;
        const date = new Date();

        const p_user = get_Current_User(socket.id);
        const ids=[...targetId,{idUser:p_user.idUser}];
        //gets the room user and the message sent
        ids.forEach(e=>{
            const user_to_send = get_UserToSend(e.idUser);
            // console.log(text , "with" ,socket.id, "  sent to ",user_to_send.idUser);
            if(user_to_send !==undefined){
                user_to_send.forEach(e=>{
                    io.to(e.socketId).emit("message", {
                        socketId: p_user.socketId,
                        idRoom: idRoom,
                        sourceId: p_user.idUser,
                        message: text,
                        typeMess: typeMess,
                        create_at: date
                    });
                })
            }
        })
      
    });

    //Call user
    socket.on("callUser", (data) => {
        const listCall = data.userToCall;
        listCall.forEach(e=>{
            const user_to_send = get_UserToSend(e.idUser);
            if(user_to_send!==undefined){
                user_to_send.forEach(e=>{
                    io.to(e.socketId).emit("callUser", { signal: data.signalData, from: data.from,idRoom:data.idRoom, name: data.name })
                    addUserCalling(socket.id,e.socketId)
                })
            }
        })
	})

    socket.on("answerCall", (data) => {
        const user_to_send = get_UserToSend(data.to);
        user_to_send.forEach(e=>{
            io.to(e.socketId).emit("callAccepted", data.signal)
        })
    
	})

    socket.on("rejectCall", (data) => {
        const user_to_send = get_UserToSend(data.to);
        user_to_send.forEach(e=>{
            io.to(e.socketId).emit("rejectCall", "reject")
        })
    
	})
}

module.exports = messSocket;