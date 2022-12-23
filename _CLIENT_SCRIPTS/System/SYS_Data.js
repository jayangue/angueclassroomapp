var SYS_Data = (function(){var f ={};

f.core =  
{
     //This is for UI Update
     orientation:null,

     //This is for UI
     window_width:0,
     window_height:0,

     //Account Data
     //Priviledge username: admin Password: serverdown
     enter_account_username:"",
     enter_account_password:"",
};

f.localstorage =
{
     enabled:true,
     id:"angueclassroomapp",
     version:"1.9",
     
};

f.comp_viewer = 
{
     viewer_div:"",
     viewer_selection:"",
     current_comp:0
};

f.comp =
{
     slideshow:
     {
          open_slide:"",
          view_slide:null,
          current_slide_title:0,
          current_slide_page:0,
          current_slide_max:0,
          current_slide_tag:"",
          current_slide_type:""
     },
     chat:
     {
          chat_room:"",
          message:""
     },
     videoplayer:
     {
          open_video:"",
          current_video_title:"",
          current_video_type:""
     },
     quizer:
     {
          room:"",
          answer:"",
          result:"",
     },
     quizer_editor:
     {
          input:"",
          raw_input:""
     }

};





return f;}());