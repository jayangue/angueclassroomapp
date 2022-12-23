var SYS_LocalStorage = (function(){var f ={};

f.initialize = function()
{
    //Load Local Storage Data
    f.load();

    //Periodically save game data
    setInterval(f.save,100);
};

f.load = function()
{
    if(SYS_Data.localstorage.enabled === true)
    {
        var data = JSON.parse(window.localStorage.getItem(SYS_Data.localstorage.id));

        if(data !== null)
        {
            if(data.version !== null || typeof(data.version) !== "undefined"){
    
                if(data.version !== SYS_Data.localstorage.version){
                    window.localStorage.removeItem(SYS_Data.localstorage.id);
                }else{

                    //Client data
                    SYS_Data.comp_viewer = data.comp_viewer;
                    SYS_Data.comp = data.comp;
                };
    
            }else{
                window.localStorage.removeItem(SYS_Data.localstorage.id);
            };
        };
    }
    else
    {
        window.localStorage.clear();
    };

};

f.save = function()
{
    if(SYS_Data.localstorage.enabled === true)
    {
        var data = 
        {
            version: SYS_Data.localstorage.version,
            comp_viewer:SYS_Data.comp_viewer,
            comp:SYS_Data.comp
        };

        window.localStorage.setItem(SYS_Data.localstorage.id,JSON.stringify(data));
    }
    else
    {
        window.localStorage.clear();
    };

};


return f;}());