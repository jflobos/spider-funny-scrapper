/*
  Object prototype
*/
"use strict"

function Worker(cheerio){
  this.cheerio = cheerio;
}

Worker.prototype = {
  extract: function(html_data){
    var data = {
      info: {},
      links: []
    };
    return data;
  }
}

module.exports = Worker;
