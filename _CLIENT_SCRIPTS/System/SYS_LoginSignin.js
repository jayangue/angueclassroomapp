var SYS_LoginSignin = (function(){var f ={};

f.start = function(target_mode)
{
     return new Promise(function (resolve,reject)
     {
          try{
               var theurl = window.location.protocol.concat("//").concat(window.location.host).concat(target_mode); 
               var xhr = new XMLHttpRequest();
               xhr.open("POST",theurl,false);
               xhr.setRequestHeader("Content-Type","application/json");
               xhr.onload = function()
               {   
                    if(this.status >= 200 && this.status < 300)
                    {
                         resolve(xhr.response);
                    }
                    else
                    {
                         reject(JSON.stringify(
                         {
                              success:false,
                              message:xhr.statusText
                         }));
                    }
               };
               xhr.onerror = function()
               {
                    reject(JSON.stringify(
                    {
                         success:false,
                         message:xhr.statusText
                    }));
               };

               try{
                    xhr.send(JSON.stringify({
                         username:SYS_Data.core.enter_account_username,
                         password:SYS_Data.core.enter_account_password,
                    }));
               }
               catch(e)
               {
                    reject(JSON.stringify(
                         {
                              success:false,
                              message:e
                         }));
               };
          }
          catch(e)
          {
               reject(JSON.stringify(
                    {
                         success:false,
                         message:e
                    }));
          };
          
     });    
}

return f;}());