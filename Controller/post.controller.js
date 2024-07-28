const { resolve } = require('path');
const db = require('../db');
const uuid = require('uuid');
const request = require('request');

const getPostById = (req,res)=>{
    const {idUser} = req.body;
    const sql = "SELECT user_post.*, ( SELECT COUNT(*) AS dem FROM post_emotion WHERE user_post.id = post_emotion.idPost GROUP BY post_emotion.idPost HAVING dem ) AS numberEmotion, ( SELECT COUNT(*) AS dem FROM post_comment WHERE user_post.id = post_comment.idPost GROUP BY post_comment.idPost HAVING dem ) AS numberComment, user_detail.firstName, user_detail.lastName, user_detail.avatar, ( SELECT post_emotion.emotion FROM `post_emotion` WHERE post_emotion.idUser = ? AND post_emotion.idPost = user_post.id ) AS statusLike FROM user_post INNER JOIN user_detail ON user_detail.idUser = user_post.idUser WHERE user_post.idUser IN( SELECT user_follower.targetId FROM user_follower WHERE user_follower.sourceId = ? ) OR user_post.idUser = ? ORDER BY user_post.create_at DESC";
    db.query(sql,[idUser,idUser,idUser],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            if(rows.length===0){
                return res.json({msg:rows})
            }else{
                const get_img  = "SELECT url,suggestionComment FROM image_description_post WHERE idPost=?";
                let arr = [];
                rows.forEach((e,index)=>{
                    db.query(get_img,[e.id],async(err,result,fields)=>{
                        arr.push({...e,arr_img:result});
                        if(index===rows.length-1){
                            return res.json({msg:arr})
                        }
                    })
                    
                })
            }
        }
    })
}

const getListLike = (req,res)=>{
    const {idPost} = req.body;
    const sql = "SELECT post_emotion.*,user_detail.lastName,user_detail.firstName,user_detail.avatar FROM `post_emotion` INNER JOIN user_detail ON post_emotion.idUser=user_detail.idUser WHERE idPost = ?";
    db.query(sql,[idPost],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}

const likePost = (req,res)=>{
    const {idPost,idUser,emotion} = req.body;
    const check = "SELECT * FROM post_emotion WHERE idUser = ? AND idPost = ?";
    db.query(check,[idUser,idPost],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }
        if(rows.length===0){
            const sql = "INSERT INTO post_emotion(idUser,idPost,emotion) VALUES(?,?,?)";
            db.query(sql,[idUser,idPost,emotion],async(err,rows,fields)=>{
                if(err){
                    console.log(err)
                    return res.json({msg:err})
                }else{
                    return res.json({msg:"Success"})
                }
            })
        }else{
            const sql_update = "UPDATE post_emotion SET emotion = ? WHERE idUser = ? AND idPost = ?";
            db.query(sql_update,[emotion,idUser,idPost],async(err,rows,fields)=>{
                if(err){
                    console.log(err)
                    return res.json({msg:err})
                }else{
                    return res.json({msg:"Success"})
                }
            })
        }
    })
}

const unlikePost = (req,res)=>{
    const {idPost,idUser} = req.body;
    const check = "SELECT * FROM post_emotion WHERE idUser = ? AND idPost = ?";
    db.query(check,[idUser,idPost],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }
        if(rows.length===1){
            const unlike = "DELETE FROM post_emotion WHERE idUser = ? AND idPost = ?";
            db.query(unlike,[idUser,idPost],async(err,rows,fields)=>{
                if(err){
                    return res.json({msg:err})
                }else{
                    return res.json({msg:"Success"})
                }
            })
        }
    })
}

const getPostOfUser = (req,res)=>{
    const {sourceId,targetId} = req.body;
    const sql = "SELECT user_post.*, ( SELECT COUNT(*) AS dem FROM post_emotion WHERE user_post.id = post_emotion.idPost GROUP BY post_emotion.idPost HAVING dem ) AS numberEmotion, ( SELECT COUNT(*) AS dem FROM post_comment WHERE user_post.id = post_comment.idPost GROUP BY post_comment.idPost HAVING dem ) AS numberComment, user_detail.firstName, user_detail.lastName, user_detail.avatar, ( SELECT post_emotion.emotion FROM `post_emotion` WHERE post_emotion.idUser = ? AND post_emotion.idPost = user_post.id ) AS statusLike FROM user_post INNER JOIN user_detail ON user_detail.idUser = user_post.idUser WHERE user_post.idUser = ? ORDER BY user_post.create_at DESC";
    db.query(sql,[sourceId,targetId],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            const get_img  = "SELECT url,suggestionComment FROM image_description_post WHERE idPost=?";
            let arr = [];
            if(rows.length!==0){
                rows.forEach((e,index)=>{
                    db.query(get_img,[e.id],async(err,result,fields)=>{
                        arr.push({...e,arr_img:result});
                        if(index===rows.length-1){
                            return res.json({msg:arr})
                        }
                    })
                })
            }else{
                return res.json({msg:rows})
            }
        }
    })
}

