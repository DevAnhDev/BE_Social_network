const db = require('../db');
const uuid = require('uuid');

const getMessengesByIdRoom = (req,res)=>{
    const {idRoom} = req.body;
    const sql = "SELECT user_message.sourceId,user_message.message,user_message.create_at,user_message.typeMess,user_detail.firstName,user_detail.lastName,user_detail.avatar FROM `user_message` INNER JOIN user_detail ON user_message.sourceId = user_detail.idUser WHERE idRoom = ? ORDER BY user_message.create_at";
    db.query(sql,[idRoom],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows});
        }
    })
}

const getListCovensation = (req,res)=>{
    const {idUser} = req.body;
    // console.log("Đây là ",idUser);
    const sql = "SELECT member_room_chat.idRoom, room_chat.nameRoom,room_chat.type, room_chat.avatarRoom, user_detail.lastName, user_detail.firstName, user_detail.avatar, user_detail.idUser AS idUserToChat, user_message.*, ( SELECT lastName FROM user_detail WHERE idUser = user_message.sourceId ) AS lastNameSent FROM member_room_chat INNER JOIN user_detail ON member_room_chat.idUser = user_detail.idUser INNER JOIN user_message ON member_room_chat.idRoom = user_message.idRoom INNER JOIN room_chat ON room_chat.id = member_room_chat.idRoom WHERE user_detail.idUser != ? AND member_room_chat.idRoom IN( SELECT idRoom FROM member_room_chat WHERE idUser = ? ) AND user_message.create_at IN( SELECT MAX(create_at) FROM user_message GROUP BY idRoom ) GROUP BY user_message.idRoom ORDER BY user_message.create_at DESC";
    db.query(sql,[idUser,idUser],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}

const getRoomCurrent = (req,res)=>{
    const {idRoom,idUser} = req.body;
    const sql = "SELECT room_chat.type,room_chat.nameRoom,room_chat.avatarRoom,member_room_chat.idRoom,member_room_chat.idUser,user_detail.firstName,user_detail.lastName,user_detail.avatar FROM `room_chat` INNER JOIN member_room_chat ON member_room_chat.idRoom=room_chat.id INNER JOIN user_detail ON member_room_chat.idUser = user_detail.idUser WHERE room_chat.id = ? AND member_room_chat.idUser != ?";
    db.query(sql,[idRoom,idUser],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}

const addMessenger = (req,res) =>{
    const {idUser,idRoom,message,typeMess} = req.body;
    const sql = "INSERT INTO user_message (sourceId,idRoom,message,typeMess) VALUES (?,?,?,?)";
    db.query(sql,[idUser,idRoom,message,typeMess],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:"Success"})
        }
    })
}

const getReciver = (req,res)=>{
    const {idRoom,idUser} = req.body;
    const sql = "SELECT member_room_chat.idUser,user_detail.firstName,user_detail.lastName FROM `member_room_chat` INNER JOIN user_detail ON member_room_chat.idUser = user_detail.idUser WHERE member_room_chat.idRoom=? AND member_room_chat.idUser!= ?";
    db.query(sql,[idRoom,idUser],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}

const checkRoomExist = (req,res)=>{
    const {idUser} = req.body;
    const sql = "SELECT member_room_chat.idUser,member_room_chat.idRoom FROM room_chat INNER JOIN member_room_chat ON room_chat.id=member_room_chat.idRoom WHERE room_chat.type=1 AND room_chat.id IN (SELECT idRoom FROM member_room_chat WHERE idUser = ?) AND member_room_chat.idUser != ?";
    db.query(sql,[idUser,idUser],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}

const createRoomSolo = (req,res)=>{
    const {sourceId,targetId} = req.body;
    const id = uuid.v1();
    const sql_InsertRoom = "INSERT INTO room_chat (id,type) VALUES (?,?)";
    db.query(sql_InsertRoom,[id,1],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            const sql_InsertMember = "INSERT INTO member_room_chat (idRoom,idUser) VALUES (?,?)";
            db.query(sql_InsertMember,[id,sourceId],async(err,rows,fields)=>{
                if(err){
                    console.log(err)
                    return res.json({msg:err})
                }else{
                    db.query(sql_InsertMember,[id,targetId],async(err,rows,fields)=>{
                        if(err){
                            return res.json({msg:err})
                        }else{
                            console.log(id)
                            return res.json({msg:{idRoom:id}});
                        }
                    })
                }
            })
        }
    })
}

const createRoomGroup = (req,res)=>{
    const idRoom = uuid.v1();
    const {nameRoom,listGruopToAdd} = req.body;
    const sql_add_room = "INSERT INTO room_chat(id,type,nameRoom) VALUES (?,?,?)";
    db.query(sql_add_room,[idRoom,2,nameRoom],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            listGruopToAdd.forEach((e,index)=>{
                const sql_add_member = "INSERT INTO member_room_chat(idRoom,idUser) VALUES(?,?)";
                db.query(sql_add_member,[idRoom,e.idUser])
                if(index===listGruopToAdd.length-1){
                    return res.json({msg:"Success",idRoom:idRoom})
                }
            })
        }
    })
}

const renameRoomById = (req,res)=>{
    const {idRoom,nameRoom} = req.body;
    const sql = "UPDATE room_chat SET nameRoom = ? WHERE id = ?";
    db.query(sql,[nameRoom,idRoom],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:"Success"})
        }
    })
}
module.exports = {
    getMessengesByIdRoom,
    getListCovensation,
    addMessenger,
    getReciver,
    checkRoomExist,
    createRoomSolo,
    getRoomCurrent,
    createRoomGroup,
    renameRoomById
}