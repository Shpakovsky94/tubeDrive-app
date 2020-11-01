let express = require('express');
let router = express.Router();
let Promise = require('bluebird');
let readFile = Promise.promisify(require("fs").readFile);
let lodash = require('lodash');

const USER_HEADERS = require('../services/constants').USER_HEADERS;
const USER_DB_PATH = require('../services/constants').USER_DB_PATH;

//MOVE to CONST files
const usersFile = 'users.json';
const limitPerRequest = 20;

/* POST search users. */
router.post('/', function(req, res, next) {
  // map the values to be regex
  let query = req.body.query && lodash.mapValues(req.body.query, (v) => { return new RegExp(v, 'i') });
  //read users json imported
  readFile(USER_DB_PATH, 'utf8')
  .then((users) => {
    //parse json string
    users = JSON.parse(users);
    //if not query return first limit
    if(!query) return res.json(users.slice(0, limitPerRequest));
    //filter keys
    let keys = lodash.filter(USER_HEADERS, (k) => { return query[k]; });
    //filter users
    let result = lodash.chain(users)
    .filter((user) => {
      return lodash.every(keys, (key) => {
        return query[key].test(user[key]);
      });
    })
    .slice(0, limitPerRequest)
    .value();

    return res.json({"results": result});
  },(err) => {
    return res.status(500).jsonp({ error: err });
  });
});

module.exports = router;