const fs = require('fs');
const db_path  = "./_TEXT_DATABASE/DATABASE_User/";

//===================================================================================//

async function login(login_data)
{
  var result_json = 
  {
    success:false,
    message:"Log-In Failed!"
  };

  var login_data_json = JSON.parse(login_data);
  var check_exist = await checkFileExist(login_data_json.username);

  if(check_exist == true)
  {
    var login_valid = await loginRun(login_data_json);
    
    if(login_valid == true)
    {
      result_json.success = true;
      result_json.message = "Log-in Succesful!"
      return JSON.stringify(result_json);
    }
    else if(login_valid == false)
    {
      result_json.success = false;
      result_json.message = "Username/Password Incorrect!"
      return JSON.stringify(result_json);
    };    
  }
  else if(check_exist == false){
    result_json.success = false;
    result_json.message = "Account Doesn't Exist!"
    return JSON.stringify(result_json);
  }; 
}

async function signin(signin_data)
{
  var result_json = 
  {
    success:false,
    message:"Sign-In Failed!"
  };

  var signin_data_json = JSON.parse(signin_data);
  var check_exist = await checkFileExist(signin_data_json.username);
  var user_data = { main:signin_data_json };

  if(check_exist == false)
  {
    var signin_valid = await signinRun(signin_data_json,user_data);

    if(signin_valid == true)
    {
      result_json.success = true;
      result_json.message = "Sign-in Succesful!"
      return JSON.stringify(result_json);
    }
    else if(signin_valid == false)
    {
      result_json.success = false;
      result_json.message = "Sign-in Failed!"
      return JSON.stringify(result_json);
    };    
  }
  else
  {
    result_json.success = false;
    result_json.message = "Account already exist!";
    return JSON.stringify(result_json);
  }
}

//============================================================================================//

function loginRun(login_data_json)
{
  return new Promise(function(resolve,reject)
  {
    try
    { 
      fs.readFile(`${db_path}${login_data_json.username}.txt`,'utf8',(err,data) =>
      {
          if(err)throw err;
          var content = JSON.parse(data);
          var login_valid = checkLoginValid(login_data_json,content);
          console.log("valid " + login_valid);
          if(login_valid == true)
          {
            resolve(true);
          }
          else
          {
            resolve(false);
          }
      });
    }
    catch(e)
    {
      console.log("loginRun ERROR > " + e);
      reject(false);
    };
  });
};

function signinRun(signin_data_json,user_data)
{
  return new Promise(function(resolve,reject)
  {
    try {
      fs.writeFile(`${db_path}${signin_data_json.username}.txt`,JSON.stringify(user_data),(err) =>
      {
          if(err)throw err;
          resolve(true);
      });
    } 
    catch (e) 
    {
      console.log("signinRun ERROR > " + e);
      reject(false);
    }
  });
};

//===========================================================================================//

function checkFileExist(username)
{
  return new Promise(function (resolve,reject)
  {
    try
    {
      fs.stat(`${db_path}${username}.txt`, function(err,stats)
      {
        if(err == null)
        {
          resolve(true);
           
        }else
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

function checkLoginValid(login_data,content_data)
{
  if(login_data.username == content_data.main.username && login_data.password == content_data.main.password)
  {
    return true;
  }
  else if(login_data.username != content_data.main.username || login_data.password != content_data.main.password)
  {
    return false;
  };
}

//===================================================================================//

module.exports = 
{
    login: login,
    signin: signin
};
