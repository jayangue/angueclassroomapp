var CMP_Chat = (function(){var f ={};

const socket = io();
var MESSAGE_COLLECTION = [];

f.initialize = function(div_holder)
{
    //Clear the interface first before adding anything
    SYS_UI.clear({id:div_holder});

    //Create the interface
    createMainLayout(div_holder);
    createHeaderLayout("CMP_chat_header_div");
    createControls1Layout("CMP_chat_controls_div1");
    createControls2Layout("CMP_chat_controls_div2");

    //Set previous data
    document.getElementById("CMP_chat_header_input").value = SYS_Data.comp.chat.chat_room;
    document.getElementById("CMP_chat_message_txtarea").value = SYS_Data.comp.chat.message;

    //Initialize chat
    socket.on('SERVERComp_Chat',function(data)
    {
        MESSAGE_COLLECTION = data;
    });
    
    //Save input periodically and show message
    setInterval(function(){
        try
        {
            SYS_Data.comp.chat.chat_room = document.getElementById("CMP_chat_header_input").value;
            SYS_Data.comp.chat.message = document.getElementById("CMP_chat_message_txtarea").value;

            updateMessage();
        }
        catch(e)
        {
            clearInterval();
        }
    },100);

    //Update chat messages
    setInterval(function()
    {
        try{updateMessage("CMP_chat_content_div")}catch(e){clearInterval();};
    },500);
};

f.send = function()
{
    SYS_UI.style([{id:"CMP_chat_send_button", visibility:"hidden"}]);

    var txt1 = SYS_Data.core.enter_account_username;
    var txt2 = SYS_Data.comp.chat.chat_room;
    var txt3 = SYS_Data.comp.chat.message

    socket.emit('SERVERComp_Chat',[txt2,txt1,txt3]);

    setTimeout(function()
    {
        SYS_UI.style([{id:"CMP_chat_send_button", visibility:"visible"}]);
    },2000);
};

function updateMessage(div_holder){
				
    var v = {};
    
    v.holder_width = parseInt(document.getElementById(div_holder).style.width);

    if(SYS_Data.core.window_width > SYS_Data.core.window_height) //landscape
    {
        v.font_size = v.holder_width * 0.03;
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.font_size = v.holder_width * 0.05;
    };

    SYS_UI.clear({id:div_holder});

    var view_target = SYS_Data.comp.chat.chat_room;
    var view_sender = "";
    var view_message = "";

    for(var i = 0; i < MESSAGE_COLLECTION.length; i++){
        
        if(MESSAGE_COLLECTION[i][0] === view_target ){
            view_sender = MESSAGE_COLLECTION[i][1];
            view_message = MESSAGE_COLLECTION[i][2];
            view_data = `[[ ${view_sender} ]] >> ${view_message}`;

            SYS_UI.create([
                {
                    type:"p", 
                    id:"CMP_chat_message_txt"+i.toString(), 
                    attach:"CMP_chat_content_div", 
                    text:view_data,
                    style:{
                        display:"block",
                        overflowWrap:"break-word",
                        maxWidth:"100%",
                        color:"black",
                       fontWeight:"bold",
                       fontSize:v.font_size.toString() + "px",
                       margin:"0.5%",
                       float:"right"
                    }
                }
            ]);

        };
    };
    

};

function createMainLayout(div_holder)
{
    var v = {};

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);

    if(SYS_Data.core.window_width > SYS_Data.core.window_height) //landscape
    {
        v.flex_dir = "row"; //for chat controls
        v.header_h = v.holder_height * 0.15; 
        v.content_w = v.holder_width * 0.90; 
        v.content_h = v.holder_height * 0.65; 
        v.controls_h = v.holder_height * 0.20; 
        v.controls1_w = v.holder_width * 0.80; 
        v.controls1_h = v.controls_h;
        v.controls2_w = v.holder_width * 0.20; 
        v.controls2_h = v.controls_h;
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.flex_dir = "column"; //for chat controls
        v.header_h = v.holder_height * 0.10; 
        v.content_w = v.holder_width * 0.90; 
        v.content_h = v.holder_height * 0.65; 
        v.controls_h = v.holder_height * 0.25; 
        v.controls1_w = v.holder_width; 
        v.controls1_h = v.controls_h * 0.65;
        v.controls2_w = v.holder_width; 
        v.controls2_h = v.controls_h * 0.35;
    };

    SYS_UI.create([
        {
            type:"div", 
            id:"CMP_chat_main_div", 
            attach:div_holder,
            style:{
                width: v.holder_width.toString() + "px",
                height: v.holder_height.toString() + "px",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center"
            }
        },
        {
            type:"div", 
            id:"CMP_chat_header_div", 
            attach:"CMP_chat_main_div",
            style:{
                width: v.holder_width.toString() + "px",
                height: v.header_h.toString() + "px",
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"white"
            }
        },
        {
            type:"div", 
            id:"CMP_chat_content_div", 
            attach:"CMP_chat_main_div",
            style:{
                width: v.content_w.toString() + "px",
                height: v.content_h.toString() + "px",
                border:"2px solid black",
                display:"flex",
                flexDirection:"column",
                justifyContent:"flex-start",
                alignItems:"flex-start",
                backgroundColor:"white",
                overflowX:"hidden",
                overflowY:"scroll"
            }
        },
        {
            type:"div", 
            id:"CMP_chat_controls_div", 
            attach:"CMP_chat_main_div",
            style:{
                width: v.holder_width.toString() + "px",
                height: v.controls_h.toString() + "px",
                display:"flex",
                flexDirection:v.flex_dir,
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"white"
            }
        },
        {
            type:"div", 
            id:"CMP_chat_controls_div1", 
            attach:"CMP_chat_controls_div",
            style:{
                width: v.controls1_w.toString() + "px",
                height: v.controls1_h.toString() + "px",
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"white"
            }
        },
        {
            type:"div", 
            id:"CMP_chat_controls_div2", 
            attach:"CMP_chat_controls_div",
            style:{
                width: v.controls2_w.toString() + "px",
                height: v.controls2_h.toString() + "px",
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"white"
            }
        },
    ]);

};

function createHeaderLayout(div_holder)
{
    var v = {};

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);

    if(SYS_Data.core.window_width > SYS_Data.core.window_height) //landscape
    {
        v.font_size = v.holder_width * 0.03;
        v.input_w =  v.holder_width * 0.30;
        v.input_h = v.holder_height * 0.65;
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.font_size = v.holder_width * 0.06;
        v.input_w = v.holder_width * 0.40;
        v.input_h = v.holder_height * 0.60;
    };

    SYS_UI.create([
        {
            type:"p", 
            id:"CMP_chat_input_text", 
            attach:div_holder, 
            text:"Chat Room: ",
            style:{
                color:"black",
               fontWeight:"bold",
               fontSize:v.font_size.toString() + "px",
               margin:"2%"
            }
        },
        {
            type:"input", 
            id:"CMP_chat_header_input", 
            attach:div_holder,
            style:{
                width: v.input_w.toString() + "px",
                height: v.input_h.toString() + "px",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"rgb(200,200,200)",
                fontSize:"120%",
                fontWeight:"bold"
            },
            attrib:
            {
                type:"text"
            }
        },
    ]);
};

