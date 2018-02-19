var express = require('express');
var router = express.Router();


// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   database : 'sakila'
// });
/* GET home page. */
router.get('/', function(req, res, next) {


    // connection.query('SELECT * FROM actor LIMIT 5', function (error, results, fields) {
    //   if (error) {
    //       throw error;
    //   } else {
    //       console.log(results)

    //   }
    // });

    res.render('index', {
              object: "TRUE"
          });

});

module.exports = router;
