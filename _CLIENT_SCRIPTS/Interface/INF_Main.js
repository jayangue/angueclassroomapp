var INF_Main = (function(){var f ={};

f.initialize = function()
{
    //Clear the interface first before adding anything
    SYS_UI.clear({id:SYS_UI.body});

    //Create the interface
    createMainLayout(SYS_UI.body);
    createHeaderLayout("INF_main_header_div");

    //Set Viewer data
    SYS_Data.comp_viewer.viewer_div = "INF_main_content_div";
    SYS_Data.comp_viewer.viewer_selection = "INF_main_comp_selection";

    //Set starting app
    document.getElementById(SYS_Data.comp_viewer.viewer_selection).value = SYS_Data.comp_viewer.current_comp;
    SYS_CompViewer.start();
};

function createMainLayout(div_holder)
{
    var v = {};

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);

    if(v.holder_width > v.holder_height) //landscape
    {
        v.header_height = v.holder_height * 0.15;
        v.content_height = v.holder_height * 0.85;
    }
    else if(v.holder_width <= v.holder_height) //portrait
    {
        v.header_height = v.holder_height * 0.08;
        v.content_height = v.holder_height * 0.92;
    };

    SYS_UI.create([
        {
            type:"div", 
            id:"INF_main_main_div", 
            attach:div_holder,
            style:{
                width: v.holder_width.toString() + "px",
                height: v.holder_height.toString() + "px",
                display:"flex",
                flexDirection:"column",
                justifyContent:"flex-start",
                alignItems:"center"
            }
        },
        {
            type:"div", 
            id:"INF_main_header_div", 
            attach:"INF_main_main_div",
            style:{
                width: v.holder_width.toString() + "px",
                height: v.header_height.toString() + "px",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"rgb(100,100,255)",
            }
        },
        {
            type:"div", 
            id:"INF_main_content_div", 
            attach:"INF_main_main_div",
            style:{
                width: v.holder_width.toString() + "px",
                height: v.content_height.toString() + "px",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"white",
                overflowY:"scroll"
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
        v.font_size = v.holder_width * 0.02;
        v.w = v.holder_width * 0.40;
        v.h = v.holder_height * 0.70;
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.font_size = v.holder_width * 0.04;
        v.w = v.holder_width * 0.60;
        v.h = v.holder_height * 0.60;
    };

    var the_list = SYS_CompViewer.comp_list();

    SYS_UI.selection(
    {
        id:"INF_main_comp_selection",
        attach:div_holder,
        value:"index",
        list: the_list,
        function:"SYS_CompViewer.start()"
    });

    SYS_UI.style([{
        id:"INF_main_comp_selection",
        width:v.w.toString() + "px",
        height:v.h.toString() + "px",
        fontSize:v.font_size.toString() + "px",
        fontWeight:"bold",
        padding:"1%",
        textAlign:"center",
    }]);

};


return f;}());