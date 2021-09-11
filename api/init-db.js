const sqlite3 = require('sqlite3').verbose();
const config = require('./config.json');
const fs = require('fs');

const db = new sqlite3.Database(
	config.dbPath,
	sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
	(err) => {
		if (err) {
			console.error(err.message);
		} else {
			console.log('Connected to database.');
		}
	}
);

const CREATE_STATES_CASES_TABLE_STMT = `
	CREATE TABLE state_cases ("date" DATE, state TEXT, fips NUMBER, cases NUMBER, deaths NUMBER)
`;

const CREATE_US_TABLE_STMT = `
	CREATE TABLE us_cases ("date" DATE, "cases" NUMBER, "deaths" NUMBER)
`;

const usCSVFileContent = fs.readFileSync('us.csv');

const usCases = usCSVFileContent.toString().split('\n').slice(1).map(s => {
	const data = s.split(',');
	return {
		date: data[0],
		cases: +data[1],
		deaths: +data[2]
	}
});

const statesCSVFileContent = fs.readFileSync('us-states.csv');

const statesCases = statesCSVFileContent.toString().split('\n').slice(1).map(s => {
	const data = s.split(',');
	return {
		date: data[0],
		state: data[1],
		fips: +data[2],
		cases: +data[3],
		deaths: +data[4]
	}
});

db.serialize(() => {

	db
		.run('DROP TABLE IF EXISTS state_cases')
		.run('DROP TABLE IF EXISTS us_cases')
		.run(CREATE_STATES_CASES_TABLE_STMT)
		.run(CREATE_US_TABLE_STMT);

	db.run('begin transaction');
	usCases.forEach(c => {
		const params = [
			c.date,
			c.cases,
			c.deaths
		];
		db.run('INSERT INTO "us_cases" (date, cases, deaths) VALUES (?,?,?)', params)
	});
	db.run('commit');

	db.run('begin transaction');
	statesCases.forEach(c => {
		const params = [
			c.date,
			c.state,
			c.fips,
			c.cases,
			c.deaths
		];
		db.run('INSERT INTO "state_cases" (date, state, fips, cases, deaths) VALUES (?,?,?,?,?)', params)
	});
	db.run('commit');

});

db.close();
