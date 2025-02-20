const fs = require("fs");
const path = require("path");


function jpegToBinary(filePath) {
  const binaryData = fs.readFileSync(filePath);
//   console.log(binaryData.toString('base64'));
  return binaryData.toString('binary');
}

const jpegFilePath = "/home/avinash/LoneBear/test/test1/test2/uploads/uwp4649202.jpeg";
const binaryData = jpegToBinary(jpegFilePath);


const buffer = Buffer.from(binaryData,'binary');

const outputPath = path.join("/home/avinash/LoneBear/test/test1/test2/uploads","hi.jpeg");

fs.writeFileSync(outputPath,buffer);