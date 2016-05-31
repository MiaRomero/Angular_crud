module.exports = exports = function(app) {
  require('./animalResource')(app);
  require('./ohMyResource')(app);
  require('./appErrorHandler')(app);
};
