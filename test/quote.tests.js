var assert = require('chai').assert;
    webdriver = require('selenium-webdriver');
    test = require('selenium-webdriver/testing');
    QuotePage = require('./quote.page');


//params and variables
var driver;
const mochaTimeOut = 10000;


//tests
test.describe('Valid Postcode', function() {
    this.timeout(mochaTimeOut);

    //setup
    test.before(function() {
        driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
    });

    test.it('complete form and check quote', function() {
        //load homepage
        var quotePage = new QuotePage(driver);
        quotePage.visit();

        // enter post code
        driver.findElement(quotePage.postcode).sendKeys('N1 9PD');

        //wait for address list and click
        driver.wait(webdriver.until.elementLocated(quotePage.address_lookup), mochaTimeOut)
        driver.findElement(quotePage.address_lookup).click();

        //select number of bedrooms
        driver.findElement(quotePage.two_bedrooms).click();

        // enter email
        driver.findElement(quotePage.email).sendKeys('test@test.com');

        //calculate quote
        quotePage.submit();

        //wait for loading to complete
        driver.wait(webdriver.until.stalenessOf(driver.findElement(quotePage.quote_loader), mochaTimeOut))

        //assert quote is not null 
        driver.findElement(quotePage.quote_text).getText().then(function(text) {
            assert.isNotEmpty(text);
        });

        //assert quote is in expected range 
        driver.findElement(quotePage.quote_text).getText().then(function(text) {
            var intQuote = text.replace(/[^0-9]/g,'');
            assert.isTrue(1150 < intQuote && intQuote < 1350);
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
