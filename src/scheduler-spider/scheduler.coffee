###
  Scheduler for the spiders
###

class Scheduler
  constructor: (@request, @worker, first_url, @goal = 0) ->
    @visited_urls = {}
    @pending_urls = []
    @pending_urls.push first_url
    @visited_urls = 0

  start: () ->
    next_url = @pending_urls.pop()
    @send_worker(next_url)
    ###
      Verificar sincronizador para poder trabajar con varios procesos concurrentes:
        De momento corren varios juntos.
    if @goal > 0
      @send_worker(next_url) until @stop(next_url)
    else
      @send_worker(next_url) until @stop(next_url)
    ###

  stop: (next_url, has_goal) ->
    if has_goal
      console.log(next_url)
      return next_url == undefined or @goal == @visited_urls
    else
      return next_url == undefined


  send_worker: (url) ->
    @visited_urls++
    uri =
      method: 'GET'
      url: url
    console.log "Enviando request a "+url
    @request uri, (err, response, body) =>
      if err
        console.error err
      data = @worker.extract(body)
      console.log url
      console.log JSON.stringify data, null, 2
      @pending_urls.concat data.links
      console.log @pending_urls
    return true

module.exports = Scheduler
