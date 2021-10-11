const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db');
const colors = require('colors')
const morgan = require('morgan')
var cors = require('cors')

const errorHandler = require('./middleware/error');

dotenv.config({ path: './config/config.env' })
const app = express()

app.use(express.json());

app.use(cors({ origin: ["http://localhost:8080"], credentials: true }));

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

//Connect to DB
connectDB();

//Route files
const users = require('./routes/users')
const auth = require('./routes/auth')
const appointments = require('./routes/appointments')

//Mount files
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);
app.use('/api/v1/appointments', appointments);

app.use(errorHandler);

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
    console.log(`Success app listening at http://localhost:${PORT}`.green.bold)
})

process.on('unhandledRejection', (reason, promise) => {
    console.log('Connection Error Reason:'.red.bold, reason.message);
    server.close(() => {
        process.exit(true);
    })
});