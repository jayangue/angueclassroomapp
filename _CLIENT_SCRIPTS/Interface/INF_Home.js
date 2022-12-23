var INF_Home = (function(){var f ={};

f.initialize = function()
{
    //Clear the interface first before adding anything
    SYS_UI.clear({id:SYS_UI.body});

    //Create the interface
    createMainLayout(SYS_UI.body);
    createAccountLayout("INF_home_account_div");
    createInputLayout("INF_home_account_name_div","username");
    createInputLayout("INF_home_account_password_div","password");
};

f.inputIsValid = function()
{
    SYS_Data.core.enter_account_username = document.getElementById("INF_home_account_name_input").value;
    SYS_Data.core.enter_account_password = document.getElementById("INF_home_account_password_input").value;
 
    var invalid_format = /[`!@#$%^&*()-+\-=\[\]{};':"\\|,.<>\/?~]/;
    var username_invalid = invalid_format.test(SYS_Data.core.enter_account_username);
    var password_invalid = invalid_format.test(SYS_Data.core.enter_account_password);

    if(username_invalid == false && password_invalid == false)
    {
        return true;
    }
    else if(username_invalid == true || password_invalid == true)
    {
        return false;
    };
}

f.account_login = async function()
{
   if(INF_Home.inputIsValid() == false )
   {
    document.getElementById("INF_home_warning_text").innerHTML = "Username/Password can't contain Symbol(s) except underscore!"
   }
   else if(f.inputIsValid() == true )
   {
        SYS_UI.style([{id:"INF_home_account_div", visibility:"hidden"}]);
        document.getElementById("INF_home_warning_text").innerHTML = "PROCESSING PLEASE WAIT..."

        function showresult()
        {
            return new Promise(async function(resolve,reject){
                try{
                    var result = await SYS_LoginSignin.start("/login");
                    var result_json = JSON.parse(result);
                    
                    if(result_json.success == true)
                    {
                        document.getElementById("INF_home_warning_text").innerHTML = result_json.message;
                        SYS_UI.style([{id:"INF_home_account_div", visibility:"visible"}]);
                        resolve(true);
                    }
                    else if(result_json.success == false)
                    {
                        document.getElementById("INF_home_warning_text").innerHTML = result_json.message;
                        SYS_UI.style([{id:"INF_home_account_div", visibility:"visible"}]);
                        resolve(false);
                    };  
                    
                }
                catch(e)
                {
                    document.getElementById("INF_home_warning_text").innerHTML = e.toString();
                    SYS_UI.style([{id:"INF_home_account_div", visibility:"visible"}]);
                    reject(false);
                };
            });
            
        }
    
        var proceed_now = await showresult();
     
        if(proceed_now == true)
        {
            INF_Main.initialize();
        };
        
   };
   
};

f.account_signin = async function()
{
    if(f.inputIsValid() == false )
    {
     document.getElementById("INF_home_warning_text").innerHTML = "Username/Password can't contain Symbol(s) except underscore!";
    }
    else if(f.inputIsValid() == true )
    {
        SYS_UI.style([{id:"INF_home_account_div", visibility:"hidden"}]);
        document.getElementById("INF_home_warning_text").innerHTML = "PROCESSING PLEASE WAIT...";

        function showresult()
        {
            return new Promise(async function(resolve,reject){
                try{
                    var result = await SYS_LoginSignin.start("/signin");
                    var result_json = {};
                    result_json = JSON.parse(result);

                    if(result_json.success == true)
                    {
                        document.getElementById("INF_home_warning_text").innerHTML = result_json.message;
                        SYS_UI.style([{id:"INF_home_account_div", visibility:"visible"}]);
                        resolve(true);
                    }
                    else if(result_json.success == false)
                    {
                        document.getElementById("INF_home_warning_text").innerHTML = result_json.message;
                        SYS_UI.style([{id:"INF_home_account_div", visibility:"visible"}]);
                        resolve(false);
                    };    
                }
                catch(e)
                {
                    document.getElementById("INF_home_warning_text").innerHTML = e.toString();
                    SYS_UI.style([{id:"INF_home_account_div", visibility:"visible"}]);
                    resolve(false);
                };
            });
                
        };
    
        var proceed_now = await showresult();
     
        if(proceed_now == true)
        {
            INF_Main.initialize();
        };
    };
};

function createMainLayout(div_holder)
{
    var v = {};

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);

    if(v.holder_width > v.holder_height) //landscape
    {
        v.logo_holder_w = v.holder_width * 0.35;
        v.logo_holder_h = v.logo_holder_w * 0.25;
        v.logo_margin = "1%";
        v.account_holder_size = v.holder_height * 0.60;
    }
    else if(v.holder_width <= v.holder_height) //portrait
    {
        v.logo_holder_w = v.holder_width * 0.80;
        v.logo_holder_h = v.logo_holder_w * 0.45;
        v.logo_margin = "10%";
        v.account_holder_size = v.holder_width * 0.70;
    }

    SYS_UI.create([
        {
            type:"div", 
            id:"INF_home_main_div", 
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
            id:"INF_home_logo_div", 
            attach:"INF_home_main_div",
            style:{
                width: v.logo_holder_w.toString() + "px",
                height: v.logo_holder_h.toString() + "px",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"white",
                margin:v.logo_margin,
            }
        },
        {
            type:"div", 
            id:"INF_home_account_div", 
            attach:"INF_home_main_div",
            style:{
                width: v.account_holder_size.toString() + "px",
                height: v.account_holder_size.toString() + "px",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"darkblue",
            }
        },
        {
            type:"p", 
            id:"INF_home_warning_text", 
            attach:"INF_home_main_div",
            text:"NO ERRORS",
            style:{
                color:"red",
               fontWeight:"bold",
               fontSize:"150%",
               marginTop:v.logo_margin,
               textAlign:"center"
            }
        },
    ]);

};

function createAccountLayout(div_holder)
{
    var v = {};

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);

    //The DIV is a square so WIDTH is enough
    v.account_data_holder_w = v.holder_width * 0.85;
    v.account_data_holder_h = v.holder_width * 0.30;
    v.account_title_s = v.account_data_holder_w * 0.10;

    SYS_UI.create([
        {
            type:"p", 
            id:"INF_home_account_text01", 
            attach:div_holder,
            text:"ACCOUNT DETAILS",
            style:{
                color:"white",
               fontWeight:"bold",
               fontSize:v.account_title_s.toString() + "px" ,
               margin:"5%"
            }
        },
        {
            type:"div", 
            id:"INF_home_account_name_div", 
            attach:div_holder,
            style:{
                width: v.account_data_holder_w.toString() + "px",
                height: v.account_data_holder_h.toString() + "px",
                display:"flex",
                flexDirection:"column",
                justifyContent:"flex-start",
                alignItems:"center",
                backgroundColor:"darkblue",
            }
        },
        {
            type:"div", 
            id:"INF_home_account_password_div", 
            attach:div_holder,
            style:{
                width: v.account_data_holder_w.toString() + "px",
                height: v.account_data_holder_h.toString() + "px",
                display:"flex",
                flexDirection:"column",
                justifyContent:"flex-start",
                alignItems:"center",
                backgroundColor:"darkblue",
            }
        },
        {
            type:"div", 
            id:"INF_home_account_controls_div", 
            attach:div_holder,
            style:{
                width: v.account_data_holder_w.toString() + "px",
                height: v.account_data_holder_h.toString() + "px",
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center"
            }
        },
        //===================================//
        {
            type:"button", 
            id:"INF_home_login_button", 
            attach:"INF_home_account_controls_div",
            text:"LOG-IN",
            style:{
               fontWeight:"bold",
               fontSize:"100%",
               margin:"3%",
               padding:"3%"
            },
            attrib:
            {
                onclick:"INF_Home.account_login();"
            }
        },
        {
            type:"button", 
            id:"INF_home_signin_button", 
            attach:"INF_home_account_controls_div",
            text:"SIGN-IN",
            style:{
               fontWeight:"bold",
               fontSize:"100%",
               margin:"3%",
               padding:"3%"
            },
            attrib:
            {
                onclick:"INF_Home.account_signin();"
            }
        },
    ]);

};

function createInputLayout(div_holder,type_target)
{
    var v = {};

    v.holder_width = parseInt(document.getElementById(div_holder).style.width);
    v.holder_height = parseInt(document.getElementById(div_holder).style.height);
    v.w = v.holder_width * 0.90;
    v.h = v.holder_height * 0.45;
    v.font_size = v.holder_width * 0.08;

    if(type_target == "username")
    {
        v.tag = "INF_home_account_name";
        v.txt_content = "Username:";
        v.input_type = "text";
    }
    else if(type_target == "password")
    {
        v.tag = "INF_home_account_password";
        v.txt_content = "Password:"
        v.input_type = "password";
    }

    SYS_UI.create([
        {
            type:"p", 
            id:v.tag + "_txt",
            attach:div_holder,
            text:v.txt_content,
            style:{
                color:"white",
               fontWeight:"bold",
               fontSize:v.font_size.toString() + "px",
               margin:"1%"
            }
        },
        {
            type:"input", 
            id:v.tag + "_input", 
            attach:div_holder,
            style:{
                width: v.w.toString() + "px",
                height: v.h.toString() + "px",
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
                type:v.input_type
            }
        },
    ]);
}



return f;}());