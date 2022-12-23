var SYS_Utils = (function(){var f = {};

f.copyArray = function(target_array)
{
    //THIS FUNCTION DOES NOT MUTATE/AFFECT THE TARGET ARRAY
    //AND CREATE A NEW INSTANCE OF NEW ARRAY
    var new_array = [];
    
    new_array = target_array.map(function(target_data){
       if(typeof(target_data) !== 'object'){
           return target_data;
       }else if(typeof(target_data) === 'object'){
           var new_target_array = [];
           try{ new_target_array = f.copy_array(target_data);  }catch(e){return target_data;};
           return new_target_array;
       };
        
    });
       
    return new_array;
};

f.copyObject = function(target_object)
{
    if(typeof(target_object) === "string")
    {
        //In case the target object used JSON.stringify
        return JSON.parse(target_object);
    }
    else 
    {
        return JSON.parse(JSON.stringify(target_object));
    }
};

f.combineArray = function(target,value){
    var new_array = [];
    target.map(function(target){new_array.push(target); });
    value.map(function(target){new_array.push(target); });
    return new_array;
};

f.removeDataFromArray = function(target,array){
    var newarray = [];
    var i = 0;
    for(;i < array.length;i++){
        if(array[i] !== target){newarray.push(array[i]);};
    };
    return newarray;
};
f.removeDataFromArray_UsingID = function(id,array){
    var newarray = [];
    var i = 0;
    for(;i < array.length;i++){
        if(i !== id){newarray.push(array[i]);};
    };
    return newarray;
};

f.combineText = function(textarray){
    var combinetext = "";
    var i = 0;
    for(; i < textarray.length; i++){
        combinetext = combinetext.concat(textarray[i]);
    };
    return combinetext;
};

f.concatList = function(array,mode,seperator){
    var concat_txt = "";
    var i = 0;
    for(;i < array.length;i++){
        switch(mode){
            case "seperate":
                concat_txt = concat_txt.concat(array[i] + seperator);
            break;
            case "normal":
                concat_txt = concat_txt.concat(array[i]);
            break;
            default:
                concat_txt = concat_txt.concat(array[i]);
            break;
        };
        
    };
    return concat_txt;
};
f.rng = function(min,max){
        var max2 = max + 1;
        var rng_value = Math.floor(Math.random() * Math.floor(max2));
        if(rng_value < min){rng_value = min;};
        return rng_value;
};

f.numberToString = function(value){
    if(value >= 0){
        var txt1 = value.toString();
        var txt2 = "+";
        var txt3 = txt2.concat(txt1);
        return txt3;
    }else if(value < 0){
        var txt4 = value.toString();
        return txt4;
    };
};

f.idGenerator = function(id_length){
        var all_characters = ["0","1","2","3","4","5","6","7","8","9","Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"];
        var full_id = "";
        var randnumber = 0;
        while(id_length > 0){
           id_length--;
           randnumber = f.rng(1,all_characters.length);
           full_id = full_id.concat(all_characters[randnumber-1]);
        };
        return full_id;
    };
    
f.generateNumber = function(raw_number){
            
        var thenumber_string = "EMPTY";
        var thenumber = raw_number.toString();
    
        if(raw_number < 10){
            thenumber_string = "000" + thenumber;
        }else if(raw_number >= 10 &&  raw_number <= 99 ){
            thenumber_string = "00" + thenumber;
        }else if(raw_number >= 100 &&  raw_number <= 999 ){
            thenumber_string = "0" + thenumber;
        }else if(raw_number >= 1000 ){
            thenumber_string = thenumber;
        };
            
        return thenumber_string;
           
};

f.generateNumberByTen = function(raw_number){
            
    var thenumber_string = "EMPTY";
    var thenumber = raw_number.toString();

    if(raw_number < 10){
        thenumber_string = "0" + thenumber;
    }else if(raw_number >= 10 ){
        thenumber_string = thenumber;
    };
        
    return thenumber_string;
       
};

f.getDate = function(){
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2,'0');
    var mm = String(today.getMonth() + 1).padStart(2,'0');
    var yyyy = today.getFullYear();
        
    var file_date = [mm,dd,yyyy];
    
    return file_date;
};
   
return f;}());