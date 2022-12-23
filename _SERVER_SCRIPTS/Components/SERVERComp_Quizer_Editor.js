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
async function input(input_data)
{
  var raw_data = JSON.parse(input_data);
  //raw data is still on stringfied JSON
  var input_data_json = JSON.parse(raw_data.input);


  switch(input_data_json.action)
  {
    case "create":
      return await actionCreate(input_data);
    break;

    case "delete":
      return await actionDelete(input_data);
    break;

    case "edit":
      return await actionEdit(input_data);
    break;

    case "result":
      return await actionResult(input_data);
    break;

    default:
      var result_json = 
      {
        success:false,
        message:"Quiz Activation Failed!"
      };
      return JSON.stringify(result_json);
    break;
  }


} 


async function actionCreate(input_data)
{
  var result_json = 
  {
    success:false,
    message:"Quiz Activation Failed!"
  };

  var raw_data = JSON.parse(input_data);
  //raw data is still on stringfied JSON
  var input_data_json = JSON.parse(raw_data.input);
  var check_exist = await checkFileExist(input_data_json.room);
  var checkD_exist = await checkDirectoryExist(input_data_json.room);

  if(check_exist == true || checkD_exist == true)
  {
      result_json.success = false;
      result_json.message = "Quiz Room is currently in used. Use delete instead!"
      return JSON.stringify(result_json);
  }
  else if(check_exist == false && checkD_exist == false)
  {
    var creation_success = await createRoom(input_data_json,input_data_json.room);
    var creationD_success = await createRoomDirectory(input_data_json.room);
  }; 

  if(creation_success == true && creationD_success == true)
  {
    result_json.success = true;
    result_json.message = "Quiz Room was succesfully created!"
    return JSON.stringify(result_json);
  }
  else if(creation_success == false ||  creationD_success == false)
  {
    result_json.success = false;
    result_json.message = "Quiz Room creation failed!"
    return JSON.stringify(result_json);
  }

};

async function actionDelete(input_data)
{
  var result_json = 
  {
    success:false,
    message:"Quiz Activation Failed!"
  };

  var raw_data = JSON.parse(input_data);
  //raw data is still on stringfied JSON
  var input_data_json = JSON.parse(raw_data.input);
  var check_exist = await checkFileExist(input_data_json.room);
  var checkD_exist = await checkDirectoryExist(input_data_json.room);

  if(check_exist == true)
  {
    var delete_success = await deleteRoom(input_data_json.room);
  }

  if(checkD_exist == true)
  {
    var deleteD_success = await deleteRoomDirectory(input_data_json.room);
  }

  if(check_exist == false && checkD_exist == false)
  {
    result_json.success = false;
    result_json.message = "Quiz Room does not exist. Use create instead!"
    return JSON.stringify(result_json);
  }; 

  if(delete_success == true || deleteD_success == true)
  {
    result_json.success = true;
    result_json.message = "Quiz Room was succesfully deleted!"
    return JSON.stringify(result_json);
  }
  else if(delete_success == false ||  deleteD_success == false)
  {
    result_json.success = false;
    result_json.message = "Quiz Room deletion failed!"
    return JSON.stringify(result_json);
  }


}


async function actionEdit(input_data)
{
  var result_json = 
  {
    success:false,
    message:"Quiz Activation Failed!"
  };

  var raw_data = JSON.parse(input_data);
  //raw data is still on stringfied JSON
  var input_data_json = JSON.parse(raw_data.input);
  var check_exist = await checkFileExist(input_data_json.room);

  if(check_exist == true)
  {
    var creation_success = await createRoom(input_data_json,input_data_json.room);
  }
  else if(check_exist == false)
  {
      result_json.success = false;
      result_json.message = "Quiz Room does not exist"
      return JSON.stringify(result_json);
  }; 

  if(creation_success == true)
  {
    result_json.success = true;
    result_json.message = "Quiz Room was succesfully edited!"
    return JSON.stringify(result_json);
  }
  else if(creation_success == false)
  {
    result_json.success = false;
    result_json.message = "Quiz Room edit failed!"
    return JSON.stringify(result_json);
  }

};

