const { connectDB, createModel } = require('./database/database');
const { handleAddAlarm, handleRmvAlarm, handleGetAlarm, handleUpdateAlarm } = require('./controllers/controllers');
const express = require('express');

connectDB().catch(err => { console.log(err) });
const Alarm = createModel();
const app = express();
const port = 3000;

app.post('/add-alarm/:year/:month/:day/:hour/:minute/', (req, res) => {
	handleAddAlarm(Alarm, req, res);
});

app.post('/rmv-alarm/:objectId/', (req, res) => {
	handleRmvAlarm(Alarm, req, res);
});

// Query is passed in as part of the URL
app.get('/get-alarm/', (req, res) => {
	handleGetAlarm(Alarm, req, res);
})

app.post('/update-alarm/:objectId/', (req, res) => {
	handleUpdateAlarm(Alarm, req, res);
});

app.listen(port, () => {
	console.log(`App is listening on port ${port}`)
});
