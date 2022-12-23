var CMP_Quizer_Editor_Core = (function(){var f ={};

f.send = function()
{
     return new Promise(function (resolve,reject)
     {
          try{
               var theurl = window.location.protocol.concat("//").concat(window.location.host).concat("/quizer_editor_input"); 
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
                    xhr.send(JSON.stringify(
                    {
                        input:SYS_Data.comp.quizer_editor.input
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