var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var GphApiClient = require('giphy-js-sdk-core')

client = GphApiClient("9EH82AgMMKO7fPL629VK2bsDa2OUvQcQ");

const port = process.env.PORT || 8080;


app.use(express.static('./'));

// app.get('/', function(req, res){
// 	// serve this html file
// 	res.sendFile(__dirname + '/index.html');
// });

// app.get('/style.css', function(req, res){
// 	// serve this html file
// 	res.sendFile(__dirname + '/style.css');
// });

// app.get('/func.js', function(req, res){
// 	// serve this js file
// 	res.sendFile(__dirname + '/func.js');
// });



io.on('connection', function(socket) {

	socket.on('search', function(search) {

		/// Gif Search
		client
			.search('gifs', {"q": search})
			.then((response) => {
				response.data.forEach((gifObject) => {
					io.emit('results', gifObject);
			  		// console.log(gifObject)
				})
			})
			.catch((err) => {
				console.log(err);
			})
	});

});




/// Sticker Search
client
.search('stickers', {"q": "cats"})
	.then((response) => {
		// console.log(response);
	})
	.catch((err) => {
		console.log(err);
	})


server.listen(port, function(){
	console.log('listening on ' + port);
});