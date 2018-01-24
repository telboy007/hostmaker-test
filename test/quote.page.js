var webdriver = require('selenium-webdriver');
 
QuotePage = function QuotePage(driver) {
    this.driver = driver;
    this.url = 'http://www.hostmaker.com';
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
 
QuotePage.prototype.submit = function() {
    this.driver.findElement(this.get_quote).click();
    return webdriver.promise.fulfilled(true);
};

module.exports = QuotePage;


// //create getters
// var Page = require('.page/')

// var LoginPage = Object.create(Page, {
// 	postcode:	    { get: function () { return browser.element('#address'); } },
// 	google_popup:	{ get: function () { return browser.element('#pac-item-query'); } },
// 	bedrooms:	    { get: function () { return browser.element('#calculator-bedrooms'); } },
// 	email:		    { get: function () { return browser.element('#email'); } },
// 	quote_button:	{ get: function () { return browser.element('.calculate-income'); } },

//     	open: { value: function() {
// 	        Page.open.call(this, 'quote');
// 	} },

// 	submit: { value: function() {
// 	        this.form.submitForm();
// 	} }
// });

// module.exports = QuotePage;