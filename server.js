let express = require('express');
let app = express();
let server = app.listen(function() {
  console.log('servidor encendido :)');
});

app.use(express.static('public'));