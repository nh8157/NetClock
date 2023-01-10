const { handleAddAlarm, handleRmvAlarm, handleGetAlarm, handleUpdateAlarm } = require('./controllers/alarm');
const express = require('express');
const { verify } = require('./middleware/auth');
const userRouter = require('./routes/user');
const alarmRouter = require('./routes/alarm');

// connect to database
require('./database/database').connectDB().catch(err => { console.log(err); process.exit(1); }).then(_ => console.log("App connected to database"));

const app = express();
const port = 3000;
app.use(express.json());

// since every operation requires user's verification
// use a router-level middleware for every request in this router instance
app.use('/alarm', verify, alarmRouter);
app.use('/user', userRouter);

app.listen(port, () => {
	console.log(`App is listening on port ${port}`)
});
