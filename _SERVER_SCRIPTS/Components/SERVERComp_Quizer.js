const fs = require('fs');
const db_configs_path  = "./_TEXT_DATABASE/DATABASE_Quizer/Configs/";
const db_answers_path  = "./_TEXT_DATABASE/DATABASE_Quizer/Answers/";

/*
NOTE ! WE WILL CREATE A DIRECTORY FOR EVERY ROOM WHERE
THE USER CAN STORE THEIR ANSWER IN A TEXT SO WE CAN
RETRIEVE IT LATE AND USER CAN CHANGE ANSWER WITHOUT AFFECTING
OTHERS.

NO MORE TIMERS! 

THE ADMIN CAN NOW SEND A POST REQUEST THAT WILL GET THE RESULT
*/

//===================================================================================//
async function render(input_data)
{
  var result_json = 
  {
    success:false,
    content:"",
    message:"Quiz render failed!"
  };

  var input_data_json = JSON.parse(input_data);
  var check_exist = await checkFileExist(input_data_json.room);

  if(check_exist == true)
  {
      var output = await readRoom(input_data_json.room);

      if(output.success == true)
      {
        result_json.success = true;
        result_json.content = output.content;
        result_json.message = "Quiz Room contains Data!"
        return JSON.stringify(result_json);
      }
      else if(output.success == false)
      {
        result_json.success = false;
        result_json.content = "";
        result_json.message = "Quiz Room data retrieval has errors!"
        return JSON.stringify(result_json);
      }        
  }
  else if(check_exist == false)
  {
    result_json.success = false;
    result_json.content = "";
    result_json.message = "Quiz Room is Empty!"
    return JSON.stringify(result_json);
  }

}; 

async function answer(input_data)
{
  var result_json = 
  {
    success:false,
    message:"Quiz render failed!"
  };

  var input_data_json = JSON.parse(input_data);
  var checkD_exist = await checkDirectoryExist(input_data_json.room);

  if(checkD_exist == true)
  {
      var output = await saveAnswer(input_data_json.room,input_data_json.username,input_data_json.answer);

      if(output == true)
      {
        result_json.success = true;
        result_json.message = "Your answer has been saved!"
        return JSON.stringify(result_json);
      }
      else if(output == false)
      {
        result_json.success = false;
        result_json.message = "Answer failed to be saved!"
        return JSON.stringify(result_json);
      }        
  }
  else if(checkD_exist == false)
  {
    result_json.success = false;
    result_json.message = "Quiz Room does not exist!"
    return JSON.stringify(result_json);
  }

}; 

//===================================================================================//

function readRoom(room_name)
{
  return new Promise(function (resolve,reject)
  {
    var result_json = 
    {
      success:false,
      content:"",
    };

    try
    {
      fs.readFile(`${db_configs_path}${room_name}.txt`,'utf8', function(err,data)
      {
        if(err)throw err;
          result_json.success = true;
          result_json.content = data;
          resolve(result_json);
       
      });
    }
    catch(e)
    {
      result_json.success = false;
      reject(result_json);
    }
    
  });
};

function saveAnswer(room_name,username,answer)
{
  return new Promise(function (resolve,reject)
  {
    try
    {
      fs.writeFile(`${db_answers_path}${room_name}/${username}.txt`,JSON.stringify({username:username,answer:answer}),(err) =>
      {
          if(err)throw err;

          resolve(true);
      });
    }
    catch(e)
    {
      console.log(e);
      reject(false);
    }
    
  });

}
//===================================================================================//

function checkFileExist(room_name)
{
  return new Promise(function (resolve,reject)
  {
    try
    {
      fs.stat(`${db_configs_path}${room_name}.txt`, function(err,stats)
      {
        if(err == null)
        {
          resolve(true);
        }
        else
        { 
          resolve(false) 
        };
      });
    }
    catch(e)
    {
      reject(false);
    }
    
  });
};

function checkDirectoryExist(room_name)
{
  return new Promise(function (resolve,reject)
  {
    try
    {
      fs.access(`${db_answers_path}${room_name}`, (err) =>
      {
        if(err)
        {
          resolve(false);
        }
        else
        { 
          resolve(true) 
        };
      });
    }
    catch(e)
    {
      reject(false);
    }
    
  });
};

//===================================================================================//

module.exports = 
{
    render:render,
    answer:answer
};
