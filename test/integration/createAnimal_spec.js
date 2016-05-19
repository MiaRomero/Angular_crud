/* eslint-env protractor */
const appUrl = 'http://localhost:5000';

describe('ohMyApp client side create new animal functionality', () => {
  it('should create a new lion when client clicks "Create New Lion" button', () => {
    const writeLion = (animal) => {
      return animal.name + ' is an ' + animal.variety + ' lion from ' + animal.location
       + ' in ' + animal.continent + '. His nemesis is ' + animal.nemesis;
    };
    var newLion = {
      name: 'testLion',
      variety: 'testy',
      location: 'testLand',
      continent: 'Australia',
      nemesis: 'death adder'
    };
    var newLionString = writeLion(newLion);
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

  it('should create a new tiger when client clicks "Create New Tiger" button', () => {
    const writeTiger = (animal) => {
      return animal.name + ' is a ' + animal.variety + ' tiger from ' + animal.location
       + ' in ' + animal.continent + '. His nemesis is ' + animal.nemesis;
    };
    var newTiger = {
      name: 'testTiger',
      variety: 'stripey',
      location: 'jungle',
      continent: 'Asia',
      nemesis: 'poachers'
    };
    var newTigerString = writeTiger(newTiger);
    browser.get(appUrl);
    element(by.buttonText('Show All Tigers')).click();
    element(by.model('tigersCtrl.newTiger.name')).sendKeys(newTiger.name);
    element(by.model('tigersCtrl.newTiger.variety')).sendKeys(newTiger.variety);
    element(by.model('tigersCtrl.newTiger.location')).sendKeys(newTiger.location);
    element(by.model('tigersCtrl.newTiger.continent')).sendKeys(newTiger.continent);
    element(by.model('tigersCtrl.newTiger.nemesis')).sendKeys(newTiger.nemesis);
    element(by.id('createTiger')).click();
    var tigerRow = element.all(by.repeater('tiger in tigersCtrl.tigers')).last();
    tigerRow.getText().then((text) => {
      expect(text).toEqual(newTigerString + ' Edit Remove Tiger');
    });
  });

  it('should create a new bear when client clicks "Create New Bear" button', () => {
    const writeBear = (animal) => {
      return animal.name + ' is a ' + animal.variety + ' bear from ' + animal.location
       + ' in ' + animal.continent + '. His nemesis is ' + animal.nemesis;
    };
    var newBear = {
      name: 'testBear',
      variety: 'spirit',
      location: 'British Columbia',
      continent: 'North America',
      nemesis: 'tourists`'
    };
    var newBearString = writeBear(newBear);
    browser.get(appUrl);
    element(by.buttonText('Show All Bears')).click();
    element(by.model('bearsCtrl.newBear.name')).sendKeys(newBear.name);
    element(by.model('bearsCtrl.newBear.variety')).sendKeys(newBear.variety);
    element(by.model('bearsCtrl.newBear.location')).sendKeys(newBear.location);
    element(by.model('bearsCtrl.newBear.continent')).sendKeys(newBear.continent);
    element(by.model('bearsCtrl.newBear.nemesis')).sendKeys(newBear.nemesis);
    element(by.id('createBear')).click();
    var bearRow = element.all(by.repeater('bear in bearsCtrl.bears')).last();
    bearRow.getText().then((text) => {
      expect(text).toEqual(newBearString + ' Edit Remove Bear');
    });
  });
});
