// const tf = require('@tensorflow/tfjs');
// const mobilenet = require('@tensorflow-models/mobilenet');
// const cocoSsd = require('@tensorflow-models/coco-ssd');
// const tfnode = require('@tensorflow/tfjs-node');
// const objectDetect = require('./objectDetect');
// const fs = require('fs');

// const readImage = path => {
//     const imageBuffer = fs.readFileSync(path);
//     const tfimage = tfnode.node.decodeImage(imageBuffer);
//     return tfimage;
// }
// const imageClassification = async path => {
//     const image = readImage(path);
//     const mobilenetModel = await mobilenet.load();
//     const predictions = await mobilenetModel.classify(image);
//     console.log('Classification Results:', predictions);
// }

// const detectImage = async path =>{
//     const image = readImage(path);
//     const res = await cocoSsd.load().then(model=>{
//         return model.detect(image).then(predictions=>{
//             // console.log('Predictions: ', predictions);
//             return predictions
//         })
//     })
//     return res;

// }

// // if (process.argv.length !== 3) throw new Error('Incorrect arguments: node classify.js <IMAGE_FILE>');

// // imageClassification("./Upload/post/boy.jpg");

// // detectImage("./Upload/post/meo.jpg");

// module.exports = {
//     imageClassification,
//     detectImage
// }