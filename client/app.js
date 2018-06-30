const path = require('path');
const express = require('express');
const history =  require('express-history-api-fallback');

const app = express();
const root = path.join(__dirname, './dist');

app.use(express.static(root));

app.use(history('index.html', { root: root }));

app.listen(process.env.PORT || 3000);