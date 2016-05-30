const ohMyApp = require(__dirname + '/ohMyApp');
require(__dirname + '/services/appErrorHandler')(ohMyApp);
require(__dirname + '/controllers/animalsController');
require(__dirname + '/controllers/ohMyController');
require(__dirname + '/directives/directiveIndex')(ohMyApp);
