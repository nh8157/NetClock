const { connectDB, createModel } = require('./database/database');
const { handleAddAlarm, handleRmvAlarm, handleGetAlarm, handleUpdateAlarm } = require('./controllers/controllers');
const express = require('express');
const router = require('./routes/index');
const auth = require('./middleware/auth');

connectDB().catch(err => { console.log(err); process.exit(1); }).then(_ => console.log("App connected to database"));
const Alarm = createModel();
const app = express();
const port = 3000;

app.use(express.json());

app.post('/add-alarm/:year/:month/:day/:hour/:minute/', (req, res) => {
	handleAddAlarm(Alarm, req, res);
});

app.post('/rmv-alarm/:objectId/', (req, res) => {
	handleRmvAlarm(Alarm, req, res);
});

// using token as part of the argument
app.post('/test-token', auth, (req, res) => {
	res.send("Token valid");
})

// Query is passed in as part of the URL
app.get('/get-alarm/', (req, res) => {
	handleGetAlarm(Alarm, req, res);
})

app.post('/update-alarm/:objectId/', (req, res) => {
	handleUpdateAlarm(Alarm, req, res);
});

app.use('/api', router);

app.listen(port, () => {
	console.log(`App is listening on port ${port}`)
});
