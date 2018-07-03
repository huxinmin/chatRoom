const path = require('path');
const express = require('express');
const env = require('dotenv').config({path:path.resolve(__dirname, '../.env')}).parsed;
const history =  require('express-history-api-fallback');

const app = express();
const root = path.join(__dirname, './dist');

app.use(express.static(root));

app.use(history('index.html', { root: root }));

const port = env.clientPort || 3000
app.listen(port);

console.log('client is listen on '+port)
