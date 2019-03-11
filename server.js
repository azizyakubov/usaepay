const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const sha256 = require('sha256');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

// https://help.usaepay.info/developer/rest-api/
var seed = "abcdefghijklmnop";
var apikey = "_06i9jKTk445Xg6ys5g42R0WSd6JvbXn";
var apipin = "1234";
var prehash = apikey + seed + apipin;
var apihash = 's2/'+ seed + '/' + sha256(prehash);
var authKey = new Buffer(apikey + ":" + apihash).toString('base64')
var basicAuth = "Basic " + authKey;


app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html')
});


app.post('/', (req, res) => {
	const usaepayHeader = {
		url: 'https://sandbox.usaepay.com/api/v2/transactions',
		method: 'POST',
		json: true,
		headers: {
			"Authorization": basicAuth
		},
		body: req.body
	}

	request(usaepayHeader, (err, response, body) => {
		if(err) {
			console.log(err);
			res.status(500).json({message: "internal server error"});
		}
		else{
			console.log(body);
			res.status(200).json({
				result: body.result,
				error: body.error || "error"
			});
		}
	});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
