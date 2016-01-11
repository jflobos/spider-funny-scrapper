/*
  Storage Prototype
*/

__ = require("underscore");
URL = require("url");

var Storage = function(){
  this.data = [];
  this.urls = [];
  this.past_urls = {};
}

Storage.prototype = {
  save: function(url, elem){
    this.past_urls[url] = true;
    this.data.push(elem);
  },
  next_url: function(){
    try{
      var url = this.urls.pop();
      this.past_urls[url] = false;
      return url;
    }
    catch(error){
      console.error(error);
      return undefined;
    }
  },
  add_urls: function(url, new_urls){
    var vm = this;
    __.each(new_urls, function(new_url){
      new_url = vm.url_create(url, new_url);
      if(vm.past_urls[new_url] == undefined){
        vm.urls.push(new_url);
      }
    })
  },
  url_create: function(url, new_url){
    var new_url = URL.parse(new_url);
    console.log(JSON.stringify(new_url, null, 2));
    if(new_url.protocol !== null){
      return new_url.href;
    }
    var url = URL.parse(url);
    return url.protocol + "//" + url.hostname + new_url.pathname;
  }
}

module.exports = Storage;
