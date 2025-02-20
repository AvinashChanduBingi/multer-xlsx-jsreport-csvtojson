const model = require("../model/user");
class InvoiceService
{
async getData(req,res,next)
{
  let user = await model.findOne({name:req.body.name});
  user.year = "2025";
  user.month = "MAY"
  req.data = user;
  next();
}
}
module.exports = new InvoiceService();