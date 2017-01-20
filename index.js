/**
 * Dependencies
 */

const epoch = new Date('1970-01-01 00:00:00 UTC')
const cookie = require('component-cookie')
const parser = require('cookie')

/**
 * Export
 */

module.exports = {
  set: function (ctx, value) {
    if (arguments.length === 2) {
      if (ctx.req) {
        // server
        ctx.res.setHeader('Set-Cookie', parser.serialize('flash', value))
      } else {
        // client
        cookie('flash', JSON.stringify(value))
      }
    } else if (arguments.length === 1) {
      // client
      cookie('flash', JSON.stringify(ctx))
    }
  },
  get: function (ctx) {
    if (ctx && ctx.req) {
      // server
      const header = ctx.req.headers.cookie
      if (!header) return
      const cookies = parser.parse(header)
      if (!cookies.flash) return
      const value = JSON.parse(cookies.flash)
      ctx.res.setHeader('Set-Cookie', parser.serialize('flash', value, { expires: epoch }))
      return value
    } else {
      // client
      const value = cookie('flash')
      if (!value) return
      cookie('flash', null)
      return JSON.parse(value)
    }
  }
}
