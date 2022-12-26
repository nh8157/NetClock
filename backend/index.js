const { connectDB, createModel } = require('./database/database');
const express = require('express');

connectDB().catch(err => { console.log(err) });
const Alarm = createModel();
const app = express();
const port = 3000;

app.post('/add-alarm/:year/:month/:day/:hour/:minute', (req, res) => {
	const alarm = new Alarm(
		{
			year: req.params.year,
			month: req.params.month,
			day: req.params.day,
			hour: req.params.hour,
			minute: req.params.minute,
			status: false
		});
	alarm.save();
	res.send({ status: true });
});

app.post('rmv-alarm/:alarm-id', (req, res) => {

});

app.get('/get-alarm', (req, res) => {

})

app.post('/update-alarm', (req, res) => {

});

app.listen(port, () => {
	console.log(`App is listening on port ${port}`)
});
