var SYS_Initializer = (function(){var f ={};

f.start = function()
{
    //Set storage
    SYS_LocalStorage.initialize();

    //Set interface
    initialize_interface();

    //Run Initial Interface
    INF_Home.initialize();
    
};


function initialize_interface()
{
    //Initialize SYS_UI main holder
    SYS_UI.body = "body";

    //Get orientation
    SYS_Data.core.orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;

    ////Save the current interface window sizes
    SYS_Data.core.window_width = window.innerWidth;
    SYS_Data.core.window_height = window.innerHeight;

    //Set html body
    document.body.style.width  = window.innerWidth.toString() + "px";
    document.body.style.height  = window.innerHeight.toString() + "px";
    document.body.style.overflow  = "hidden";
    document.body.style.position  = "absolute";
    document.body.style.display = "flex";
    document.body.style.flexDirection = "column";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";

    //Set app body
    document.getElementById(SYS_UI.body).style.width = SYS_Data.core.window_width.toString() + "px";
    document.getElementById(SYS_UI.body).style.height = SYS_Data.core.window_height.toString() + "px";
    document.getElementById(SYS_UI.body).style.overflow  = "hidden";
    document.getElementById(SYS_UI.body).style.position  = "absolute";

    //old orientation detection
    window.addEventListener("orientationchange", function() {
        location.reload();
    }, false);

    //modern orientation detection
    setInterval(function update_interface()
    {
        var reload_now = false;
    
        var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;

        if (orientation !==  SYS_Data.core.orientation && orientation !== undefined) 
        {
            reload_now = true;
        };

        if(reload_now === true)
        {
            location.reload();
            SYS_Data.core.orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
        };
    },100);
    



};

return f;}());