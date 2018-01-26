require('chromedriver');
var assert = require('chai').assert;
    webdriver = require('selenium-webdriver');
    test = require('selenium-webdriver/testing');
    QuotePage = require('../page objects/quote.page');
    config = require('config');


//params and variables
var driver;
const mochaTimeOut = config.get('mochaTimeOut');
const explicitWait = config.get('explicitWait');


//tests
test.describe('Valid Postcode', function() {
    this.timeout(mochaTimeOut);

    //setup
    test.before(function() {
        driver = new webdriver.Builder().forBrowser('chrome').build();
    });

    test.it('complete form and check quote', function() {
        //load homepage
        var quotePage = new QuotePage(driver);
        quotePage.visit();

        // enter post code
        quotePage.setText(quotePage.postcode, 'N1 9PD');

        //wait for address list and click
        quotePage.untilLocated(quotePage.address_lookup, explicitWait);
        quotePage.click(quotePage.address_lookup);

        //select number of bedrooms
        quotePage.click(quotePage.two_bedrooms);

        // enter email
        quotePage.setText(quotePage.email, 'test@test.com');

        //click calculate button
        quotePage.click(quotePage.get_quote);

        //wait for loading to complete and quote to appear
        quotePage.untilStale(quotePage.quote_loader, explicitWait);
        quotePage.untilLocated(quotePage.quote_text, explicitWait);

        quotePage.getText(quotePage.quote_text).then(function(text) {
            //assert quote is not null 
            assert.isNotEmpty(text, 'Quote is empty.');

            //assert quote is in expected range 
            var intQuote = text.replace(/[^0-9]/g,'');
            assert.isTrue(1150 < intQuote && intQuote < 1350, 'Quote is not within expected range.');
        });
    });
    
    //post test clean up
    test.afterEach(function() {
        driver.manage().deleteAllCookies();
    });

    //clean up
    test.after(function() {
        driver.quit();
    });
});
