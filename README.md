README.md
=========

## setup summary

1. Clone this repository
2. Run npm i on api/
3. Run npm i on ui/
4. Run npm start on api/
5. Run npm start on ui/

### API config and DB

For the sake of simplicity sqlite was used and an already loaded sqlite db is provided but it can be rebuilt using:

```bash
npm run init-db.js
```

This recreates tables and loads us.csv and us-states.csv

API has a few config parameters on config.json

### UI

Stack used was:

* react
* redux and some sagas
* reactstrap for bootstrap components
* vanilla JS
