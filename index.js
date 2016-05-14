var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

require('http').createServer(function(req, res) {

	var input = req.url.slice(1);

	if (input) res.end( JSON.stringify( getJson(input) ));

	else getHtml(res);

}).listen(process.env.PORT || 8080);

function getJson(input) {

	var date, num = Number(input);

	if (num == input) date = new Date(num * 1000);

	else date = new Date(decodeURI(input));
	
	if (date == 'Invalid Date') return {unix: null, natural: null};

	return {
		unix: Math.round(date.getTime() / 1000),
		natural: month[date.getUTCMonth()] + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear()
	};
}

function getHtml(res) {
	require('fs').readFile('public/timestamp.html', function(err, data) {
		if (err) throw err;
		res.end(data);
	});
}
