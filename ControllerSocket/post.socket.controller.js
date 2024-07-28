const { get_Current_User ,get_UserToSend} = require("../dummyuser");

const postSocket = (socket,io)=>{
    
    socket.on("likePost", (data)=>{
        const currenUser = get_Current_User(socket.id);
        if(currenUser){
            io.to(socket.id).emit("changeLikePost",data);
            currenUser.followers.forEach(e=>{
                const user_to_send = get_UserToSend(e.sourceId);
                user_to_send.forEach(p=>{
                    io.to(p.socketId).emit("changeLikePost",data);
                })
            })
        }
    })

    socket.on("unlikePost", (data)=>{
        const currenUser = get_Current_User(socket.id);
        if(currenUser){
            io.to(socket.id).emit("changeUnlikePost",data);
            currenUser.followers.forEach(e=>{
                const user_to_send = get_UserToSend(e.sourceId);
                user_to_send.forEach(p=>{
                    io.to(p.socketId).emit("changeUnlikePost",data);
                })
            })
        }
    })

    socket.on("comment", (data)=>{
        const {text,idPost,typeComment} = data;
        const date = new Date();

        const p_user = get_Current_User(socket.id);
        const ids=[...p_user.followers,{sourceId:p_user.idUser}];
        ids.forEach(e=>{
            const user_to_send = get_UserToSend(e.sourceId);
            if(user_to_send !==undefined){
                user_to_send.forEach(e=>{
                    io.to(e.socketId).emit("message_comment", {
                        idPost: idPost,
                        sourceId: p_user.idUser,
                        message: text,
                        typeComment: typeComment,
                        create_at: date
                    });
                })
            }
        })
    })

    socket.on("addPost", (data)=>{
        const currenUser = get_Current_User(socket.id);
        if(currenUser){
            io.to(socket.id).emit("changeAddPost",data);
            currenUser.followers.forEach(e=>{
                const user_to_send = get_UserToSend(e.sourceId);
                user_to_send.forEach(p=>{
                    io.to(p.socketId).emit("changeAddPost",data);
                })
            })
        }
    })
}

module.exports = postSocket;