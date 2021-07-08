const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const chalk = require('chalk');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const methodOverride = require('method-override');
const mongoose = require('mongoose');



const app = express()
const db = require('./db/connection');
const PORT = 5000;

app.use(cors({
    credentials: true,
}));

const morganMiddleware = morgan(function (tokens, req, res) {

	const today = new Date(tokens.date(req, res));
	const h = today.getHours();
	const m = today.getMinutes();
	const s = today.getSeconds();
	// const hourLog = h + ":" + m + ":" + s;
	const hourLog =`${h < 10 ? `0${h}` : `${h}`}:${m < 10 ? `0${m}` : `${m}`}:${s < 10 ? `0${s}` : `${s}`}`;

    return [
        // '\n\n\n',
        '\x1b[36m-------------------------------------------------------------------\x1b[0m\n',
        chalk.hex('#ff4757').bold(''),
        chalk.hex('#34ace0').bold(tokens.method(req, res)),
        chalk.hex('#ffb142').bold(tokens.status(req, res)),
        chalk.hex('#ff5252').bold(tokens.url(req, res)),
        chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
        chalk.hex('#f78fb3').bold(hourLog + ' hrs'),
        // chalk.hex('#f78fb3').bold('@ ' + tokens.date(req, res)),
        // chalk.yellow(tokens['remote-addr'](req, res)),
        // chalk.hex('#fffa65').bold('from ' + tokens.referrer(req, res)),
        // chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
        // '\n\n\n',
    ].join(' ');
});

app.use(morganMiddleware);

app.use(helmet());
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use(require('./routes/index'))

app.listen(PORT , () => 
	console.info(
		`==> 😎 Listening on port ${PORT}.
			Open http://0.0.0.0:${PORT}/api in your browser.`
	)

);

// app.listen('5000')
// console.log('uri: http://localhost:5000/');