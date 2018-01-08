var webdriver = require('selenium-webdriver');
var assert = require('chai').assert

// set up webdriver for chrome
var driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build();
 
driver.get('http://www.hostmaker.com');

// enter post code
driver.findElement(webdriver.By.name('address')).sendKeys('N1 9PD');

//wait for address list and click
driver.wait(webdriver.until.elementLocated(webdriver.By.className('pac-item-query')), 10 * 1000)
driver.findElement(webdriver.By.className('pac-item-query')).click();

//select number of bedrooms
driver.findElement(webdriver.By.css('#calculator-bedrooms > option:nth-child(2)')).click();

//assert we have the correct number of bedrooms
// driver.findElement(webdriver.By.css('#calculator-bedrooms')).getAttribute('value').then(function(selected) {
//     if (assert.equal('2', selected)) {
//         console.log('Bedrooms selected is 2 - PASS')
//     }
//   });

// enter email
driver.findElement(webdriver.By.name('email')).sendKeys('test@test.com');

//calculate quote
driver.findElement(webdriver.By.id('calculate-income')).click();

//wait for loading to complete
driver.wait(webdriver.until.elementIsNotVisible(driver.findElement(webdriver.By.className('loading')), 10 * 1000))
    .catch(function(err) {
        console.log('Quote loaded');
    });

//assert quote is in expected range 
driver.findElement(webdriver.By.className('pricing-hero-unit_price-heading')).getText().then(function(text) {
    console.log('Quote: ' + text)
    var intQuote = text.replace(/[^0-9]/g,'');
    assert.isTrue(1075 < intQuote < 1300);
    console.log('Quote within expected range.')
});

driver.quit();