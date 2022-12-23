var CMP_Slideshow = (function(){var f ={};

f.initialize = function(div_holder)
{
    //Clear the interface first before adding anything
    SYS_UI.clear({id:div_holder});

    //Create the interface
    createMainLayout(div_holder);
    createHeaderLayout("CMP_slideshow_header_div");
    createContentLayout("CMP_slideshow_content_div");
    createControlsLayout("CMP_slideshow_controls_div");

    //Initialize 
    document.getElementById("CMP_slideshow_header_input1").value = SYS_Data.comp.slideshow.open_slide; 
    document.getElementById("CMP_slideshow_header_input2").value = SYS_Data.comp.slideshow.view_slide;

    f.updateSlide();
};

f.updateSlide = function()
{
    var txt = {};
    txt.a = CMP_Slideshow_Data.default_link;
    txt.b = SYS_Data.comp.slideshow.current_slide_title;
    txt.c = SYS_Data.comp.slideshow.current_slide_tag;
    txt.d = SYS_Data.comp.slideshow.current_slide_page;
    txt.e = SYS_Data.comp.slideshow.current_slide_type;
    txt.f = SYS_Data.comp.slideshow.current_slide_max;

    SYS_UI.attrib([{id:"CMP_slideshow_content_image",src:`${txt.a}${txt.b}/${txt.c}${txt.d}.${txt.e}`}]);
    document.getElementById("CMP_slideshow_controls_page").innerHTML = `${txt.d}/${txt.f}`;

}

f.openSlide = function()
{
    var target_slide = document.getElementById("CMP_slideshow_header_input1").value;
    target_slide = target_slide.toString().toLowerCase();
    SYS_Data.comp.slideshow.open_slide = target_slide;

    for(var i = 0; i <= CMP_Slideshow_Data.slide_list.length - 1;i++)
    {
        if(CMP_Slideshow_Data.slide_list[i].title == target_slide)
        {
            SYS_Data.comp.slideshow.current_slide_title = CMP_Slideshow_Data.slide_list[i].title;
            SYS_Data.comp.slideshow.current_slide_page = CMP_Slideshow_Data.slide_list[i].slide_default;
            SYS_Data.comp.slideshow.current_slide_max = CMP_Slideshow_Data.slide_list[i].slide_max;
            SYS_Data.comp.slideshow.current_slide_tag = CMP_Slideshow_Data.slide_list[i].slide_tag;
            SYS_Data.comp.slideshow.current_slide_type = CMP_Slideshow_Data.slide_list[i].slide_type;
            break;
        }
    };

    f.updateSlide();
}

f.viewSlide = function()
{
    SYS_Data.comp.slideshow.view_slide = document.getElementById("CMP_slideshow_header_input2").value;
    var page = parseInt(SYS_Data.comp.slideshow.view_slide);

    if(page >= 1 && page <= SYS_Data.comp.slideshow.current_slide_max)
    {
        SYS_Data.comp.slideshow.current_slide_page = page;
    }

    f.updateSlide();
}

f.prevSlide = function()
{
    var num = {};
    num.page = SYS_Data.comp.slideshow.current_slide_page;
    num.max = SYS_Data.comp.slideshow.current_slide_max;
    
    if(num.page > 1)
    {
        num.page--;
    }
    else if(num.page <= 1)
    {
        num.page = num.max;
    };

    SYS_Data.comp.slideshow.current_slide_page = num.page;
    f.updateSlide();
}

f.nextSlide = function()
{
    var num = {};
    num.page = SYS_Data.comp.slideshow.current_slide_page;
    num.max = SYS_Data.comp.slideshow.current_slide_max;
    
    if(num.page < num.max)
    {
        num.page++;
    }
    else if(num.page >= num.max)
    {
        num.page = 1;
    };

    SYS_Data.comp.slideshow.current_slide_page = num.page;
    f.updateSlide();
}

function createMainLayout(div_holder)
{
    var v = {};

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);

    if(SYS_Data.core.window_width > SYS_Data.core.window_height) //landscape
    {
        v.header_h = v.holder_height * 0.20; 
        v.content_h = v.holder_height * 0.60; 
        v.controls_h = v.holder_height * 0.20; 
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.header_h = v.holder_height * 0.25; 
        v.content_h = v.holder_height * 0.50; 
        v.controls_h = v.holder_height * 0.25; 
    };

    SYS_UI.create([
        {
            type:"div", 
            id:"CMP_slideshow_main_div", 
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
            id:"CMP_slideshow_header_div", 
            attach:"CMP_slideshow_main_div",
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
            id:"CMP_slideshow_content_div", 
            attach:"CMP_slideshow_main_div",
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
        {
            type:"div", 
            id:"CMP_slideshow_controls_div", 
            attach:"CMP_slideshow_main_div",
            style:{
                width: v.holder_width.toString() + "px",
                height: v.controls_h.toString() + "px",
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
    v.subhead_w = v.holder_width / 2;

    if(SYS_Data.core.window_width > SYS_Data.core.window_height) //landscape
    {
        v.flex_direction = "row";
        v.input_w = v.subhead_w * 0.50;
        v.input_h = v.holder_height * 0.50;
        v.button_w = v.subhead_w * 0.30;
        v.button_h = v.holder_height * 0.40;
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.flex_direction = "column";
        v.input_w = v.subhead_w * 0.90;
        v.input_h = v.holder_height * 0.20;
        v.button_w = v.subhead_w * 0.60;
        v.button_h = v.holder_height * 0.20;
    };

    SYS_UI.create([
        {
            type:"div", 
            id:"CMP_slideshow_subhead_div1", 
            attach:div_holder,
            style:{
                width: v.subhead_w.toString() + "px",
                height: v.holder_height.toString() + "px",
                display:"flex",
                flexDirection:v.flex_direction,
                justifyContent:"center",
                alignItems:"center"
            }
        },
        {
            type:"input", 
            id:"CMP_slideshow_header_input1", 
            attach:"CMP_slideshow_subhead_div1",
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
        {
            type:"button", 
            id:"CMP_slideshow_header_button1", 
            attach:"CMP_slideshow_subhead_div1",
            text:"OPEN SLIDE",
            style:{
                width: v.button_w.toString() + "px",
               height: v.button_h.toString() + "px",
               fontWeight:"bold",
               fontSize:"100%",
               margin:"3%",
            },
            attrib:
            {
                onclick:"CMP_Slideshow.openSlide();"
            }
        },
    ]);

    SYS_UI.create([
        {
            type:"div", 
            id:"CMP_slideshow_subhead_div2", 
            attach:div_holder,
            style:{
                width: v.subhead_w.toString() + "px",
                height: v.holder_height.toString() + "px",
                display:"flex",
                flexDirection:v.flex_direction,
                justifyContent:"center",
                alignItems:"center"
            }
        },
        {
            type:"input", 
            id:"CMP_slideshow_header_input2", 
            attach:"CMP_slideshow_subhead_div2",
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
        {
            type:"button", 
            id:"CMP_slideshow_header_button2", 
            attach:"CMP_slideshow_subhead_div2",
            text:"VIEW SLIDE",
            style:{
                width: v.button_w.toString() + "px",
               height: v.button_h.toString() + "px",
               fontWeight:"bold",
               fontSize:"100%",
               margin:"3%",
            },
            attrib:
            {
                onclick:"CMP_Slideshow.viewSlide();"
            }
        },
    ]);

};

function createContentLayout(div_holder)
{
    var v = {};

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);

    if(SYS_Data.core.window_width > SYS_Data.core.window_height) //landscape
    {
        v.image_w = v.holder_width * 0.40;
        v.image_h = v.holder_height * 0.90;
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.image_w = v.holder_width * 0.90;
        v.image_h = v.holder_height * 0.60;
    };

    SYS_UI.create([
        {
            type:"img", 
            id:"CMP_slideshow_content_image", 
            attach:div_holder,
            style:{
                width: v.image_w.toString() + "px",
                height: v.image_h.toString() + "px",
                backgroundColor:"rgb(150,150,150)"
            }
        },
    ]);
};

function createControlsLayout(div_holder)
{
    var v = {};

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);

    if(SYS_Data.core.window_width > SYS_Data.core.window_height) //landscape
    {
        v.font_size = v.holder_width * 0.04;
        v.button_w = v.holder_width * 0.15;
        v.button_h = v.holder_height * 0.60;
    }
    else if(SYS_Data.core.window_width <= SYS_Data.core.window_height) //portrait
    {
        v.font_size = v.holder_width * 0.09;
        v.button_w = v.holder_width * 0.30;
        v.button_h = v.holder_height * 0.25;
    };

    SYS_UI.create([
        {
            type:"button", 
            id:"CMP_slideshow_controls_prev_button", 
            attach:div_holder,
            text:"PREV",
            style:{
                width: v.button_w.toString() + "px",
               height: v.button_h.toString() + "px",
               fontWeight:"bold",
               fontSize:"100%",
               margin:"3%",
            },
            attrib:
            {
                onclick:"CMP_Slideshow.prevSlide();"
            }
        },
        {
            type:"p", 
            id:"CMP_slideshow_controls_page", 
            attach:div_holder, 
            text:"0/0",
            style:{
                color:"black",
               fontWeight:"bold",
               fontSize:v.font_size.toString() + "px",
               textAlign:"center"
            }
        },
        {
            type:"button", 
            id:"CMP_slideshow_controls_next_button", 
            attach:div_holder,
            text:"NEXT",
            style:{
                width: v.button_w.toString() + "px",
               height: v.button_h.toString() + "px",
               fontWeight:"bold",
               fontSize:"100%",
               margin:"3%",
            },
            attrib:
            {
                onclick:"CMP_Slideshow.nextSlide();"
            }
        },
    ]);

};


return f;}());