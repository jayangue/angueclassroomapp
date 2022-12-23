var CMP_Quizer_Editor = (function(){var f ={};

f.initialize = function(div_holder)
{
    //Clear the interface first before adding anything
    SYS_UI.clear({id:div_holder});

    //Render interface
    createMainLayout(div_holder);

    //Enter previous input
    document.getElementById("CMP_quizer_editor_txtarea").value =  SYS_Data.comp.quizer_editor.raw_input;
};

/* SAMPLE INPUT
    {
        room:"qwertt"
        action:"create/edit",
        question:
        {
            type:"text",
            content:"TEXT HERE"
        }   
    }
    {
        room:"qwertt"
        action:"delete",
    }
    {
        room:"qwertt"
        action:"result",
        correct:null / "the correct answer"
    }
*/

f.activate = async function()
{
    SYS_UI.style([{id:"CMP_quizer_activate_button", visibility:"hidden"}]);

    try
    {
       var editor_input = document.getElementById("CMP_quizer_editor_txtarea").value;
       SYS_Data.comp.quizer_editor.raw_input = editor_input;

       eval(`SYS_Data.comp.quizer_editor.input = JSON.stringify(${editor_input})`);

       var result = await CMP_Quizer_Editor_Core.send();

       document.getElementById("CMP_quizer_editor_log").innerHTML = JSON.stringify(result);
    }
    catch(e)
    {
        document.getElementById("CMP_quizer_editor_log").innerHTML = e;
        console.log(e);
    }

    setTimeout(function()
    {
        SYS_UI.style([{id:"CMP_quizer_activate_button", visibility:"visible"}]);
    },2000);
   
}

function createMainLayout(div_holder)
{
    var v = {};

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);
    
    
    if(SYS_Data.core.window_width > SYS_Data.core.window_height) //landscape
    {
        v.font_size = v.holder_width * 0.02;
        v.input_w =  v.holder_width * 0.90;
        v.input_h = v.holder_height * 0.60;
        v.button_w =  v.holder_width * 0.20;
        v.button_h = v.holder_height * 0.10;
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.font_size = v.holder_width * 0.04;
        v.input_w =  v.holder_width * 0.90;
        v.input_h = v.holder_height * 0.50;
        v.button_w =  v.holder_width * 0.35;
        v.button_h = v.holder_height * 0.05;
    };


    SYS_UI.create([
        {
            type:"textarea", 
            id:"CMP_quizer_editor_txtarea", 
            attach:div_holder,
            style:{
                width: v.input_w.toString() + "px",
                height: v.input_h.toString() + "px",
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
        {
            type:"p", 
            id:"CMP_quizer_editor_log", 
            attach:div_holder, 
            text:"No Errors",
            style:{
                color:"black",
               fontWeight:"bold",
               fontSize:v.font_size.toString() + "px",
               margin:"2%"
            }
        },
        {
            type:"button", 
            id:"CMP_quizer_activate_button", 
            attach:div_holder,
            text:"ACTIVATE",
            style:{
                width: v.button_w.toString() + "px",
               height: v.button_h.toString() + "px",
               fontWeight:"bold",
               fontSize:"100%",
               margin:"1%",
            },
            attrib:
            {
                onclick:"CMP_Quizer_Editor.activate();"
            }
        },
    ]);
};

return f;}());