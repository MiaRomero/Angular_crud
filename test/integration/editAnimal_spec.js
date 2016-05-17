/* eslint-env protractor */
const appUrl = 'http://localhost:5000';

describe('ohMyApp client side edit/update an animal functionality', () => {

  it('should edit lion info in editable text box when "Edit" button is clicked', () => {
    browser.get(appUrl);
    element(by.buttonText('Show All Lions')).click();
    var origLion = element.all(by.repeater('lion in lionsCtrl.lions')).first();
    origLion.element(by.buttonText('Edit')).click();
    element(by.model('lion.name')).clear();
    element(by.model('lion.name')).sendKeys('EditLion');
    element(by.buttonText('Update Lion')).click();
    var editLion = element.all(by.repeater('lion in lionsCtrl.lions')).first();
    editLion.getText().then((text) => {
      expect(text).toContain('EditLion');
    });
  });

  it('should edit tiger info in editable text box when "Edit" button is clicked', () => {
    browser.get(appUrl);
    element(by.buttonText('Show All Tigers')).click();
    var origTiger = element.all(by.repeater('tiger in tigersCtrl.tigers')).first();
    origTiger.element(by.buttonText('Edit')).click();
    element(by.model('tiger.name')).clear();
    element(by.model('tiger.name')).sendKeys('EditTiger');
    element(by.buttonText('Update Tiger')).click();
    var editTiger = element.all(by.repeater('tiger in tigersCtrl.tigers')).first();
    editTiger.getText().then((text) => {
      expect(text).toContain('EditTiger');
    });
  });

  it('should edit bear info in editable text box when "Edit" button is clicked', () => {
    browser.get(appUrl);
    element(by.buttonText('Show All Bears')).click();
    var origBear = element.all(by.repeater('bear in bearsCtrl.bears')).first();
    origBear.element(by.buttonText('Edit')).click();
    element(by.model('bear.name')).clear();
    element(by.model('bear.name')).sendKeys('EditBear');
    element(by.buttonText('Update Bear')).click();
    var editBear = element.all(by.repeater('bear in bearsCtrl.bears')).first();
    editBear.getText().then((text) => {
      expect(text).toContain('EditBear');
    });
  });
});
