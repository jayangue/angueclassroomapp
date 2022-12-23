var SYS_UI = (function(){var f = {};

/*
    .create([{type:"",attach:"",id:""}]);
    .create([{type:"",attach:"",id:"",class:"",text:"",attrib:{onclick:""}}]);

    .attrib([{id:"",onclick:"foo();"}]);
    .attrib([{id:"",onclick:"foo();",onmouseover:"bar();"}]);

    .style([{id:"",color:"red"}]);
    .style([{id:"",fontSize:"12px",backgroundColor:"red"}]);

    var mylist = ["q1","q2","q3"];
    .selection({id:"",attach:"",value:"content"/"index",list:mylist,function:"bar();"});

    .progress_bar({id:"",attach:"",width:"300px",height:"100px",color:"green"});
    .progress_bar({id:"",current:100,max:2000});

    id = the element id of the cooldown mask div
    .cooldown({id:"",current:3,max:10});

*/

f.body = "";

f.clear = function(params)
{
    /*
        This function deletes only child elements
    */

    var a = document.getElementById(params.id); 

    if(a !== null)
    {
        while (a.hasChildNodes())
        {
            a.removeChild(a.firstChild);
        };
    };
};

f.delete = function(params) 
{
    /*
        This function deletes the parent element 
        including the child elements
    */
        
    var a = document.getElementById(params.id); 

    if(a !== null) 
    {
        a.parentNode.removeChild(a);
    };
};


f.create = function(params)
{
    
    for(var i = 0; i <= params.length - 1; i++)
    {
        var new_element = null;

        if(typeof(params[i].type) !== "undefined")
        {
            new_element = document.createElement(params[i].type);
    
            if(typeof(params[i].attach) !== "undefined" && new_element !== null)
            {
                var attach_element = document.getElementById(params[i].attach);
                attach_element.appendChild(new_element);
            };
        };
    
        if(typeof(params[i].id) !== "undefined" && new_element !== null)
        {
            new_element.setAttribute("id",params[i].id);
        };
    
        if(typeof(params[i].class) !== "undefined" && new_element !== null)
        {
            new_element.setAttribute("class",params[i].class);
        };
    
        if(typeof(params[i].text) !== "undefined" && new_element !== null)
        {
            var text_element = document.createTextNode(params[i].text);
            new_element.appendChild(text_element);
        };
            
        if(typeof(params[i].attrib) !== "undefined" && new_element !== null)
        {
            params[i].attrib.id = params[i].id;
            f.attrib([params[i].attrib]);
        };
    
        if(typeof(params[i].style) !== "undefined" && new_element !== null)
        {
            params[i].style.id = params[i].id;
            f.style([params[i].style]);
        };

    };

};

f.attrib = function(params){

    for(var i = 0; i <= params.length - 1; i++)
    {
        try
        {
            var target_element = document.getElementById(params[i].id);
    
            for (var key of Object.keys(params[i]))
            {
                if(key.toString() !== "id"){
                    target_element.setAttribute(key.toString(),params[i][key]);
                }  
            };

        }catch(e)
        {
            console.log(`ERROR: Requires id:{} >>> " + ${JSON.stringify(params)}`);
        };
    };

};

f.style = function(params)
{
    for(var i = 0; i <= params.length - 1; i++)
    {
        try
        {
            var target_element = document.getElementById(params[i].id);

            for (var key in params[i])
            {
                if(key.toString() !== "id"){
                    target_element.style[key] = params[i][key];
                };  
            };

        }catch(e)
        {
            console.log(`ERROR: Requires id:{} >>> " + ${JSON.stringify(params)}`);
        };

    };
};

f.selection = function(params)
{
    if(typeof(params.id) !== "undefined")
    {

        if(typeof(params.attach) !== "undefined")
        {
            var selection_element = document.createElement("SELECT");
            selection_element.setAttribute("id",params.id);

            var attach_element = document.getElementById(params.attach);
            attach_element.appendChild(selection_element);
        };

        if(typeof(params.function) !== "undefined")
        {
            selection_element.setAttribute("onchange",params.function);
        };

        if(typeof(params.list) !== "undefined")
        {
            for (var i = 0;i < params.list.length;i++)
            {
                var option_element = document.createElement("OPTION");
                option_element.setAttribute("id",params.id+"_option"+i);
                option_element.setAttribute("class",params.id+"_class");

                var text_element = document.createElement("P"); 
                text_element.innerHTML = params.list[i];
                text_element.setAttribute("class",params.id+"_texts");

                option_element.appendChild(text_element);

                if(typeof(params.value) !== "undefined" && params.value === "content")
                {
                    option_element.setAttribute("value",params.list[i]);

                }else if(typeof(params.value) !== "undefined" && params.value === "index")
                {
                    option_element.setAttribute("value",i);
                };

                selection_element.appendChild(option_element);
                    
                            
            };//end for
                    
        };//end if

    };

};

f.progressBar = function(params)
{
    if(typeof(params.id) !== "undefined")
    {
        if(typeof(params.attach) !== "undefined")
        {
            var holder_element = document.createElement("DIV");
            holder_element.setAttribute("id",params.id+"_holder");
            holder_element.style.width = params.width; 
            holder_element.style.height = params.height; 
            holder_element.style.border = "solid black 1px";
            holder_element.style.backgroundColor = params.bgcolor;
            holder_element.style.position = "absolute";
            holder_element.style.display = "flex";
            holder_element.style.flexDirection = "column";
            holder_element.style.justifyContent = "center";
            holder_element.style.aligntItems = "center";
            holder_element.style.textAlign = "center";
    
            var attach_element = document.getElementById(params.attach);
            attach_element.appendChild(holder_element);

            var bar_element = document.createElement("DIV");
            bar_element.setAttribute("id",params.id+"_bar");
            bar_element.style.width = "60%"; 
            bar_element.style.height = "100%";
            bar_element.style.backgroundColor = params.color;
            bar_element.style.position = "absolute";
            bar_element.style.zIndex = 1;

            holder_element.appendChild(bar_element);

            if(params.show_text === true)
            {
                var text_element = document.createElement("P");
                text_element.innerHTML = "0";
                text_element.setAttribute("id",params.id+"_bar_txt");
                text_element.style.color = params.text_color;
                text_element.style.textAlign = "center";
                text_element.style.fontWeight = "bold";
                text_element.style.fontSize = params.font_size.toString() + "px";
                text_element.style.zIndex = 2;

                holder_element.appendChild(text_element);
            };

        };

        if(typeof(params.current) !== "undefined" && typeof(params.max) !== "undefined")
        {
            var target_element = document.getElementById(params.id + "_bar");

            var percentage = params.current / params.max;
            percentage = Math.floor(percentage * 100);
                
            if(percentage < 0)
            {
                percentage = 0
            };
                
            target_element.style.width = percentage+"%";

            document.getElementById(params.id + "_bar_txt").innerHTML = `${params.current}`;
        };

    };
};

f.cooldown = function(params)
{
    var el = document.getElementById(params.id);
    var cd_percent = 100 * (params.current / params.max);
    var cd_pos = 100 - cd_percent;

    if(cd_percent > -1)
    {
        el.style.height = cd_percent.toString() + "%";
        el.style.top = cd_pos.toString() + "%";
    };
        
};


return f;}());