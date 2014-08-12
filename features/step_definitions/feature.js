/**
 * Module dependencies.
 */

var world = require('../support/world').World;

/**
 * Step definitions.
 */

var stepDefs = function () {
    this.World = world;

    this.When(/^I open an article$/, function (callback) {
        this.visit("http://m.guardian.co.uk/sport/2012/oct/10/icc-suspends-umpires-corruption-claims", callback);
    });

    this.Then(/^I should see an option to read more on the story$/, function (callback) {
        this.browser.hasText('aside h3', 'More on this story', callback)
    });

    this.Given(/^I open the responsive site$/, function (callback) {
        this.visit("http://m.guardian.co.uk", callback);
    });

    this.When(/^I choose to read more content$/, function (callback) {
        var expect = this.expect
        this.browser.waitFor(".js-show-more", 100, function () {
            var self = this;
            self.isVisible(".trail--headline", function (error, result) {
                expect(error).not.to.be.null;
                self.buttonClick(".js-show-more", callback)
            });
        })
    });

    this.Then(/^I should receive more headlines$/, function (callback) {
        var assert = this.assert
        this.browser.waitFor(".trail--headline", 10000, function () {
            var self = this;
            self.isVisible(".trail--headline", function (error, result) {
                assert.equal(true, result);
                callback()
            })
        })

    });

 this.When(/^I select the sections navigation button$/, function(callback) {
  // express the regexp above with the code you wish you had
 // console.log("got to nav button");
  this.browser.buttonClick(".control--sections",callback)
});

this.Then(/^it should show me a list of sections$/, function(callback) {
  // express the regexp above with the code you wish you had

    var assert = this.assert
    this.browser.getElementCssProperty("class name","nav-popup--sections","display",function (error, result) {
    assert.equal("block",result,"css value was wrong");

        callback();
    })
});

}




module.exports = stepDefs;
