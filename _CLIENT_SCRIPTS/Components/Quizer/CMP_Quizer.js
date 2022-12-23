var CMP_Quizer = (function(){var f ={};

f.initialize = function(div_holder)
{
    //Clear the interface first before adding anything
    SYS_UI.clear({id:div_holder});

    //Render interface
    createMainLayout(div_holder);
    createHeaderLayout("CMP_quizer_header_div");
    createContentLayout("CMP_quizer_content_div");

    //Set previous data
    document.getElementById("CMP_quizer_header_input").value = SYS_Data.comp.quizer.room;
    document.getElementById("CMP_quizer_answer_txtarea").value = SYS_Data.comp.quizer.answer;

    //Set this empty to it can render again
    SYS_Data.comp.quizer.result = "";

    //Update room periodically
    setInterval(function(){
        try
        {   
            SYS_Data.comp.quizer.room = document.getElementById("CMP_quizer_header_input").value;
            CMP_Quizer_Core.update();
        }
        catch(e){clearInterval()};
    },1000);

};

f.updateRoom = function(result)
{
    //Recreate
    SYS_UI.clear({id:"CMP_quizer_content_div"});
    createContentLayout("CMP_quizer_content_div");
    document.getElementById("CMP_quizer_answer_txtarea").value = SYS_Data.comp.quizer.answer;

    setInterval(function(){
        try
        {   
            SYS_Data.comp.quizer.answer = document.getElementById("CMP_quizer_answer_txtarea").value;
        }
        catch(e){clearInterval()};
    },1000);

    var result_json = JSON.parse(result);
    var v = {};
    var div_holder = "CMP_quizer_question";

    SYS_UI.clear({id:div_holder});

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);

    if(SYS_Data.core.window_width > SYS_Data.core.window_height) //landscape
    {
        v.font_size = v.holder_width * 0.03;
        v.image_w = v.holder_width * 0.45;
        v.image_h = v.holder_height * 0.90;
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.font_size = v.holder_width * 0.05;
        v.image_w = v.holder_width * 0.95;
        v.image_h = v.holder_height * 0.60;
    };

    
    if(result_json.success == true)
    {
        var content_json = JSON.parse(result_json.content);

        switch(content_json.question.type)
        {
            case "text":
                SYS_UI.create([
                    {
                        type:"p", 
                        id:"CMP_quizer_question_text", 
                        attach:div_holder, 
                        text:content_json.question.content,
                        style:{
                            color:"black",
                           fontWeight:"bold",
                           fontSize:v.font_size.toString() + "px",
                        }
                    },
                ]);
            break;

            case "image":
                SYS_UI.create([
                    {
                        type:"img", 
                        id:"CMP_quizer_question_image", 
                        attach:div_holder,
                        style:{
                            width: v.image_w.toString() + "px",
                            height: v.image_h.toString() + "px",
                            backgroundColor:"rgb(150,150,150)"
                        },
                        attrib:
                        {
                            src:`../_RESOURCES/Components/Quizer/${content_json.question.content}`
                        }
                    },
                ]);
            break;

            default:
            break;
        }

    }
    else if(result_json.success == false)
    {
        SYS_UI.clear({id:"CMP_quizer_content_div"});

        SYS_UI.create([
            {
                type:"p", 
                id:"CMP_quizer_question_text", 
                attach:"CMP_quizer_content_div", 
                text:result_json.message,
                style:{
                    color:"black",
                   fontWeight:"bold",
                   fontSize:v.font_size.toString() + "px",
                }
            },
        ]);
    }
}

f.updateResult = function(result)
{
    var result_json = JSON.parse(result);
    var content_json = JSON.parse(result_json.content);
    var v = {};
    var div_holder = "CMP_quizer_content_div";

    SYS_UI.clear({id:div_holder});

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);

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
            type:"div", 
            id:"CMP_quizer_result_holder", 
            attach:div_holder,
            style:{
                width: v.holder_width.toString() + "px",
                height: v.holder_height.toString() + "px",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"flex-start",
                overflowX:"hidden",
                overflowY:"scroll"
            }
        },
        {
            type:"p", 
            id:"CMP_quizer_answer_owner", 
            attach:"CMP_quizer_result_holder", 
            text:"YOU HAVE NO ANSWER",
            style:{
                color:"black",
               fontWeight:"bold",
               fontSize:v.font_size.toString() + "px",
               margin:"1%",
               textAlign:"left"
            }
        },
    ]);

    for(var i = 0;i <= content_json.list.length - 1;i++)
    {
        var the_list_json = JSON.parse(content_json.list[i]);

        if(the_list_json.username !== SYS_Data.core.enter_account_username)
        {
            SYS_UI.create([
                {
                    type:"p", 
                    id:"CMP_quizer_answer"+i, 
                    attach:"CMP_quizer_result_holder", 
                    text:`[${the_list_json.status}] ${the_list_json.username} >> ${the_list_json.answer}`,
                    style:{
                        color:"black",
                       fontWeight:"bold",
                       fontSize:v.font_size.toString() + "px",
                       margin:"1%",
                       textAlign:"left"
                    }
                },
            ]);
        }
        else
        {
            document.getElementById("CMP_quizer_answer_owner").innerHTML = `[${the_list_json.status}] ${the_list_json.username} >> ${the_list_json.answer}`;
        };

       
    }
    
}

