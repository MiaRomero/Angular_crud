module.exports = exports = function(app) {
  require('./animalResource')(app);
  require('./appErrorHandler')(app);
};
