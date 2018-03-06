var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var nodemailer = require('nodemailer');

var app = express();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'alexdb',
  port     : '3306'
});
  console.log('MySQL Connected');
/* GET home page. */
router.get('/', function(req, res, next) {

    connection.query('SELECT * FROM user ORDER BY u_id desc LIMIT 10', function (error, result, fields) {
      if (error) {
          throw error;
      } else {
          console.log('MySQL INDEX Query result: ',result)

              res.render('index', {
                        object: result
                    });
      }
    });
console.log('INDEX query finished. closing..')

});

router.get('/window', function(req, res, next) {

    connection.query('SELECT AVG(u_rating) as avgWindow FROM user WHERE u_service= "Window Cleaning"', function (error, result, fields) {
      if (error) {
          throw error;
      } else {
          console.log('MySQL WINDOW Query result: ',result)



              res.render('window', {
                        object: result
                    });



      }
    });
  });
router.get('/gutter', function(req, res, next) {


    connection.query('SELECT AVG(u_rating) as avgGutter FROM user WHERE u_service= "Gutter Cleaning"', function (error, result, fields) {
      if (error) {
          throw error;
      } else {
          console.log('MySQL TESTIMONIAL Query result: ',result)



              res.render('gutter', {
                        object: result
                    });



      }
    });
  });
router.get('/fascia', function(req, res, next) {


    connection.query('SELECT AVG(u_rating) as avgFascia FROM user WHERE u_service= "Fascia Cleaning"', function (error, result, fields) {
      if (error) {
          throw error;
      } else {
          console.log('MySQL TESTIMONIAL Query result: ',result)



              res.render('fascia', {
                        object: result
                    });



      }
    });
  });
router.get('/pressure', function(req, res, next) {


    connection.query('SELECT AVG(u_rating) as avgPressure FROM user WHERE u_service= "Pressure Cleaning"', function (error, result, fields) {
      if (error) {
          throw error;
      } else {
          console.log('MySQL TESTIMONIAL Query result: ',result)



              res.render('pressure', {
                        object: result
                    });



      }
    });
  });
router.get('/testimonials', function(req, res, next) {

  connection.query('SELECT * FROM user', function (error, result, fields) {
    if (error) {
        throw error;
    } else {
        console.log('MySQL TESTIMONIAL Query result: ',result)



            res.render('testimonials', {
                      object: result
                  });



    }
  });
});
router.get('/charity', function(req, res, next) {

  res.render('charity', {
});

});
router.get('/contact', function(req, res, next) {



  res.render('contact', {
});

router.post('/send',(req, res) => {
    console.log(req.body);

    /* EMAIL SYSTEM */
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'summitqueryform@gmail.com',
        pass: 'summittest123'
      }
    });

    var mailOptions = {
    from: 'summitqueryform@gmail.com',
    to: 'nivedasteam@gmail.com',/*<----------- ALEX'S EMAIL */
    subject:'Subject: ' +req.body.title,
    text: 'Hello ! an username "'+req.body.username +'" has left a feedback on your website saying: "'+req.body.myfield +'" Contact user with email: '+req.body.email
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('-----EMAIL SENT------' + info.response);
      res.redirect('/submissionForm');
    }
    });

});
router.post('/sendtestimonial',(req, res) => {
    console.log(req.body);

    var post = {
      u_name: req.body.testiusername,
      u_rating: req.body.rating,
      u_comment: req.body.myfield,
      u_service: req.body.service
    };

    connection.query('INSERT INTO user SET ?', post, function (error, result) {
      if (error) {
          throw error;
          res.redirect('/contact')
      } else {
          console.log('-----TESTIMONIAL SENT------'+ post);
            res.redirect('/submissionForm');
      }

    });


    });

});
router.get('/submissionForm', function(req, res, next) {

  res.render('submissionForm', {
});

});

module.exports = router;
