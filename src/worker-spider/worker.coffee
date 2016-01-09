###
  Base class for interface implementation
###

class Worker
  constructor: (@cheerio) ->

  extract: (html_data) ->
    data =
      info: {}
      links: []
    return data

module.exports = Worker
