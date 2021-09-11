const sqlite3 = require('sqlite3').verbose();
const restify = require('restify');
const config = require('./config.json');
const corsMiddleware = require('restify-cors-middleware')

// initialization

const db = new sqlite3.Database(
	config.dbPath,
	sqlite3.OPEN_READWRITE,
	(err) => {
		if (err) {
			console.error(err.message);
		} else {
			console.log('Connected to database.');
		}
	}
);

const server = restify.createServer();
const cors = corsMiddleware({
	origins: ['http://localhost:3000']
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.queryParser());


// request handlers

const getCasesReportV1 = (req, res, next) => {

	const { timeFilter, regionFilter } = req.query;

	let stmt = `SELECT * FROM state_cases`;

	if (timeFilter || regionFilter) {
		stmt += ' WHERE';
		if (timeFilter) {
			stmt += ` date >= "${timeFilter}"`;
			if (regionFilter) {
				stmt += ` AND fips = "${regionFilter}"`
			}
		} else {
			stmt += ` fips = "${regionFilter}"`
		}
	}

	stmt += ` ORDER BY date ASC;`;

	console.log(stmt);

	db.all(stmt, [], (err, rows) => {
		if (err) {
			next(err);
		} else {
			res.send({
				result: rows
			});
			next();
		}
	});

}

const getCasesReport = (req, res, next) => {

	const { timeFilter, regionFilter } = req.query;

	let stmt;
	if (regionFilter && !/all/.test(regionFilter)) {
		stmt = `SELECT cases, deaths, date FROM state_cases WHERE fips = "${regionFilter}"`;
		if (timeFilter) {
			stmt += ` AND date >= "${timeFilter}"`;
		}
	} else {
		stmt = 'SELECT cases, deaths, date FROM us_cases';
		if (timeFilter) {
			stmt += ` WHERE date >= "${timeFilter}"`;
		}
	}

	stmt += ` ORDER BY date ASC;`;

	console.log(stmt);

	db.all(stmt, [], (err, rows) => {
		if (err) {
			next(err);
		} else {
			res.send({
				result: rows
			});
			next();
		}
	});

}

const getStates = (req, res, next) => {
	const stmt = `
		SELECT "state", "fips" FROM state_cases GROUP BY "fips" ORDER BY "fips"
	`;
	db.all(stmt, [], (err, rows) => {
		if (err) {
			next(err);
		} else {
			res.send({
				result: rows
			});
			next();
		}
	});
};

const getDetailForADay = (req, res, next) => {
	const stmt = `
		SELECT "state", "cases", "deaths" from state_cases WHERE date = "${req.params.date}"
			UNION
		SELECT NULL AS "state", "cases", "deaths" from us_cases WHERE date = "${req.params.date}"
		ORDER BY "state";
	`;
	console.log(stmt);

	db.all(stmt, [], (err, rows) => {
		if (err) {
			next(err);
		} else {
			res.send({
				result: rows
			});
			next();
		}
	});
}

// wiring

server.get('/api/report', getCasesReport);
server.get('/api/states', getStates);
server.get('/api/detail/:date', getDetailForADay);

// startup

server.listen(config.port, function () {
	console.log('%s listening at %s', server.name, server.url);
});

// cleanup

server.on('close', () => {
	db.close();
});
