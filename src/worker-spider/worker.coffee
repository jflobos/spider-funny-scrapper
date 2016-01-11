###
  Base class for interface implementation
###

class Worker
  constructor: (name = "worker") ->
    console.log "Initializing new "+name

  extract: (url) ->
    data =
      info: {}
      links: []
    return data

module.exports = Worker
