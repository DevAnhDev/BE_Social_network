const {detectImage} = require('../recognizeImage');
const objectDetect = require('../objectDetect');

const getSuggestion = async(req,res)=>{
    // const {url} = req.body;
    // let arr = [];
    // const predictions = await detectImage("."+url);
    // if(predictions.length!==0){
    //     predictions.map(e=>{
    //         const tmp = objectDetect.CLASSES.find(p=>p.displayName===e.class);
    //         if(tmp){
    //             if(!arr.find(c=>c.id===tmp.id)){
    //                 arr.push(tmp)
    //             }
    //         }
    //         return res.json({msg:tmp})
    //     })
    // }else{
    //     return res.json({msg:[]});
    // }
}

module.exports = {
    getSuggestion
}