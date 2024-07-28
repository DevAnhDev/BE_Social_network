const db = require('../db');
const uuid = require('uuid');

const getNotification = (req,res)=>{
    const {idUser} = req.body;
    const sql = "SELECT notification.id,notification.type, notification.read, notification.trash, notification.create_at, notification_template.title, notification_template.description, user_detail.firstName, user_detail.lastName, user_detail.avatar FROM `notification` INNER JOIN notification_template ON notification.type = notification_template.id INNER JOIN user_detail ON notification.sourceId = user_detail.idUser WHERE notification.targetId =? ORDER BY notification.create_at DESC";
    db.query(sql,[idUser],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}
const addNotification = (req,res)=>{
    const {sourceId,targetId,type} = req.body;
    const id_notify = uuid.v1();
    const sql_find = "SELECT * FROM notification WHERE sourceId = ? AND targetId = ? AND type = ?";
    db.query(sql_find,[sourceId,targetId,type],async(err,rows,fields)=>{
        if(err){    
            return res.json({msg:err})
        }
        if(rows.length===0){
            
            const sql_add_notify = "INSERT INTO notification(id,sourceId,targetId,type) VALUES (?,?,?,?)";
            db.query(sql_add_notify,[id_notify,sourceId,targetId,type],async(err,result,fields)=>{
                if(err){
                    return res.json({msg:err})
                }else{
                    return res.json({msg:"Success",idNotify:id_notify})
                }
            })
        }else{
            const currentTime = new Date();
            const sql_update_notify = "UPDATE notification SET create_at = ? WHERE sourceId = ? AND targetId = ? AND type = ?";
            db.query(sql_update_notify,[currentTime,sourceId,targetId,type],async(err,result,fields)=>{
                if(err){
                    return res.json({msg:err})
                }else{
                    return res.json({msg:"Success",idNotify:rows[0].id})
                }
            })
        }
    })
}

const getNotificationTemplate = (req,res)=>{
    const {type} = req.body;
    const sql = "SELECT * FROM notification_template WHERE id = ?";
    db.query(sql,[type],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err});
        }else{
            return res.json({msg:rows});
        }
    })
}

const updateNotifyReaded = (req,res)=>{
    const {id} = req.body;
    const sql = "SELECT * FROM notification WHERE id = ?";
    db.query(sql,[id],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }
        if(rows.length!==0){
            const sql_update = "UPDATE notification SET `read` = 1 WHERE id = ?";
            db.query(sql_update,[id],async(err,rows,fields)=>{
                if(err){
                    return res.json({msg:err})
                }else{
                    return res.json({msg:"Success"})
                }
            })
        }
    })
}
module.exports = {
    getNotification,
    getNotificationTemplate,
    updateNotifyReaded,
    addNotification
}