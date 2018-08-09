var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var cors = require('cors');

var port = process.env.PORT || 8080;

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://authn-demo.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://authn-demo-api.example.com/v1.0',
    issuer: "https://authn-demo.auth0.com/",
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.use(cors())

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

app.listen(port);
