const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/index.js');
const api = require('./services/urlshortner.js');
const shortUrl = require('./models/shorturl.js');
const keys = require('./config/keys.js');


const app = express();
const port = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use(cors());

mongoose.connect(keys.mongoURI);

app.use(express.static(__dirname + '/public'));

routes(app);
api(app, shortUrl);


app.listen(port, () => {
  console.log('Application is listening on port ' + port);
});
