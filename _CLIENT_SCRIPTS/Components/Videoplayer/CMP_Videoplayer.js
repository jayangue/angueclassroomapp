var CMP_Videoplayer = (function(){var f ={};

f.initialize = function(div_holder)
{
    //Clear the interface first before adding anything
    SYS_UI.clear({id:div_holder});

    //Create interface
    createMainLayout(div_holder);
    createHeaderLayout("CMP_videoplayer_header_div");

    //Enter previous data
    document.getElementById("CMP_videoplayer_header_input").value = SYS_Data.comp.videoplayer.open_video;
    f.openVideo();
};

f.updateVideo = function()
{
    var txt = {};
    txt.a = CMP_Videoplayer_Data.default_link;
    txt.b = SYS_Data.comp.videoplayer.current_video_title
    txt.c = SYS_Data.comp.videoplayer.current_video_type;

    SYS_UI.attrib([{id:"CMP_videoplayer_content_video",src:`${txt.a}/${txt.b}.${txt.c}`}]);
}

f.openVideo = function()
{
    
    var target_video = document.getElementById("CMP_videoplayer_header_input").value;
    target_video = target_video.toString().toLowerCase();
    SYS_Data.comp.videoplayer.open_video = target_video;
    var target_video_exist = false;

    for(var i = 0; i <= CMP_Videoplayer_Data.video_list.length - 1;i++)
    {
        if(CMP_Videoplayer_Data.video_list[i].video_title == target_video)
        {
            SYS_Data.comp.videoplayer.current_video_title = CMP_Videoplayer_Data.video_list[i].video_title;
            SYS_Data.comp.videoplayer.current_video_type = CMP_Videoplayer_Data.video_list[i].video_type;
            target_video_exist = true;
            break;
        }
    };

    if(target_video_exist == true)
    {
        createContentVideoLayout("CMP_videoplayer_content_div");
        f.updateVideo();
    }
    else if(target_video_exist == false)
    {
        createContentNoVideoLayout("CMP_videoplayer_content_div");
    }
    
}

function createMainLayout(div_holder)
{
    var v = {};

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);

    if(SYS_Data.core.window_width > SYS_Data.core.window_height) //landscape
    {
        v.header_h = v.holder_height * 0.20; 
        v.content_h = v.holder_height * 0.80;
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.header_h = v.holder_height * 0.15; 
        v.content_h = v.holder_height * 0.85;
    };

    SYS_UI.create([
        {
            type:"div", 
            id:"CMP_videoplayer_main_div", 
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
            id:"CMP_videoplayer_header_div", 
            attach:"CMP_videoplayer_main_div",
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
            id:"CMP_videoplayer_content_div", 
            attach:"CMP_videoplayer_main_div",
            style:{
                width: v.holder_width.toString() + "px",
                height: v.content_h.toString() + "px",
                display:"flex",
                flexDirection:"column",
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
        v.flex_direction = "row";
        v.input_w = v.holder_width * 0.35;
        v.input_h = v.holder_height * 0.60;
        v.button_w = v.holder_width * 0.18;
        v.button_h = v.holder_height * 0.45;
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.flex_direction = "column";
        v.input_w = v.holder_width * 0.60;
        v.input_h = v.holder_height * 0.25;
        v.button_w = v.holder_width * 0.40;
        v.button_h = v.holder_height * 0.25;
    };

    SYS_UI.style([
        {
            id:div_holder, 
            flexDirection:v.flex_direction,
        }
    ]);

    SYS_UI.create([
        {
            type:"input", 
            id:"CMP_videoplayer_header_input", 
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
                fontWeight:"bold",
                margin:"2%"
            },
            attrib:
            {
                type:"text"
            }
        },
        {
            type:"button", 
            id:"CMP_videoplayer_header_button", 
            attach:div_holder,
            text:"OPEN VIDEO",
            style:{
                width: v.button_w.toString() + "px",
               height: v.button_h.toString() + "px",
               fontWeight:"bold",
               fontSize:"100%",
               margin:"2%"
            },
            attrib:
            {
                onclick:"CMP_Videoplayer.openVideo();"
            }
        },
    ]);

};

function createContentVideoLayout(div_holder)
{
    //Clear the interface first before adding anything
    SYS_UI.clear({id:div_holder});

    var v = {};

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);

    if(SYS_Data.core.window_width > SYS_Data.core.window_height) //landscape
    {
        v.video_w = v.holder_width * 0.55;
        v.video_h = v.holder_height * 0.90;
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.video_w = v.holder_width * 0.90;
        v.video_h = v.holder_height * 0.35;
    };

    SYS_UI.create([
        {
            type:"video", 
            id:"CMP_videoplayer_content_video", 
            attach:div_holder,
            style:{
                width: v.video_w.toString() + "px",
                height: v.video_h.toString() + "px",
                backgroundColor:"rgb(150,150,150)"
            },
            attrib:{
                controls:"",
            }
        },
    ]);
};

function createContentNoVideoLayout(div_holder)
{
    //Clear the interface first before adding anything
    SYS_UI.clear({id:div_holder});
    
    var v = {};

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);

    if(SYS_Data.core.window_width > SYS_Data.core.window_height) //landscape
    {
        v.font_size = v.holder_width * 0.04;
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.font_size = v.holder_width * 0.08;
    };

    SYS_UI.create([
        {
            type:"p", 
            id:"CMP_videoplayer_content_text", 
            attach:div_holder, 
            text:"VIDEO DOES NOT EXIST!",
            style:{
                color:"red",
               fontWeight:"bold",
               fontSize:v.font_size.toString() + "px",
               textAlign:"center",
            }
        },
    ]);
};


return f;}());