function createMainLayout(div_holder)
{
    var v = {};

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);

    if(SYS_Data.core.window_width > SYS_Data.core.window_height) //landscape
    {
        v.flex_dir = "row"; //for chat controls
        v.header_h = v.holder_height * 0.15; 
        v.content_h = v.holder_height * 0.85; 
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.flex_dir = "column"; //for chat controls
        v.header_h = v.holder_height * 0.10; 
        v.content_h = v.holder_height * 0.90;
    };

    SYS_UI.create([
        {
            type:"div", 
            id:"CMP_quizer_main_div", 
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
            id:"CMP_quizer_header_div", 
            attach:"CMP_quizer_main_div",
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
            id:"CMP_quizer_content_div", 
            attach:"CMP_quizer_main_div",
            style:{
                width: v.holder_width.toString() + "px",
                height: v.content_h.toString() + "px",
                display:"flex",
                flexDirection:"column",//change this SOON
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"white",
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
        v.input_w =  v.holder_width * 0.30;
        v.input_h = v.holder_height * 0.65;
        v.button_w = v.holder_width * 0.12;
        v.button_h = v.holder_height * 0.55;
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.font_size = v.holder_width * 0.04;
        v.input_w = v.holder_width * 0.40;
        v.input_h = v.holder_height * 0.60;
        v.button_w = v.holder_width * 0.20;
        v.button_h = v.holder_height * 0.30;
    };

    SYS_UI.create([
        {
            type:"p", 
            id:"CMP_quizer_header_text", 
            attach:div_holder, 
            text:"Quizer Room: ",
            style:{
                color:"black",
               fontWeight:"bold",
               fontSize:v.font_size.toString() + "px",
            }
        },
        {
            type:"input", 
            id:"CMP_quizer_header_input", 
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
                margin:"1%"
            },
            attrib:
            {
                type:"text",
            }
        }
    ]);
};

function createContentLayout(div_holder)
{
    var v = {};

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);
    
    
    if(SYS_Data.core.window_width > SYS_Data.core.window_height) //landscape
    {
        v.font_size = v.holder_width * 0.03;
        v.question_w =  v.holder_width * 0.85;
        v.question_h = v.holder_height * 0.60;
        v.answer_w =  v.holder_width * 0.60;
        v.answer_h = v.holder_height * 0.25;
        v.button_w =  v.holder_width * 0.20;
        v.button_h = v.holder_height * 0.10;
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.font_size = v.holder_width * 0.05;
        v.question_w =  v.holder_width * 0.85;
        v.question_h = v.holder_height * 0.60;
        v.answer_w =  v.holder_width * 0.85;
        v.answer_h = v.holder_height * 0.20;
        v.button_w =  v.holder_width * 0.35;
        v.button_h = v.holder_height * 0.08;
    };


    SYS_UI.create([
        {
            type:"div", 
            id:"CMP_quizer_question", 
            attach:div_holder,
            style:{
                width: v.question_w.toString() + "px",
                height: v.question_h.toString() + "px",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                margin:"2%",
                backgroundColor:"white"
            }
        },
        {
            type:"textarea", 
            id:"CMP_quizer_answer_txtarea", 
            attach:div_holder,
            style:{
                width: v.answer_w.toString() + "px",
                height: v.answer_h.toString() + "px",
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
            type:"button", 
            id:"CMP_quizer_send_button", 
            attach:div_holder,
            text:"SEND",
            style:{
                width: v.button_w.toString() + "px",
               height: v.button_h.toString() + "px",
               fontWeight:"bold",
               fontSize:"100%",
               margin:"1%",
            },
            attrib:
            {
                onclick:"CMP_Quizer_Core.send_answer();"
            }
        },
    ]);
};

function createResultLayout(div_holder)
{
    var v = {};

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);
    
    
    if(SYS_Data.core.window_width > SYS_Data.core.window_height) //landscape
    {
        v.font_size = v.holder_width * 0.03;
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.font_size = v.holder_width * 0.08;
    };


    SYS_UI.create([
        {
            type:"p", 
            id:"CMP_quizer_result_text", 
            attach:div_holder, 
            text:"No Result",
            style:{
                color:"black",
               fontWeight:"bold",
               fontSize:v.font_size.toString() + "px",
               margin:"2%"
            }
        },
    ]);
};




return f;}());