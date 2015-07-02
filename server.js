var http = require('http'),
	fs = require('fs');

http.createServer(function (req, res) {
	filename = './homepage.html'
	fs.readFile(filename, 'binary', function(err, file) {
		if (err)
		{
			res.writeHead(500);
			res.write(err + '\n');
			res.end();
			return;
		}
		res.writeHead(200);
		res.write(file, 'binary');
		res.end();
	});

}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');