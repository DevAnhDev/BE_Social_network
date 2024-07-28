const db = require('../db');
const uuid = require('uuid');

const getFullFriends = (req,res)=>{
    const {idUser} = req.body;
    const sql = "SELECT * FROM `user_detail` WHERE idUser IN( SELECT targetId FROM user_friend WHERE sourceId = ? AND status != 0) AND idUser != ?";
    db.query(sql,[idUser,idUser,idUser],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })  
}

const getUserToAddFriend = (req,res)=>{
    const {idUser} = req.body;
    const sql = "SELECT * FROM `user_detail` WHERE idUser NOT IN( SELECT targetId FROM user_friend WHERE sourceId = ? ) AND idUser NOT IN (SELECT sourceId FROM user_friend WHERE targetId = ?) AND idUser != ?";
    db.query(sql,[idUser,idUser,idUser],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })  
}

const addFriend = (req,res)=>{
    const {sourceId,targetId} = req.body;
    const status = 0;
    const type = 1;
    const sql = "INSERT INTO user_friend(sourceId,targetId,type,status) VALUES (?,?,?,?)";
    db.query(sql,[sourceId,targetId,type,status],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            followingThenSendFriend(sourceId,targetId,res);
        }
    })
}

const followingThenSendFriend = (sourceId,targetId,res)=>{
    const sql = "SELECT * FROM user_follower WHERE sourceId=? AND targetId=?";
    db.query(sql,[sourceId,targetId],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }
        if(rows.length===0){
            const sql_add_follow = "INSERT INTO user_follower(sourceId,targetId,type) VALUES(?,?,?)";
            db.query(sql_add_follow,[sourceId,targetId,1],async(err,rows,fields)=>{
                if(err){
                    return res.json({msg:err})
                }else{
                    return res.json({msg:"Success"})
                }
            })
        }else{
            return res.json({msg:"Success"})
        }
    })
}

const notifyThenSendFriend = (req,res)=>{
    const {sourceId,targetId,type} = req.body;
    const id_notify = uuid.v1();
    const sql_find = "SELECT * FROM notification WHERE sourceId = ? AND targetId = ? AND type = ?";
    db.query(sql_find,[sourceId,targetId,type],async(err,rows,fields)=>{
        if(err){    
            return res.json({msg:err})
        }
        if(rows.length===0){
            
            const sql_add_notify = "INSERT INTO notification(id,sourceId,targetId,type) VALUES (?,?,?,?)";
            db.query(sql_add_notify,[id_notify,sourceId,targetId,type],async(err,rows,fields)=>{
                if(err){
                    return res.json({msg:err})
                }else{
                    return res.json({msg:"Success",idNotify:id_notify})
                }
            })
        }else{
            const currentTime = new Date();
            const sql_update_notify = "UPDATE notification SET create_at = ? WHERE sourceId = ? AND targetId = ? AND type = ?";
            db.query(sql_update_notify,[currentTime,sourceId,targetId,type],async(err,rows,fields)=>{
                if(err){
                    return res.json({msg:err})
                }else{
                    return res.json({msg:"Success"})
                }
            })
        }
    })
}

const cancelAddFriend = (req,res)=>{
    const {sourceId,targetId} = req.body;
    const sql_Delete = "DELETE FROM user_friend WHERE sourceId = ? AND targetId = ? AND status = ?";
    db.query(sql_Delete,[sourceId,targetId,0],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            const sql_Delete_Notify = "DELETE FROM notification WHERE sourceId = ? AND targetId = ? AND type = ?";
            db.query(sql_Delete_Notify,[sourceId,targetId,1],async(err,rows,fields)=>{
                if(err){
                    return res.json({msg:err})
                }else{
                    return res.json({msg:"Success"});
                }
            })
        }
    })
}

