const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const buildDir = path.join(__dirname, '../build');
app.use(favicon(buildDir + '/favicon.ico'));
// the __dirname is the current directory from where the script is running
// the build dir is one level above
app.use(express.static(buildDir));
app.use(express.static(__dirname));
const info = require('../package.json');
app.get('/ping', function(req, res) {
  return res.send(`version ${info.version}`);
});
app.get('/*', function(req, res) {
  res.sendFile(path.join(buildDir, 'index.html'));
});

app.listen(port);
