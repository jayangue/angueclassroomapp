var CMP_Menu = (function(){var f ={};

f.initialize = function(div_holder)
{
    //Clear the interface first before adding anything
    SYS_UI.clear({id:div_holder});

    //Create the interface
    createMainLayout(div_holder);
};

f.logout = function()
{
    location.reload();
}

function createMainLayout(div_holder)
{
    var v = {};

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);

    if(SYS_Data.core.window_width > SYS_Data.core.window_height) //landscape
    {
        v.font_size = v.holder_width * 0.04;
        v.w = v.holder_width * 0.18;
        v.h = v.holder_height * 0.10;
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.font_size = v.holder_width * 0.10;
        v.w = v.holder_width * 0.45;
        v.h = v.holder_height * 0.06;
    };

    SYS_UI.create([
        {
            type:"div", 
            id:"CMP_menu_main_div", 
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
            type:"p", 
            id:"CMP_menu_name_text", 
            attach:"CMP_menu_main_div", 
            text:SYS_Data.core.enter_account_username,
            style:{
                color:"darkblue",
               fontWeight:"bold",
               fontSize:v.font_size.toString() + "px",
               margin:"10%",
               textAlign:"center"
            }
        },
        {
            type:"button", 
            id:"CMP_menu_logout_button", 
            attach:"CMP_menu_main_div",
            text:"LOG-OUT",
            style:{
                width:v.w.toString() + "px",
                height:v.h.toString() + "px",
               fontWeight:"bold",
               fontSize:"100%",
               margin:"5%",
            },
            attrib:
            {
                onclick:"CMP_Menu.logout();"
            }
        },
    ]);

};



return f;}());