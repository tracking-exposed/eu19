module.exports =
{
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
  },

  'Landing page test' : function (browser) {
    browser
        .url('http://localhost:1313/')
        .waitForElementVisible('body')
        .click('.banner a')
        .pause(1000)
        .assert.containsText('h2.top', 'join a collaborative effort to map propaganda and Facebook abuses')
        .assert.elementCount('a.btn', 2)
  },

  'Pages test' : function (browser) {
    browser
        .url('http://localhost:1313/language/')
        .waitForElementVisible('ul.archive')
        .pause(1000)
        .assert.elementCount('ul.archive li', 22)
        .url('http://localhost:1313/country/')
        .waitForElementVisible('ul.archive')
        .pause(1000)
        .assert.elementCount('ul.archive li', 27)
  }

};
