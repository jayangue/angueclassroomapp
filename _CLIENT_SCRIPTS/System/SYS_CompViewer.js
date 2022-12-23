var SYS_CompViewer = (function(){var f ={};

f.comp_list = function()
{
     var common_list = [ "Menu","Slideshow","Videoplayer","Quizer"];
     var admin_list = ["Chat","Quizer Editor"];

     if(SYS_Data.core.enter_account_username === "admin" && SYS_Data.core.enter_account_password === "serverdown")
     {
          return SYS_Utils.combineArray(common_list,admin_list);
     };

     return common_list;
}


f.start =  function()
{
     var comp_list = f.comp_list();
     var comp_index = document.getElementById(SYS_Data.comp_viewer.viewer_selection).value;
     var comp_name = comp_list[comp_index];
     var comp_div = SYS_Data.comp_viewer.viewer_div;

     SYS_Data.comp_viewer.current_comp = comp_index;

     switch(comp_name)
     {
          case "Menu":
               CMP_Menu.initialize(comp_div);
          break;
          case "Slideshow":
               CMP_Slideshow.initialize(comp_div);
          break;
          case "Chat":
               CMP_Chat.initialize(comp_div);
          break;
          case "Videoplayer":
               CMP_Videoplayer.initialize(comp_div);
          break;
          case "Quizer":
               CMP_Quizer.initialize(comp_div);
          break;
          case "Quizer Editor":
               CMP_Quizer_Editor.initialize(comp_div);
          break;
          default:
               CMP_Menu.initialize(comp_div);
          break;
     };
};


return f;}());