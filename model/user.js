const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name : String,
        salary : Number,
        jobTitle : String,
    }
)

const model = mongoose.model('users',userSchema);

module.exports=model;