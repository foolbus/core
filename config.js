const dotenv = require('dotenv');

const defaults = {
  SESSION_SECRET : 'secret', //secret string for session
  COOKIE_DOMAIN  : 'http://localhost:3000'
}


module.exports = defaults;
