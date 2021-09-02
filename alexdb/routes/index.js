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

router.post('/vote', function(req,res,next) {

  let charityID = req.query.button

  connection.query('UPDATE Charity SET ch_count = ch_count + 1 WHERE ch_id = ?',[charityID], function (error, result, fields) {
    if (error) {
        throw error;
    } else {
        console.log('VOTE ACCEPTED FOR ID: '+charityID)
      }
    });
      res.json({status:'success'})

  });

router.get('/commentApproved', function(req, res, next) {
  console.log(req.query.id)

  if (req.query.secret){
    if (req.query.secret.length == 15){
      connection.query('UPDATE user SET u_post ="true" WHERE u_id ='+req.query.id, function (error, result, fields) {
        if (error) {
          throw error;
        } else {
          console.log('-------feedback inserted----------')
          res.redirect('/submissionForm');
          }
        });
    }
  }
  });

function generateSecret(){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 15; i++)
  text += possible.charAt(Math.floor(Math.random() * possible.length));
return text;
}



  console.log('MySQL Connected');
/* GET home page. */
router.get('/', function(req, res, next) {

    connection.query('SELECT * FROM user WHERE u_post="true" ORDER BY u_id desc LIMIT 10', function (error, result, fields) {
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

    let listSize = req.query.listSize ? req.query.listSize : 15
    console.log("QUERY SIZE:"+listSize)

    let query = connection.query('SELECT * FROM user WHERE u_post ="true" LIMIT ?',[parseInt(listSize)], function (error, result, fields) {
      console.log(query.sql)
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


      connection.query('SELECT * FROM Charity ORDER BY ch_count DESC', function (error, result, fields) {
        if (error) {
            throw error;
        } else {
            console.log('MySQL TESTIMONIAL Query result: ',result)

                res.render('charity', {
                          object: result
                      });

            }
          });
        });

router.get('/contact', function(req, res, next) {



  res.render('contact', {
});
});

router.post('/send',(req, res) => {
    console.log(req.body);

    /* EMAIL SYSTEM */
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'summitqueryform@gmail.com',
        pass: 'alexpassword123'
      }
    });

    var mailOptions = {
    from: 'summitqueryform@gmail.com',
    to: 'nivedasteam@gmail.com',
    subject:'Subject: Email request:' +req.body.title,
    text: 'Hello Alex ! an username "'+req.body.username +'" has left a feedback on your website saying: "'+req.body.myfield +'" Contact user with email: '+req.body.email
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('-----EMAIL SENT------' + info.response)
      res.redirect('/submissionForm')
    }
    });

});


router.post('/sendtestimonial',(req, res) => {
    console.log(req.body);

    var post = {
      u_name: req.body.testiusername,
      u_rating: req.body.rating,
      u_comment: req.body.myfield,
      u_service: req.body.service,
      u_post: 'false'
    };

    connection.query('INSERT INTO user SET ?', post, function (error, result) {
      if (error) {
          throw error;
          res.redirect('/contact')
      } else {
          console.log(post)
          console.log(result)

            var userID = result.insertId

            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'summitqueryform@gmail.com',
                pass: 'alexpassword123'
              }
            });

            var mail = {
              from: 'summitqueryform@gmail.com',
              to: 'alexmylonas@live.com',/*<----------- ALEX'S EMAIL */
              subject:'Subject: Testimonial Request',
              html: 'Hello Alex ! an username <b>"'+post.u_name+'"</b> has left a feedback on your website saying: <b>"'+post.u_comment+'</b> " Rating: <b>'+post.u_rating+'</b> Stars For <b>'+post.u_service+'</b> Service. If you wish to accept it, click on link: '+ 'http://localhost:8080/commentApproved?id='+userID+'&secret='+generateSecret()
            };

            transporter.sendMail(mail,(error, info) => {
              if (error) {
                throw error;
              }
              console.log('message sent..'+info)
              res.redirect('/submissionForm');
            });
            }
          });
        });


router.get('/submissionForm', function(req, res, next) {

  res.render('submissionForm', {
});

});

router.get('/login', function(req, res, next) {

  res.render('login', {
});

  });






router.post('/verify', function(req,res,next) {

      connection.query('SELECT * FROM account', function (error, result, fields) {
        if (error) {
            throw error;
        } else {
            res.render('verify', {
              object: result
            })

        }
        var login = result.acc_username
        var password = result.acc_password

        var checkLogin = req.query.checkLogin

        if(checkLogin == login){
          console.log('VERIFIED!')
          res.json({success:'true'})
        } else{
          console.log('REJECTED!')
            res.json({success:'false'})
        }
      })
    });








router.get('/accpanel', function(req, res, next) {


      connection.query('SELECT * FROM Charity', function (error, result, fields) {
        if (error) {
            throw error;
        } else {
            console.log('Charity Result: ',result)



                res.render('accpanel', {
                          object: result
                      });



        }
      });
    });

router.get('/removeCharity', function(req, res, next) {


          connection.query('DELETE * FROM Charity', function (error, result, fields) {
            if (error) {
                throw error;
            } else {
                console.log('removed: ',result)


                    res.render('accpanel', {
                              object: result
                          });
                        res.redirect('/accpanel')
            }
          });
        });

router.get('/changeCharity', function(req, res, next) {


    connection.query('DELETE * FROM Charity', function (error, result, fields) {
        if (error) {
          throw error;
        } else {
            console.log('removed: ',result)


              res.render('accpanel', {
                          object: result
                    });
                      res.redirect('/accpanel')
                    }
                  });
                });


module.exports = router;
