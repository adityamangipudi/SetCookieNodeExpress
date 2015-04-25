/**
 * Created by adityamangipudi1 on 4/23/15.
 */
var mongoose = require('mongoose')
var LoginModel = mongoose.model('login', {
    email: {
        type: String,
        required: true,
        validate: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
        unique: true
    },
    password:{
        type: String,
        required: true,
        validate: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,20}$///i
    },
  cookieId:{
    type: String, unique:true

  }, timestamp:{
    type: Object
  }
})
module.exports = LoginModel