const getAddFriendSent = (req,res)=>{
    const {idUser} = req.body;
    const sql = "SELECT user_detail.* FROM `user_friend` INNER JOIN user_detail ON user_friend.targetId=user_detail.idUser WHERE user_friend.sourceId=? AND status=0"
    db.query(sql,[idUser] ,async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}

const getRequestAddFriend = (req,res)=>{
    const {idUser} = req.body;
    const sql = "SELECT user_detail.idUser,user_detail.firstName, user_detail.lastName, user_detail.avatar FROM `user_friend` INNER JOIN user_detail ON user_friend.sourceId=user_detail.idUser WHERE user_friend.targetId=? AND status=0 ORDER BY user_friend.create_at"
    db.query(sql,[idUser] ,async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}

const acceptAddFriend = (req,res)=>{
    const {sourceId,targetId} = req.body;
    const sql = "SELECT * FROM user_friend WHERE sourceId = ? AND targetId = ?";
    db.query(sql,[targetId,sourceId],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }
        if(rows.length!==0){
            const sql_update = "UPDATE user_friend SET status = 1 WHERE sourceId = ? AND targetId = ?";
            db.query(sql_update,[targetId,sourceId],async(err,rows,fields)=>{
                if(err){
                    return res.json({msg:err})
                }else{
                    const sql_add_friend = "INSERT INTO user_friend (sourceId,targetId,type,status) VALUES (?,?,?,?)";
                    db.query(sql_add_friend,[sourceId,targetId,1,1],async(err,rows,fields)=>{
                        if(err){
                            return res.json({msg:err})
                        }else{
                            followingThenSendFriend(sourceId,targetId,res);
                        }
                    })
                }

            })
        }
    })
}

const rejectAddFriend = (req,res)=>{
    const {sourceId,targetId} = req.body;
    const sql = "SELECT * FROM user_friend WHERE sourceId = ? AND targetId = ? AND status = 0";
    db.query(sql,[targetId,sourceId],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }
        if(rows.length!==0){
            const sql_delete = "DELETE FROM user_friend WHERE sourceId = ? AND targetId = ? AND status = 0";
            db.query(sql_delete,[targetId,sourceId],async(err,rows,fields)=>{
                if(err){
                    return res.json({msg:err})
                }else{
                    return res.json({msg:"Success"});
                }
            })
        }
    })
}

const removeFriend = (req,res)=>{
    const {sourceId,targetId} = req.body;
    const sql_delete_friend = "DELETE FROM user_friend WHERE sourceId = ? AND targetId = ?";
    db.query(sql_delete_friend,[sourceId,targetId],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }
        else{
            db.query(sql_delete_friend,[targetId,sourceId],async(err,rows,fields)=>{
                if(err){
                    return res.json({msg:err})
                }else{
                    const sql_delete_follower = "DELETE FROM user_follower WHERE sourceId = ? AND targetId = ?";
                    db.query(sql_delete_follower,[sourceId,targetId],async(err,rows,fields)=>{
                        if(err){
                            return res.json({msg:err})
                        }else{
                            db.query(sql_delete_follower,[targetId,sourceId],async(err,rows,fields)=>{
                                if(err){
                                    return res.json({msg:err})
                                }else{
                                    return res.json({msg:"Success"});
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

const addFollow = (req,res)=>{
    const {sourceId,targetId}  = req.body;
    const sql = "INSERT INTO user_follower(sourceId,targetId,type) VALUES(?,?,?)";
    db.query(sql,[sourceId,targetId,1],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:"Success"})
        }
    })
}
const cancelFollow = (req,res)=>{
    const {sourceId,targetId}  = req.body;
    const sql = "DELETE FROM `user_follower` WHERE sourceId = ? AND targetId = ?";
    db.query(sql,[sourceId,targetId],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:"Success"})
        }
    })
}
module.exports = {
    getFullFriends,
    getUserToAddFriend,
    addFriend,
    getAddFriendSent,
    getRequestAddFriend,
    notifyThenSendFriend,
    cancelAddFriend,
    acceptAddFriend,
    rejectAddFriend,
    removeFriend,
    addFollow,
    cancelFollow
}