async function actionResult(input_data)
{
  var result_json = 
  {
    success:false,
    message:"Quiz Activation Failed!"
  };

  var raw_data = JSON.parse(input_data);
  //raw data is still on stringfied JSON
  var input_data_json = JSON.parse(raw_data.input);
  var check_exist = await checkFileExist(input_data_json.room);
  var checkD_exist = await checkDirectoryExist(input_data_json.room);

  if(check_exist == true && checkD_exist == true)
  {
    var the_list = await getAnswerList(input_data_json);

    console.log("THE LIST >> " + the_list + " <<");

    var new_input =
    {
      room:input_data_json.room,
      action:input_data_json.action,
      correct:input_data_json.correct,
      list:the_list
    }

    var creation_success = await createRoom(new_input,input_data_json.room);

    result_json.success = creation_success;
    result_json.message = "Quiz Room result showed succesfully"
    return JSON.stringify(result_json);
  }
  else if(check_exist == false || checkD_exist == false)
  {
    result_json.success = false;
    result_json.message = "Quiz Room does not exist. No result retrieved!"
    return JSON.stringify(result_json);
  }; 


};


//===========================================================================================//

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

function createRoom(input_data_json,room_name)
{
  return new Promise(function (resolve,reject)
  {
    try
    {
      fs.writeFile(`${db_configs_path}${room_name}.txt`,JSON.stringify(input_data_json),(err) =>
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

function createRoomDirectory(room_name)
{
  return new Promise(function (resolve,reject)
  {
    try
    {
      fs.mkdir(`${db_answers_path}${room_name}`,(err) =>
      {
          if(err){throw err};
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

function deleteRoom(room_name)
{
  return new Promise(function (resolve,reject)
  {
    try
    {
      fs.unlink(`${db_configs_path}${room_name}.txt`, (err) => 
      {
        if(err){ return; };
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

function deleteRoomDirectory(room_name)
{
  return new Promise(function (resolve,reject)
  {
    try
    {
      fs.rmdir(`${db_answers_path}${room_name}`, (err) => 
      {
        if(err){ return; };
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

async function getAnswerList(input_data)
{
  return new Promise(function (resolve,reject)
  {
    var the_list = [];
    var the_answer = "";
    var the_answer_json = {};

    try
    {
      fs.readdir(`${db_answers_path}${input_data.room}`,async function(err,files)
      {
        if(err)throw err;

        for(var file of files)
        {
          the_answer = await readAnswer(input_data.room,file);
          the_answer_json = JSON.parse(the_answer);

          if(input_data.correct !== null)
          {
            the_answer_json.status = answerChecker(input_data.correct, the_answer_json.answer);
          }

          the_list.push(JSON.stringify(the_answer_json));
        }

        resolve(the_list);
    
      });
    }
    catch(e)
    {
      console.log(e);
      reject([]);
    }
    
  });

}


//===================================================================================//

function readAnswer(room_name,filename)
{
  return new Promise(function (resolve,reject)
  {
    try
    {
      fs.readFile(`${db_answers_path}${room_name}/${filename}`,'utf8', function(err,data)
      {
        if(err)throw err;

          resolve(data);
       
      });
    }
    catch(e)
    {
      reject(JSON.stringify({username:"",answer:""}));
    }
    
  });
};

function answerChecker(answerkey,answer)
{
  answerkey = answerkey.toString().toLowerCase().trim().replace(/\s/g,"");
  answer = answer.toString().toLowerCase().trim().replace(/\s/g,"");

  if(answer == answerkey)
  {
    return "CORRECT";
  }
  else
  {
    return "WRONG";
  };
}

//===================================================================================//

module.exports = 
{
    input:input
};
