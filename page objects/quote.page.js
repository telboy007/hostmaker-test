var webdriver = require('selenium-webdriver');
    config = require('config');
 

// bits and bobs
QuotePage = function QuotePage(driver) {
    this.driver = driver;
    this.url = config.get('url');
    this.postcode = webdriver.By.name('address')
    this.address_lookup = webdriver.By.className('pac-item-query')
    this.two_bedrooms = webdriver.By.css('#calculator-bedrooms > option:nth-child(2)')
    this.email = webdriver.By.name('email')
    this.get_quote = webdriver.By.id('calculate-income')
    this.quote_loader = webdriver.By.className('loading')
    this.quote_text = webdriver.By.className('pricing-hero-unit_price-heading')
};
 
QuotePage.prototype.visit = function() {
    this.driver.get(this.url);
    return webdriver.promise.fulfilled(true);
};
 
QuotePage.prototype.click = function(element) {
    this.driver.findElement(element).click();
    return webdriver.promise.fulfilled(true);
};

QuotePage.prototype.getText = function(element) {
    return this.driver.findElement(element).getText().then(function(text) {
        return webdriver.promise.fulfilled(text, true);
    });
};

QuotePage.prototype.setText = function(element, text) {
    this.driver.findElement(element).sendKeys(text);
    return webdriver.promise.fulfilled(true);
};

// waits until an element is located
QuotePage.prototype.untilLocated = function(element, time) {
    this.driver.wait(webdriver.until.elementLocated(element, time));
    return webdriver.promise.fulfilled(true);
};

// waits until an element is visible
QuotePage.prototype.untilVisible = function(element, time) {
    this.driver.wait(webdriver.until.elementIsVisible(this.driver.findElement(element, time)));
    return webdriver.promise.fulfilled(true);
};

// waits until an element has become stale
QuotePage.prototype.untilStale = function(element, time) {
    this.driver.wait(webdriver.until.stalenessOf(this.driver.findElement(element, time)));
    return webdriver.promise.fulfilled(true);
};

module.exports = QuotePage;
