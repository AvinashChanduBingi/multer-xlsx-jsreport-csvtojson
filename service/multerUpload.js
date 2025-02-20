const multer = require("multer");

        const storage = multer.diskStorage({
            destination : (req,file,func)=>{
                func(null,'uploads/');
            },
            filename : (req,file,func)=>
            {
                func(null,Date.now()+file.originalname);
            }
        });
        const upload = multer({storage : storage});


module.exports =  upload;