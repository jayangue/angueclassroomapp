const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server,{});
const PORT = 8080;

//Import Server Scripts
const SERVER_LoginSignin = require('./_SERVER_SCRIPTS/Main/SERVER_LoginSignin.js');
const SERVERComp_Chat = require('./_SERVER_SCRIPTS/Components/SERVERComp_Chat.js');
const SERVERComp_Quizer_Editor = require('./_SERVER_SCRIPTS/Components/SERVERComp_Quizer_Editor.js');
const SERVERComp_Quizer = require('./_SERVER_SCRIPTS/Components/SERVERComp_Quizer.js');

//=================================================================================================================//

//APP
app.use('/',express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

//Log-in Account
app.post('/login',async(req,res) => 
{
	console.log(`POST => /login => ${JSON.stringify(req.body)}`);
	var result_json = await SERVER_LoginSignin.login(JSON.stringify(req.body));
	res.send(result_json);
	console.log(`${JSON.stringify(req.body)} => ${JSON.stringify(result_json)}`);
});

//Sign-in Account
app.post('/signin',async(req,res) => 
{
	console.log(`POST => /signin => ${JSON.stringify(req.body)}`);
	var result_json = await SERVER_LoginSignin.signin(JSON.stringify(req.body));
	res.send(result_json);
	console.log(`${JSON.stringify(req.body)} => ${JSON.stringify(result_json)}`);
});

//Quizer Editor Input
app.post('/quizer_editor_input',async(req,res) => 
{
	console.log(`POST => /quizer_editor_input => ${JSON.stringify(req.body)}`);
	var result_json = await SERVERComp_Quizer_Editor.input(JSON.stringify(req.body));
	console.log(result_json);
	res.send(result_json);
});

//Quizer Render
app.post('/quizer_render',async(req,res) => 
{
	var result_json = await SERVERComp_Quizer.render(JSON.stringify(req.body));
	res.send(result_json);
});

//Quizer Answer
app.post('/quizer_answer',async(req,res) => 
{
	var result_json = await SERVERComp_Quizer.answer(JSON.stringify(req.body));
	res.send(result_json);
});

//ALWAYS AT THE END OF APP
app.use('/',express.static(__dirname + '/'));
server.listen(PORT,function(){console.log(`Listening on ${ PORT }`)});

//SOCKET
io.sockets.on('connection',function(socket){
	
	//USER CONNECT
	console.log('A socket has connected to the server');
	
	//USER SEND
	socket.on('SERVERComp_Chat',function(data)
	{
		socket.emit('SERVERComp_Chat',SERVERComp_Chat.start(data));
	});
	
	//USER DISCONNECT
	socket.on('disconnect',function(){
		console.log("A user has disconnected to the server");
	});
	
	setInterval(function(){socket.emit('SERVERComp_Chat',SERVERComp_Chat.getCollection());},1000);
	
});

