/*
  Scheduler for the workers
*/
var Scheduler = function(request, worker, storage, url_list, goal){
  this.storage = storage;
  this.request = request;
  this.worker = worker;
  this.storage.add_urls('', url_list);
  this.visited_urls++;
  if(goal){
    this.goal = goal;
  }
  else{
    this.goal = 0;
  }
}

Scheduler.prototype = {
  start: function(){
    this.send_worker(this.storage.next_url());
  },
  send_worker: function(url){
    var sch = this;
    this.visited_urls++;
    var uri = { method: 'GET', url: url };
    console.log("Enviando request a " + url);
    this.request(uri, function(err, response, body){
      if (err){
        console.error(err);
      }
      var data = sch.worker.extract(body);
      sch.storage.save(url, data.info);
      sch.storage.add_urls(url, data.links);
      if(sch.goal > 0){
        while(next_url = sch.storage.next_url() && visited_urls < sch.goal){
          sch.send_worker(next_url);
        }
      }
      else{
        while(next_url = sch.storage.next_url()){
          sch.send_worker(next_url);
        }
      }
      console.log("Fin del thread de " + url);
    });
    return true;
  }
}

module.exports = Scheduler;
