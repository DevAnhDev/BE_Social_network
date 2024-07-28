const db = require('../db');

const checkFollower = (req,res)=>{
    const {sourceId,targetId} = req.body;
    const sql = "SELECT * FROM user_follower WHERE sourceId = ? AND targetId = ?";
    db.query(sql,[sourceId,targetId],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }
        if(rows.length===0){
            return res.json({msg:"unfollowed"})
        }else{
            return res.json({msg:"followed"})
        }
    })
}

const checkFriend = (req,res)=>{
    const {sourceId,targetId} = req.body;
    const sql = "SELECT * FROM user_friend WHERE sourceId = ? AND targetId = ? AND status = 0";
    db.query(sql,[sourceId,targetId],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }
        if(rows.length===0){
            const sql_check1 = "SELECT * FROM user_friend WHERE sourceId = ? AND targetId = ? AND status = 1"
            db.query(sql_check1,[sourceId,targetId] ,async(err,rows,fields)=>{
                if(err){
                    return res.json({msg:err})
                }
                if(rows.length===0){
                    const sql_check2 = "SELECT * FROM user_friend WHERE sourceId = ? AND targetId = ? AND status = 0";
                    db.query(sql_check2,[targetId,sourceId],async(err,rows,fields)=>{
                        if(err){
                            return res.json({msg:err})
                        }
                        if(rows.length===0){
                            return res.json({msg:"not_friend"})
                        }else{
                            return res.json({msg:"user_sent"})
                        }
                    })
                }else{
                    return res.json({msg:"friend"})
                }
            })
        }else{
           return res.json({msg:"you_sent"})
        }
    })
}

const updateCoverImage = (req,res)=>{
    const {idUser,urlImg} = req.body;
    const sql = "UPDATE user_detail SET coverImage = ? WHERE idUser = ?";
    db.query(sql,[urlImg,idUser],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:"Success"})
        }
    })
}

const updateAvatarImage = (req,res) => {
    const {idUser,urlImg} = req.body;
    const sql = "UPDATE user_detail SET avatar = ? WHERE idUser = ?";
    db.query(sql,[urlImg,idUser],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:"Success"})
        }
    })
} 
module.exports = {
    checkFollower,
    checkFriend,
    updateCoverImage,
    updateAvatarImage
}