
/**
 * Module dependencies
 */

var debug = require('debug')('cartojs:query');
var print = require('print');
var isArray = require('isArray');
var jsonp = require('jsonp');

/**
 * Expose constructor
 */

module.exports = Connection;

/**
 * Constructor
 *
 * @param {Object} options
 *   - username {String}
 *   - host {String} (default: `cartodb.com`)
 *   - protocol {String} (default: `https`)
 */

function Connection(options) {
  if(!(this instanceof Connection)) {
    return new Connection(options);
  }

  if("string" != typeof options.username) {
    throw new Error("Please provide a username option.");
  }

  debug('Started connection for ', options.username);

  this.username = options.username;
  this.base_url = buildBaseUrl(options); 
}

/**
 * Execute query
 *
 * @param {String|Array} sql query. It can be a plain string or
 *                       an array like ['select {} from {}', 'myfield', 'mytable']
 * @param {Object} meta params
 * @param {Function} callback
 *
 * @api public
 */

Connection.prototype.query = function(q, opts, fn) {

  if(isArray(q)) {
    q = print.url.apply(this, q); 
  }

  debug('About to start querying' + q);

  if("undefined" == typeof fn && "function" == typeof opts) {
    fn = opts;
    opts = null;
  }

  var extra = "";
  if(opts !== null) {
    for(var o in opts) {
      extra += o + "=" + opts[o];    
    }
    extra = extra.length && extra.substring(0, extra.length - 1);
  }
  jsonp(this.base_url + print.url('?q={}&{}', q, extra), fn || function(){});
};

/**
 * Build base url
 *
 * @param {Object} options
 * @return {String}
 */

function buildBaseUrl(options) {
  var protocol = options.protocol || "https";
  var host = options.host || "cartodb.com";
  return print.url('{}://{}.{}/api/v2/sql', protocol, options.username, host); 
}
