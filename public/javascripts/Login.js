/**
 * Created by adityamangipudi1 on 4/23/15.
 */




document.addEventListener('DOMContentLoaded', function () {




    function checkPassword(str)
    {
        // at least one number, one lowercase and one uppercase letter
        // at least six characters that are letters, numbers or the underscore
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
        return re.test(str);
    }





    var loginSubmit = document.querySelector('input.loginButton')
    console.log('login button = ', loginSubmit)
    loginSubmit.addEventListener('click', function(event){
        console.log('in here')
        event.preventDefault();
       if( checkPassword(document.forms.login.password.value)){
            console.log('chill')
            makePOSTAjaxCall('/login', {email: document.forms.login.email.value ,
                                            password: document.forms.login.password.value}, function(xhr){
               if(xhr.readyState===4){
                 //xhr
                 //xhr.getResponseHeader('Set-Cookie')
                 var xhtres = document.cookie.split('; ');
                 //  var response = JSON.parse(xhr.responseText)
                   console.log('cookie', xhtres[xhtres.length-1])
                 //  console.log(response)
                   //console.log(response)
                 //  render(response)
               }
               // console.log(xhr.readyState)
           })
            //authenticate, send to backend, check...if exist create uuid store it w/ timestamp, cookie,
       }else{
           console.log('not chill')

       }
    })

    function makePOSTAjaxCall(url, obj, callback) { // obj is optional depending on the request
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);

        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4) {
                callback(xhr);
            }
        });
        xhr.send(JSON.stringify(obj));

    }


});
