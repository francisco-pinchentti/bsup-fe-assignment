README.md
=========

## Requirements

* NodeJS v14.17.6

## setup summary

1. Clone this repository
2. Run *npm install* on api/
3. Run *npm install* on ui/
4. Run *npm start* on api/
5. Run *npm start* on ui/

### API config and DB

For the sake of simplicity sqlite was used and an already loaded sqlite db is provided but it can be rebuilt using:

```bash
npm run init-db.js
```

This recreates tables and loads us.csv and us-states.csv

API has a few config parameters on config.json

### Notes

For the API the stack selected was node, restify for creating the web server, sqlite to provide a simple database that didn't required much setup but still allowed some complex queries if needed.

For the initial data load, an script is provided that parses the two selected csv files. These were cloned from [https://github.com/nytimes/covid-19-data]

As for the ui project, the stack used was:

* react
* redux and some sagas
* reactstrap for bootstrap components
* vanilla JS
* chartJS to make the chart