function createControls1Layout(div_holder)
{
    var v = {};

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);
    v.message_w =  v.holder_width * 0.90;
    v.message_h = v.holder_height * 0.80;
    
    if(SYS_Data.core.window_width > SYS_Data.core.window_height) //landscape
    {
        v.font_size = v.holder_width * 0.03;
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.font_size = v.holder_width * 0.05;
    };


    SYS_UI.create([
        {
            type:"textarea", 
            id:"CMP_chat_message_txtarea", 
            attach:div_holder,
            style:{
                width: v.message_w.toString() + "px",
                height: v.message_h.toString() + "px",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"rgb(200,200,200)",
                fontSize:v.font_size.toString() + "px",
                fontWeight:"bold"
            },
            attrib:
            {
                type:"text"
            }
        },
    ]);
};

function createControls2Layout(div_holder)
{
    var v = {};

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);
    
    if(SYS_Data.core.window_width > SYS_Data.core.window_height) //landscape
    {
        v.font_size = v.holder_width * 0.04;
        v.button_w =  v.holder_width * 0.70;
        v.button_h = v.holder_height * 0.60;
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.font_size = v.holder_width * 0.07;
        v.button_w =  v.holder_width * 0.30;
        v.button_h = v.holder_height * 0.50;
    };

    SYS_UI.create([
        {
            type:"button", 
            id:"CMP_chat_send_button", 
            attach:div_holder,
            text:"SEND",
            style:{
                width: v.button_w.toString() + "px",
               height: v.button_h.toString() + "px",
               fontWeight:"bold",
               fontSize:"100%",
               margin:"3%",
            },
            attrib:
            {
                onclick:"CMP_Chat.send();"
            }
        },
    ]);
};

return f;}());