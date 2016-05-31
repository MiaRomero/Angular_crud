module.exports = exports = function(app) {
  require('./animalResource')(app);
  require('./ohMyResource')(app);
  require('./communicationService')(app);
  require('./appErrorHandler')(app);
};
