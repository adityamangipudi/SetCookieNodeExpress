/**
 * Created by adityamangipudi1 on 4/23/15.
 */
var router  =require('express').Router()
var LoginModel = require('../models/login_model')

var cookieParser = require('cookie-parser');

router.post('/', function (req, res){

    console.log('req', req.body);
    //search for data, if found create uuid and session data sent back
    LoginModel.find(req.body, function(err, result){
      console.log(result)
      if(err) {
        res.status(500).json(err)
      }
      else {
        result = result.pop()
        function uuid() {
          var identifier = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
          });
          return identifier
        };


        var uniqueid = uuid()
        console.log('uuid', uuid())
        var obj = result
        var timestamp = new Date(Date.now())
        var expires =new Date(Date.now() + 900000)
        obj.cookieId = uniqueid
        obj.timestamp = timestamp
        console.log(timestamp)
        console.log('resuly', obj)
        LoginModel.update(obj, function(err, result){
          console.log(err, result);
          console.log('err', err)
          console.log('result', result)
          if(err) res.status(500).json(err)
          else {
            res.cookie('cookie-id',uniqueid,  { expires: expires,maxAge: 900000,httpOnly: false})

            res.status(200).json(result)
          }
        });

      }


    })
/*
     new LoginModel(req.body).save( function(err, result){
        console.log(err, result);
        if(err) res.status(500).json(err)
        else res.status(200).json(result)
    });*/
});
module.exports = router;
