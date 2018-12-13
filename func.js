$(document).ready(function() {
	var socket = io();

	// var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=9EH82AgMMKO7fPL629VK2bsDa2OUvQcQ&limit=5");

	// xhr.done(function(data) {
	// 	console.log("success got data", data.data[0].images.fixed_width.webp);
	// 	// console.log(data.data.length);

	// 	for (var i = 0; i < data.data.length; i++) {
	// 		$('#results').append($('<img>').attr('src', data.data[i].images.fixed_width.webp));
	// 	}
	// });

	$('#searchForm').submit(function() {
		$('#resultsTitle').html('Showing results for ' + $('#search').val());

		// remove previous results
		$('#results').children().remove();	
		
		// go to index.js -> socket.on('search')
		socket.emit('search', $('#search').val());

		// clear input
		$('#search').val('');

		return false;
	});

	socket.on('results', function(gifObject) {

		// show results
		$('#results').append($('<img>').attr('src', gifObject.images.fixed_width.webp));
	});
});