const express = require('express');
const mongoose = require('mongoose')
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('Hello world');
});

app.get('/hel+lo', (_, res) => {
	res.send("At hel+lo handler");
})

app.listen(port, () => {
	console.log(`App is listening on port ${port}`)
});
