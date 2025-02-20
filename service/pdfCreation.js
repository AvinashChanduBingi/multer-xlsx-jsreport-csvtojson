const path = require("path");
const ejs = require("ejs");
const jsreport = require("@jsreport/jsreport-core")();
const fs = require("fs");

jsreport.use(require("@jsreport/jsreport-chrome-pdf")());
jsreport.use(require("@jsreport/jsreport-ejs")());
class pdf
{
async generatePdf(userData,res) {

    try {
    console.log("pdf Creation");

    await jsreport.init();
      
    const html = await ejs.renderFile( `/home/avinash/LoneBear/test/test1/test2/views/${userData.companyName}.ejs`, { data: userData });

    const pdf = await jsreport.render({
        template : {
            content : html,
            engine : "none",
            recipe : "chrome-pdf"
        }
    });

    const pdfPath = path.join(__dirname,"../public",`${userData.name}-invoice.pdf`);
   
    fs.writeFileSync(pdfPath,pdf.content);
      } catch (error) {
        console.log("error in generatePdf :"+error)
    }
    
}
}

module.exports = new pdf();