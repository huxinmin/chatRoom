const path = require('path');
const express = require('express');
const env = require('dotenv').config({path:path.resolve(__dirname, '../.env')}).parsed;
const history =  require('express-history-api-fallback');

const app = express();
const root = path.join(__dirname, './dist');

app.use(express.static(path.join(root,'html')));
app.use('/chatRoom',express.static(path.join(root,'html')));
app.use('/assets',express.static(path.join(root,'assets')));
app.use('/bundle',express.static(path.join(root,'bundle')));

app.use(history('index.html', { root: path.join(root,'html') }));

const port = env.clientPort || 3000
app.listen(port);

console.log('client is listen on '+port)
