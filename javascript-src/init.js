var cheerio = require("cheerio");
var request = require("request");

var url_corta = "https://es.wikiquote.org/wiki/Alceo_de_Mitilene";
var url_larga = 'https://es.wikiquote.org/wiki/Agust%C3%ADn_de_Hipona';

var worker = new (require("./worker/wiki-quotes/wiki-quote-worker"))(cheerio);
var scheduler = new (require("./scheduler/scheduler"))(request, worker,[url_corta]);

scheduler.start();
