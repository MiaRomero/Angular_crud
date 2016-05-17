/* eslint-env protractor */
const appUrl = 'http://localhost:5000';

const writeAnimal = (animal, species) => {
  return animal.name + ' is an ' + animal.variety + ' ' + species + ' from ' + animal.location
   + ' in ' + animal.continent + '. His nemesis is ' + animal.nemesis;
};

describe('ohMyApp client side create new animal functionality', () => {

  it('should create a new lion when client clicks "Create New Lion" button', () => {
    var newLion = {
      name: 'testLion4',
      variety: 'testy3',
      location: 'testLand3',
      continent: 'Australia3',
      nemesis: 'death adder3'
    };
    var newLionString = writeAnimal(newLion, 'lion');

    browser.get(appUrl);
    element(by.buttonText('Show All Lions')).click();
    element(by.model('lionsCtrl.newLion.name')).sendKeys(newLion.name);
    element(by.model('lionsCtrl.newLion.variety')).sendKeys(newLion.variety);
    element(by.model('lionsCtrl.newLion.location')).sendKeys(newLion.location);
    element(by.model('lionsCtrl.newLion.continent')).sendKeys(newLion.continent);
    element(by.model('lionsCtrl.newLion.nemesis')).sendKeys(newLion.nemesis);
    element(by.id('createLion')).click();
    var lionRow = element.all(by.repeater('lion in lionsCtrl.lions')).last();
    lionRow.getText().then((text) => {
      expect(text).toEqual(newLionString + ' Edit Remove Lion');
    });
  });


});
