/* eslint-env protractor */
const appUrl = 'http://localhost:5000';

describe('ohMyApp client side hide all animals functionality', () => {

  it('should hide all lions when client clicks "Hide All Lions" button', () => {
    browser.get(appUrl);
    element(by.buttonText('Show All Lions')).click();
    var lionRows = element.all(by.repeater('lion in lionsCtrl.lions'));
    lionRows.count().then((count) => {
      expect(count).toBeGreaterThan(0);
      element(by.buttonText('Hide All Lions')).click();
      lionRows = element.all(by.repeater('lion in lionsCtrl.lions'));
      lionRows.count().then((count) => {
        expect(count).toEqual(0);
      });
    });
  });

  it('should hide all tigers when client clicks "Hide All Tigers" button', () => {
    browser.get(appUrl);
    element(by.buttonText('Show All Tigers')).click();
    var tigerRows = element.all(by.repeater('tiger in tigersCtrl.tigers'));
    tigerRows.count().then((count) => {
      expect(count).toBeGreaterThan(0);
      element(by.buttonText('Hide All Tigers')).click();
      tigerRows = element.all(by.repeater('tiger in tigersCtrl.tigers'));
      tigerRows.count().then((count) => {
        expect(count).toEqual(0);
      });
    });
  });

  it('should hide all bears when client clicks "Hide All Bears" button', () => {
    browser.get(appUrl);
    element(by.buttonText('Show All Bears')).click();
    var bearRows = element.all(by.repeater('bear in bearsCtrl.bears'));
    bearRows.count().then((count) => {
      expect(count).toBeGreaterThan(0);
      element(by.buttonText('Hide All Bears')).click();
      bearRows = element.all(by.repeater('bear in bearsCtrl.bears'));
      bearRows.count().then((count) => {
        expect(count).toEqual(0);
      });
    });
  });
});
