/* eslint-env protractor */
const appUrl = 'http://localhost:5000';

describe('ohMyApp client side remove animal functionality', () => {

  it('should remove selected lion when client clicks corresponding "Remove" button', () => {
    browser.get(appUrl);
    element(by.buttonText('Show All Lions')).click();
    var lionRows = element.all(by.repeater('lion in lionsCtrl.lions'));
    lionRows.count().then((origCount) => {
      expect(origCount).toBeGreaterThan(0);
      var lastLion = element.all(by.repeater('lion in lionsCtrl.lions')).last();
      lastLion.element(by.buttonText('Remove Lion')).click();
      lionRows.count().then((count) => {
        expect(count).toEqual(origCount - 1);
      });
    });
  });

  it('should remove selected tiger when client clicks corresponding "Remove" button', () => {
    browser.get(appUrl);
    element(by.buttonText('Show All Tigers')).click();
    var tigerRows = element.all(by.repeater('tiger in tigersCtrl.tigers'));
    tigerRows.count().then((origCount) => {
      expect(origCount).toBeGreaterThan(0);
      var lastTiger = element.all(by.repeater('tiger in tigersCtrl.tigers')).last();
      lastTiger.element(by.buttonText('Remove Tiger')).click();
      tigerRows.count().then((count) => {
        expect(count).toEqual(origCount - 1);
      });
    });
  });

  it('should remove selected bear when client clicks corresponding "Remove" button', () => {
    browser.get(appUrl);
    element(by.buttonText('Show All Bears')).click();
    var bearRows = element.all(by.repeater('bear in bearsCtrl.bears'));
    bearRows.count().then((origCount) => {
      expect(origCount).toBeGreaterThan(0);
      var lastBear = element.all(by.repeater('bear in bearsCtrl.bears')).last();
      lastBear.element(by.buttonText('Remove Bear')).click();
      bearRows.count().then((count) => {
        expect(count).toEqual(origCount - 1);
      });
    });
  });
});
