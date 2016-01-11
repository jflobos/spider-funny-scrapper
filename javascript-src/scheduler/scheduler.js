/*
  Scheduler for the workers
*/
var Scheduler = function(request, worker, url_list, goal){
  this.request = request;
  this.worker = worker;
  this.pending_urls = url_list;
  this.visited_urls = 0;
  if(goal){
    this.goal = goal;
  }
  else{
    this.goal = 0;
  }
}

Scheduler.prototype = {
  start: function(){
    var next_url = this.pending_urls.pop();
    this.send_worker(next_url);
  },
  send_worker: function(url){
    var wkr = this;
    this.visited_urls++;
    var uri = { method: 'GET', url: url };
    console.log("Enviando request a " + url);
    this.request(uri, function(err, response, body){
      if (err){
        console.error(err);
      }
      var data = wkr.worker.extract(body);
      console.log(JSON.stringify(data, null, 2));
    });
    return true;
  }
}

module.exports = Scheduler;
