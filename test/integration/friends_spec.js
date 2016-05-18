/* eslint-env protractor */
const appUrl = 'http://localhost:5000';

describe('ohMyApp "Find Friends" button functionality', () => {
  it('should show animals on same continent on "Find Friends" click', () => {
    browser.get(appUrl);
    element(by.model('ohMyCtrl.continent')).sendKeys('North America');
    element(by.buttonText('Find Friends')).click();
    element(by.id('friendsText')).getText().then((text) => {
      expect(text).toContain('North America');
    });
  });

  it('should hide text describing animal friends on "Hide Friends" click', () => {
    browser.get(appUrl);
    element(by.buttonText('Find Friends')).click();
    element(by.id('friendsText')).getText().then((text) => {
      expect(text).not.toBeNull();
      element(by.buttonText('Hide Friends')).click();
      expect(element(by.id('friendsText')).isPresent()).toBe(false);
    });
  });
});
