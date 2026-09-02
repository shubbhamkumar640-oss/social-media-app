const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      RegExp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // Exclude password from query results by default
    },
    systemUser:{
       type:Boolean,
       default:false,
       immutable:true,
       select:false
    }
   
  },
  { timeStamps: true },
);


const User = mongoose.model("user",userSchema)

module.exports = User