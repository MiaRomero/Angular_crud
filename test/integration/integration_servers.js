const app = require(__dirname + '/../../server/_server');
require(__dirname + '/../../server/static_server');
const port = process.env.PORT || 3000;

app(port, process.env.MONGODB_URI || 'mongodb://localhost/ohMy_testDB',
console.log('server up on ' + port + ', mongo connected to ohMy_testDB'));
