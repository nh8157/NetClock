const { handleAddAlarm, handleRmvAlarm, handleGetAlarm, handleUpdateAlarm } = require('./controllers/alarm');
const express = require('express');
const router = require('./routes/index');
const verify = require('./middleware/auth');

// connect to database
require('./database/database').connectDB().catch(err => { console.log(err); process.exit(1); }).then(_ => console.log("App connected to database"));

const app = express();
const port = 3000;

app.use(express.json());

app.post('/add-alarm', (req, res) => {
	handleAddAlarm(req, res);
});

app.post('/rmv-alarm', (req, res) => {
	handleRmvAlarm(req, res);
});

// using token as part of the argument
app.post('/test-token', verify, (req, res) => {
	res.send("Token valid");
})

// Query is passed in as part of the URL
app.get('/get-alarm', (req, res) => {
	handleGetAlarm(req, res);
})

app.post('/update-alarm/:objectId', (req, res) => {
	handleUpdateAlarm(req, res);
});

app.use('/api', router);

app.listen(port, () => {
	console.log(`App is listening on port ${port}`)
});
