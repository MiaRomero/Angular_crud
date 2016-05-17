/* eslint-env protractor */
const appUrl = 'http://localhost:5000';
const apiUrl = 'http://localhost:3000';
const request = require('superagent');

describe('ohMyApp client side show all animals functionality', () => {
  beforeAll( () => {
    request.post(apiUrl + '/api/lions')
    .send({ name: 'testLion1', variety: 'African', location: 'Pridelands',
          continent: 'Africa', nemesis: 'hyenas' })
    .end( () => {
    });
    request.post(apiUrl + '/api/lions')
    .send({ name: 'testLion2', variety: 'African', location: 'Tanzania',
          continent: 'Africa', nemesis: 'fast zebras' })
    .end( () => {
    });
    request.post(apiUrl + '/api/tigers')
    .send({ name: 'testTiger1', variety: 'Bengal', location: 'jungle',
          continent: 'Asia', nemesis: 'poachers' })
    .end( () => {
    });
    request.post(apiUrl + '/api/tigers')
    .send({ name: 'testTiger2', variety: 'siberian', location: 'Russia',
          continent: 'Asia', nemesis: 'colors' })
    .end( () => {
    });
    request.post(apiUrl + '/api/bears')
    .send({ name: 'testBear1', variety: 'brown', location: 'Yellowstone',
          continent: 'North America', nemesis: 'bison' })
    .end( () => {
    });
  });

  it('should show all lions when client clicks "Show All Lions" button', () => {
    browser.get(appUrl);
    element(by.buttonText('Show All Lions')).click();
    var lionRows = element.all(by.repeater('lion in lionsCtrl.lions'));
    lionRows.count().then((count) => {
      expect(count).toEqual(2);
    });
  });
});
