var express = require('express');
var router = express.Router();
const upload = require("../service/multerUpload");
const csvService = require("../service/csvtojson");
const xlsxServie = require("../service/xlsxtojson");
const axiosService  = require("../service/axios");
const invoiceService = require("../service/InvoiceService");
const pdf = require("../service/pdfCreation")


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index',{user :"avinash"});
});

const uploadfileds = upload.fields([{name : 'pancardFile'},{name : "pancardFile2"}])
router.post("/upload",uploadfileds,(req,res)=>{
  console.log(req.body)
  res.status(200).json({
    name : req.body.name,
    email : req.body.email,
    pancard : req.body.pancard,
    file : req.file
  })
});

router.get("/csv",(req,res)=>{
  csvService.convert(req,res)
});
router.get("/xlsx",(req,res)=>{
  xlsxServie.convert(req,res)
});

router.get("/axios",axiosService.fetchDataMiddleware,(req,res)=>{res.status(200).send(req.data)});

const data = {};
data.name = "avinash"
data.companyName = "Bento";
data.logo = "Bento.png";
data.jobTitle = "Backend Engineer";
data.salary = 12000;
data.year = 2025;
data.month = "may";


router.get("/invoiceForm",(req,res)=>{res.render('invoiceForm')});

router.get("/generateInvoice",(req,res)=>{
  const data = {};
data.name = req.query.name
data.companyName = req.query.companyName;
data.logo = "Bento.png";
data.jobTitle = "Backend Engineer";
data.salary = 12000;
data.year = 2025;
data.month = "may";
  req.session.data = data;
  if(req.query.companyName === "Bento") res.redirect("Bento");
  if(req.query.companyName === "AssetMonk") res.redirect("AssetMonk");
  if(req.query.companyName === "Incor") res.redirect("Incor");
})

router.get("/AssetMonk",(req,res)=>{
  console.log(req.session.data)
  res.render('AssetMonk',{data:req.session.data})
  pdf.generatePdf(req.session.data)
});
router.get("/Bento",(req,res)=>{res.render('Bento',{data:req.session.data,logo : "Bento.png"}); 
 pdf.generatePdf(req.session.data)
});

router.get("/test",(req,res)=>{
 pdf.generatePdf(req.session.data,res)
});

router.get("/Incor",(req,res)=>{res.render('Incor',{data:req.session.data}); 
 pdf.generatePdf(req.session.data)
});
router.get("/test",(req,res)=>res.render('test'))
module.exports = router;
