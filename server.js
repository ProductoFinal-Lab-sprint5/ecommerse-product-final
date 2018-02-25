let express = require('express');
let app = express();
let server = app.listen(4040, function() {
  console.log('servidor encendido :)');
});

app.use(express.static('public'));