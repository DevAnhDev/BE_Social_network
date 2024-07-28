const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const request = require('request');

const register = (req,res)=>{
    try {
        const id = uuid.v1();
        const {email,password,username,firstName,lastName} = req.body.data;
      
        const sql = 'SELECT * FROM user WHERE email = ? ';
        db.query(sql,[email],async(err,rows,fields)=>{
            //Check email exist ?
            if(rows.length > 0 ){
                return res.status(201).json({
                    msg: "The E-mail already in use",
                });
            }
            //create password with code bcrypt
            const hashPass = await bcrypt.hash(password, 12);
            const sqlRegister = 'INSERT INTO `user`(`id`,`username`,`email`,`passwordHash`) VALUES(?,?,?,?)';
            db.query(sqlRegister,[id,username,email,hashPass],(err,rows,fields)=>{
                if (err) {
                    return res.json({msg:err});
                }
                const sql_addInfor = 'INSERT INTO `user_detail`(idUser,firstName,lastName) VALUES(?,?,?)';
                db.query(sql_addInfor,[id,firstName,lastName],async(err,rows,fields)=>{
                    if (err) {
                        return res.json({msg:err});
                    }
                    return res.status(201).json({
                        msg: "Success",
                        data: {"idUser":id,"email":email,"username":username}
                    });
                })

            })
        })
    }catch (error) {
        return res.status(500).json({ msg: err.message });
    } 
}

const login = (req,res)=>{
    try {
        const {username,password} = req.body.data;
        const sql = 'SELECT * FROM user WHERE username = ? ';
        
        console.log(username ,"and", password);

        db.query(sql,[username],async(err,rows,fields)=>{
            if (err) {
                return res.json({msg:err});
            }
            //Check account exist
            if(rows.length ===0 ){
                return res.status(422).json({
                    msg: "Invalid account",
                });
            }else{
                //Confirm password
                console.log("password ở đây ",rows[0].passwordHash );
                const passMatch = await bcrypt.compare(password,rows[0].passwordHash);
                if(!passMatch){
                    return res.status(422).json({
                        msg: "Incorrect password",
                    });
                }else{
                    const theToken = jwt.sign({id:rows[0].id},process.env.SECRECT,{ expiresIn: '1d' });
                    return res.json({
                        msg:"Success",
                        token:theToken
                    });
                }
            }
        })
    } catch (error) {
        return res.status(500).json({ msg: err.message });
    }
}

