module.exports = {
  'Homepage form test' : function (browser) {
    browser
        .url('http://localhost:1313/')
        .waitForElementVisible('body')
        //test error
        .waitForElementVisible('button[type=submit]')
        .click('button[type=submit]')
        .pause(1000)
        .assert.containsText('.error', 'Please, type a keyword')
        //test navigation
        .setValue('input[type=text]', 'test')
        .click('button[type=submit]')
        .pause(1000)
        .assert.containsText('h1', 'English')
        .assert.containsText('.keyword-value', 'test')
        .end();
  },
  'Homepage map test' : function (browser) {
    browser
        .url('http://localhost:1313/')
        .waitForElementVisible('body')
        .waitForElementVisible('svg[id=eu-map]')
        .click('path[id=it]')
        .click('path[id=it]')
        .pause(3000)
        .assert.containsText('h3.top', 'Italy')
  }
};