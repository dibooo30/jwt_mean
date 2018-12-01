var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
// const jwtMiddelwear = require('../jwt/jwt');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
function jwtMedilwear(req, res, next) {
  console.log(req.headers['authorization'])
  const authString = req.headers['authorization'];
  if (typeof authString === "string" && authString.indexOf(' ') > -1) {
      const authArray = authString.split(' ');
      const token = authArray[1];
      jwt.verify(token, serverJWT_Secret, (err, decoded) => {
          if (err) {
              res.json(err);
          }else{
              req.decoded = decoded;
              next();
          }
      })
  }else{
      res.json('user not logeded in');  
  }
  
}
const appUsers = [
  {
    email:'ahmed@ahmed.com',
    name: 'Max Miller',
    pw: '123' // YOU DO NOT WANT TO STORE PW's LIKE THIS IN REAL LIFE - HASH THEM FOR STORAGE
  },
  {
    email:'mohamed@gmail.com',
    name: 'Mohmed Diab',
    pw: '123456' // YOU DO NOT WANT TO STORE PW's LIKE THIS IN REAL LIFE - HASH THEM FOR STORAGE
  }
]

const serverJWT_Secret = 'kpTxN=)7mX3W3SEJ58Ubt8-';

router.post('/login', (req, res) => {
  console.log(req.headers);
  console.log(req.decoded);

  if (req.body) {
    for (const user of appUsers) {
      if (user.email == req.body.email && user.pw == req.body.password ) {
        let u = {
          password:user.name, 
          email:user.email
        }
        var o = JSON.stringify(u)
        const token = jwt.sign(o, serverJWT_Secret); // <==== The all-important "jwt.sign" function
        res.send({
          success:true,
          user: {name:user.name, email:user.email},
          token: token
        });
      } else {
        console.log(req.body);
        res.send({
          errorMessage: 'Permission denied!'
        });
      }
    }
  } else {
    res.send({
      errorMessage: 'Please provide email and password'
    });
  }

});
function getDashbord(){

}


router.get('/dashbord' , (req, res, next) => {
  res.json({
    title:'welcome you are first user',
    body:'have a good brouwsing with us'
  })
  
})

router.get('/jwt' , jwtMedilwear, (req, res, next) => {
  res.json({
    title:'welcome you are first user',
    body:'have a good brouwsing with us'
  })
})

router.post('/jwt' , jwtMedilwear, (req, res, next) => {
  console.log(req.body)
  res.json('done')
})

module.exports = router;
