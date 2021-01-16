var express = require('express');
var app = express();

const PORT = 5000;

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});

app.get('/', function (req, res) {
    res.send('GET');
});

app.post('/', function (req, res) {
    res.send('POST');
});
