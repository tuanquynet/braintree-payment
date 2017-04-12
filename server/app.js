/*global process*/
const util = require('util');
const braintree = require('braintree');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'h5tnzcmthnr28y2k',
  publicKey: '4w8pjbd85f2gwtc7',
  privateKey: '65ff901c2e794cacd3c8fdaf07c653ee'
});
const paymentInfo = {
  customerId: '0908356645-01'
}
/*Allow CORS*/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/clientToken', function (req, res, next) {
  console.log('clientToken');
  gateway.clientToken.generate({}, function (err, response) {
    const clientToken = response.clientToken;
    console.log('clientToken ', clientToken);
    res.json({
      clientToken
    });
  });
});

app.post('/checkout', function (req, res, next) {
  const nonceFromTheClient = req.body.payment_method_nonce;
  console.log('nonceFromTheClient ', nonceFromTheClient);
  console.log(req.body);
  gateway.transaction.sale({
      amount: '10.00',
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true
      }
    },
    function (err, result) {
      if (result) {
        if (result.success) {
          console.log("Transaction ID: " + result.transaction.id);
          res.send("Transaction ID: " + result.transaction.id);
        } else {
          console.log(result.message);
          res.send(result.message);
        }
      } else {
        console.log(err)
        return next(err);
      }
    });

});

// var host = process.env.host;
const port = process.env.PORT || 9010;
const host = process.env.HOST || '0.0.0.0';

app.start = () => {

  app.listen(port, function () {
    console.log('Example app listening at http://%s:%s', host, port);
  });
}
app.start();