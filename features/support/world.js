/**
 * Module dependencies.
 */

var webdriverjs = require("webdriverjs");

/**
 * Setup client.
 */

var client = webdriverjs.remote({
  desiredCapabilities: {
    browserName: 'phantomjs'
  },
  logLevel: 'verbose'
});

/**
 * Command: 'hasText'.
 *
 * @param {String} selector
 * @param {String} text
 * @param {Function} done
 * @api public
 */

client.addCommand('hasText', function (selector, text, done) {
  this.getText(selector, function (error, result) {
    expect(result).to.have.string(text);
    done();
  });
});

/**
 * Command: 'waitUntilVisible'.
 *
 * @param {String} element
 * @param {Function} done
 * @api public
 */

client.addCommand('waitUntilVisible', function (element, done) {
  var self = this;

  function checkElement() {
    self.isVisible(element, function (error, result) {
      if (result === true) {
        done();
      } else {
        setTimeout(checkElement, 500);
      }
    });
  }

  checkElement();
});

/**
 * Start the client.
 */

client.init();

/**
 * Exports.
 */

module.exports.World = function World(done) {
  this.browser = client;

  this.visit = function(url, done) {
      this.browser.url(url, done);
  };

  done();
};
