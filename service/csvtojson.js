const csvtojson = require("csvtojson");
const path = require('path');

class CsvService {
  async convert(req, res) {
    try {
      let csvFilePath = path.join(__dirname, "../public/test.csv"); 

     await csvtojson().fromFile(csvFilePath)
     .then((jsonArray)=>
      res.status(200).json({ success: true, data: jsonArray }));
    
      
    } catch (err) {
      console.error("Error converting csv to json:", err);
      res.status(500).json({ success: false, message: "conversion failed" });
    }
  }
}

module.exports = new CsvService();
