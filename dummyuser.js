let users = [];
let users_calling = [];
const dotenv = require('dotenv');
dotenv.config({path: './.env'});
const db = require('./db');


function join_User(socketId,idUser,followers) {
    const p_user = {socketId,idUser,followers};
    const index = users.findIndex((p_user) => p_user.id === socketId );
    if(index===-1){
        users.push(p_user);
    }
    console.log("This is user ",users);
}

// Gets a particular user id to return the current user
function get_Current_User(id) {
    return users.find((p_user) => p_user.socketId === id);
}
function get_UserToSend(targetId) {
    return users.filter((p_user) => p_user.idUser === targetId);
}
function get_OneUserToSend(targetId) {
    return users.find((p_user) => p_user.idUser === targetId);
}

// called when the user leaves the chat and its user object deleted from array
function user_Disconnect(id) {
    const index = users.findIndex((p_user) => p_user.socketId === id);
    if (index !== -1) {
        users.splice(index,1);
        // console.log("User sau khi dis ", users);
        // return users.splice(index, 1)[0];
    }
}
// add lastLogin
function updateLastLogin(idUser) {
    const currentDate = new Date();
    const sql_update_lastLogin = "UPDATE user_detail SET lastLogin=? WHERE idUser = ?";
    db.query(sql_update_lastLogin,[currentDate,idUser]);
}

//Handle call video,audio
function addUserCalling(sourceId,targetId){
    users_calling.push({"sourceId":sourceId,"targetId":targetId});
}
function checkUserCalling(socketId){
    return users_calling.filter(e=>e.sourceId===socketId||e.targetId===socketId)
}
function removeUserCalling(socketId){
    const index = users_calling.findIndex(e => e.sourceId === socketId || e.targetId === socketId);
    if (index !== -1) {
        users_calling.splice(index,1);
        console.log(users_calling, "curent calling");
    }
}

//Handle online
function filterUserOnline (followings){
    let userOnline = [];
    followings.forEach(e=>{
        if(users.find(p=>e.targetId===p.idUser)){
            userOnline.push(e);
        }
    })
    return userOnline;

}
module.exports = {
    join_User,
    get_Current_User,
    user_Disconnect,
    get_UserToSend,
    get_OneUserToSend,
    addUserCalling,
    checkUserCalling,
    removeUserCalling,
    filterUserOnline,
    updateLastLogin
};