const ohMyApp = require(__dirname + '/ohMyApp');
require(__dirname + '/services/servicesIndex')(ohMyApp);
require(__dirname + '/controllers/animalsController');
require(__dirname + '/controllers/ohMyController');
require(__dirname + '/directives/directivesIndex')(ohMyApp);
