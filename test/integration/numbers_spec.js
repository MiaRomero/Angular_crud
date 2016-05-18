/* eslint-env protractor */
const appUrl = 'http://localhost:5000';

describe('ohMyApp show total number of each animal functionality', () => {
  it('should show number of each animal on "Show Number of Lions, Tigers, and Bears" click',
  () => {
    browser.get(appUrl);
    element(by.buttonText('Show Number of Lions, Tigers, and Bears')).click();
    element(by.id('totalsText')).getText().then((text) => {
      expect(text).not.toBeNull();
    });
  });

  it('should hide text describing animal numbers on "Hide Totals" click', () => {
    browser.get(appUrl);
    element(by.buttonText('Show Number of Lions, Tigers, and Bears')).click();
    element(by.id('totalsText')).getText().then((text) => {
      expect(text).not.toBeNull();
      element(by.buttonText('Hide Totals')).click();
      expect(element(by.id('totalsText')).isPresent()).toBe(false);
    });
  });
});
