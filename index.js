/**
 * Dependencies
 */

var epoch = new Date('1970-01-01 00:00:00 UTC')
var cookie = require('component-cookie')
var parser = require('cookie')

/**
 * Export
 */

module.exports = {
  set: function(ctx, value, options) {
    options = options || {}
    options.path = options.path || '/'
    if (arguments.length === 2) {
      if (ctx.req) {
        // server
        ctx.res.setHeader(
          'Set-Cookie',
          parser.serialize('flash', value, options)
        )
      } else {
        // client
        cookie('flash', JSON.stringify(value), options)
      }
    } else if (arguments.length === 1) {
      // client
      cookie('flash', JSON.stringify(ctx), options)
    }
  },
  get: function(ctx) {
    var value
    if (ctx && ctx.req) {
      // server
      var header = ctx.req.headers.cookie
      if (!header) return
      var cookies = parser.parse(header)
      if (!cookies.flash) return
      value = JSON.parse(cookies.flash)
      ctx.res.setHeader(
        'Set-Cookie',
        parser.serialize('flash', value, { expires: epoch })
      )
      return value
    } else {
      // client
      value = cookie('flash')
      if (!value) return
      cookie('flash', null)
      return JSON.parse(value)
    }
  }
}