const getCommentByIdPost = (req,res)=>{
    const {idPost} = req.body;
    const sql = "SELECT post_comment.*,user_detail.firstName,user_detail.lastName,user_detail.avatar FROM post_comment INNER JOIN user_detail ON user_detail.idUser=post_comment.idUser WHERE idPost = ? ORDER BY post_comment.create_at DESC";
    db.query(sql,[idPost],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}

const addComment = (req,res)=>{
    const {text,idPost,idUser,typeComment} = req.body;
    const sql = "INSERT INTO post_comment (idUser,idPost,comment,typeComment) VALUES (?,?,?,?)";
    db.query(sql,[idUser,idPost,text,typeComment],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:"Success"})
        }
    })
    
}

function doRequest(url,data) {
    return new Promise(function (resolve, reject) {
      request.post({url:url,body:data,json:true}, function (error, res, body) {
        if (!error && res.statusCode === 200) {
            resolve(body);
        } else {
            resolve("error")
        }
      });
    });
}

const addPost = (req,res)=>{
    const id = uuid.v1();
    const {idUser,text,arr_img} = req.body;
    const sql_insert = "INSERT INTO user_post (`id`,`idUser`,`message`) VALUES (?,?,?)";
    db.query(sql_insert,[id,idUser,text],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            var bar = new Promise((resolve, reject) => {
                console.log(arr_img);
                if(arr_img.length>0){
                    arr_img.forEach(async(e,index)=>{
                        const res_suggestion = await doRequest(process.env.URL_BACKEND_PYTHON+"/ai_suggestion/image",{"url":e.path})
                        console.log(res_suggestion)
                        if(res_suggestion == "error"){
                            sql_add_img = "INSERT INTO image_description_post (`idPost`,`url`) VALUES (?,?)";
                            db.query(sql_add_img,[id,e.path]);
                        }else{
                            const suggestion_comment = JSON.stringify(res_suggestion?.suggestion)
                            sql_add_img = "INSERT INTO image_description_post (`idPost`,`url`,`suggestionComment`) VALUES (?,?,?)";
                            db.query(sql_add_img,[id,e.path,suggestion_comment]);
                        }
                        if (index === arr_img.length -1) resolve();
                    })
                }else{
                    resolve()
                }
            });
            bar.then(()=> { return res.json({msg:"Success",idPost:id}) })
        }
    })
}

const getPostRealTime = (req,res)=>{
    const {idUser,idPost} = req.body;
    const sql = "SELECT user_post.*, ( SELECT COUNT(*) AS dem FROM post_emotion WHERE user_post.id = post_emotion.idPost GROUP BY post_emotion.idPost HAVING dem ) AS numberEmotion, ( SELECT COUNT(*) AS dem FROM post_comment WHERE user_post.id = post_comment.idPost GROUP BY post_comment.idPost HAVING dem ) AS numberComment, user_detail.firstName, user_detail.lastName, user_detail.avatar, ( SELECT post_emotion.emotion FROM `post_emotion` WHERE post_emotion.idUser = ? AND post_emotion.idPost = user_post.id ) AS statusLike FROM user_post INNER JOIN user_detail ON user_detail.idUser = user_post.idUser WHERE user_post.id=?";
    db.query(sql,[idUser,idPost],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            const get_img  = "SELECT url FROM image_description_post WHERE idPost=?";
            let arr = [];
            rows.forEach((e,index)=>{
                db.query(get_img,[e.id],async(err,result,fields)=>{
                    arr.push({...e,arr_img:result});
                    if(index===rows.length-1){
                        return res.json({msg:arr})
                    }
                })
                
            })
        }
    })
}   

const sharePost = (req,res)=>{
    const {idUser,idPost,feelingPost,type} = req.body;
    const sql_check = "SELECT * FROM share_post WHERE idUser = ? AND idPost = ?";
    db.query(sql_check,[idUser,idPost],async(err,rows)=>{
        if(err){
            return res.json({msg:err})
        }else{
            if(rows.length==0){
                const sql_add = "INSERT INTO share_post(idUser,idPost,feelingPost,type) VALUES (?,?,?,?)";
                db.query(sql_add,[idUser,idPost,feelingPost,type],async(err,rows)=>{
                    if(err) return res.json({msg:err})
                    else return res.json({msg:"Success"})
                })
            }else{
                return res.json({msg:"shared"})
            }
        }
    })
}
module.exports = {
    getPostById,
    getListLike,
    likePost,
    unlikePost,
    getPostOfUser,
    getCommentByIdPost,
    addComment,
    addPost,
    getPostRealTime,
    sharePost
}