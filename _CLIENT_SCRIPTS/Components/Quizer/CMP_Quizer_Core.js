var CMP_Quizer_Core = (function(){var f ={};

f.update = async function()
{
     try
     {
          SYS_Data.comp.quizer.room = document.getElementById("CMP_quizer_header_input").value;

          var result = await CMP_Quizer_Core.render();

          if(SYS_Data.comp.quizer.result !== result)
          {
               SYS_Data.comp.quizer.result = result;

               var result_json = JSON.parse(result);
               var content_json = JSON.parse(result_json.content);
          
               if(content_json.action == "result")
               {
                    CMP_Quizer.updateResult(result);
               }
               else
               {
                    CMP_Quizer.updateRoom(result);
               }
          }
     }
     catch(e)
     {
          CMP_Quizer.updateRoom(JSON.stringify({success:false,message:""}));
     }
    
};

f.send_answer = async function()
{
     SYS_UI.style([{id:"CMP_quizer_send_button", visibility:"hidden"}]);

     SYS_Data.comp.quizer.room = document.getElementById("CMP_quizer_header_input").value;
     SYS_Data.comp.quizer.answer = document.getElementById("CMP_quizer_answer_txtarea").value;

     var result = await CMP_Quizer_Core.answer();
     
     console.log(result);

     setTimeout(function()
    {
        SYS_UI.style([{id:"CMP_quizer_send_button", visibility:"visible"}]);
    },2000);
     
}


f.render = function()
{
     return new Promise(function (resolve,reject)
     {
          try{
               var theurl = window.location.protocol.concat("//").concat(window.location.host).concat("/quizer_render"); 
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
                        room:SYS_Data.comp.quizer.room
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

f.answer = function()
{
     return new Promise(function (resolve,reject)
     {
          try{
               var theurl = window.location.protocol.concat("//").concat(window.location.host).concat("/quizer_answer"); 
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
                        username:SYS_Data.core.enter_account_username,
                        room:SYS_Data.comp.quizer.room,
                        answer:SYS_Data.comp.quizer.answer
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