const loginFace = (req,res)=> {
    try {
        const {idUser} = req.body;
        const theToken = jwt.sign({id:idUser},process.env.SECRECT,{ expiresIn: '1d' });
        return res.json({
            msg:"Success",
            token:theToken
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

const updateFaceId = (req,res)=> {
    try {
        const {idUser,faceId,action} = req.body
        if(action == "DELETE"){
            request(`https://api.faceio.net/deletefacialid?key=6e7c1eb866ec2385a609746e33ca5fd4&fid=${faceId}`, function (error, response, body) {
                console.error('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
            });
        }
        const sql = "UPDATE `user` SET faceId=? WHERE id=?";
        db.query(sql,[action == "DELETE" ? null : faceId,idUser],async(err,rows,fields)=>{
            if (err) {
                return res.json({msg:err});
            }else{
                return res.json({msg:"Success"});
            }
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
const getUser = (req,res)=>{
    try {
        const {token} = req.body;
        if(token==null){
            return res.status(422).json({
                msg: "Please provide the token",
            });
        }
        const theToken = token;
        jwt.verify(theToken, process.env.SECRECT,(err,decoded)=>{
            if(err){
                return res.json({msg:err})
            }else{
                const sql = 'SELECT user.id,user.username,user.faceId,user.email,user.registeredAt,user_detail.* FROM user INNER JOIN user_detail ON user.id=user_detail.idUser WHERE user.id = ? ';
                db.query(sql,[decoded.id],(err,rows,fields)=>{
                    if (err) {
                        return res.json({msg:err});
                    }else{
                        return res.json(rows);
                    }
                })
            }
        });
      
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
   
}

const getFollowers = (req,res)=>{
    const {idUser} = req.body;
    const sql = "SELECT sourceId FROM `user_follower` WHERE targetId = ?";
    db.query(sql,[idUser],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}

const getFollowings = (req,res)=>{
    const {idUser} = req.body;
    const sql = "SELECT targetId FROM `user_follower` WHERE sourceId = ?";
    db.query(sql,[idUser],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}

const checkEmail = (req,res)=>{
    const {email} = req.body;
    const sql = 'SELECT * FROM user WHERE email = ? ';
    db.query(sql,[email],async(err,rows,fields)=>{
        //Check email exist ?
        if(rows.length > 0 ){
            return res.status(201).json({
                msg: "The Email already in use",
            });
        }
        else{
            return res.json({msg: "Continue register"})
        }
    }
    )
}

const checkUsername = (req,res)=>{
    const {username} = req.body;
    const sql = 'SELECT * FROM user WHERE username = ? ';
    db.query(sql,[username],async(err,rows,fields)=>{
        //Check email exist ?
        if(rows.length > 0 ){
            return res.status(201).json({
                msg: "The Username already in use",
            });
        }
        else{
            return res.json({msg: "Continue register"})
        }
    }
    )
}

const getFriendById = (req,res)=>{
    const {idUser} = req.body;
    const sql = "SELECT user_detail.* FROM user_detail INNER JOIN user ON user.id=user_detail.idUser WHERE user_detail.idUser IN (SELECT user_friend.targetId FROM user_friend WHERE user_friend.sourceId = ? AND status != 0)";
    db.query(sql,[idUser],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}

const getInforById = (req,res)=>{
    const {idUser} = req.body;
    const sql = "SELECT lastName,firstName,avatar FROM `user_detail` WHERE idUser = ?"
    db.query(sql,[idUser],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}

const updateLastLogin = (req,res)=>{
    const {idUser} = req.body;
    const currentDate = new Date();
    const sql_update_lastLogin = "UPDATE user_detail SET lastLogin=? WHERE idUser = ?";
    db.query(sql_update_lastLogin,[currentDate,idUser]);
}

const getFullInforUserById = (req,res)=>{
    const {idUser} = req.body;
    const sql = "SELECT * FROM user_detail WHERE idUser = ?";
    db.query(sql,[idUser],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}

const searchUserByName = (req,res)=>{
    const {name} = req.body;
    const sql = `SELECT * FROM user_detail WHERE CONCAT(firstName,lastName) LIKE '%${name}%'`;
    db.query(sql,async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows});
        }
    })
}

const getImagePosted = (req,res)=>{
    const {idUser} = req.body;
    const sql = "SELECT image_description_post.url FROM `user_post`LEFT JOIN image_description_post ON user_post.id=image_description_post.idPost WHERE user_post.idUser=?";
    db.query(sql,[idUser],async(err,rows,fields)=>{
        if(err){
            return res.json({msg:err})
        }else{
            const getCoverImg = "SELECT coverImage AS url FROM `user_detail` WHERE idUser = ? AND coverImage != \"\" ";
            db.query(getCoverImg,[idUser],async(err2,rows_coverimg)=>{
                if(err){
                    return res.json({msg:err2})
                }else{
                    const getAvatar = "SELECT avatar AS url FROM `user_detail` WHERE idUser = ? AND avatar != \"\" ";
                    db.query(getAvatar,[idUser],async(err3,rows_avatar)=>{
                        if(err3){
                            return res.json({msg:err3})
                        }else{
                            const tmp = rows.concat(rows_coverimg,rows_avatar);
                            let result = tmp.filter(e=>e.url!==null);
                            return res.json({msg:result});
                        }
                    })
                }
            })
        }
    })
}
module.exports = {
    register,
    login,
    loginFace,
    updateFaceId,
    getUser,
    getFollowers,
    getFollowings,
    checkEmail,
    checkUsername,
    getFriendById,
    getInforById,
    updateLastLogin,
    getFullInforUserById,
    searchUserByName,
    getImagePosted
}

