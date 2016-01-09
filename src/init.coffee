# Modulo de inicio del scrapper de wikiquotes

# Aqui se define la estrategia en que se va recorriendo la pagina una por una:
#  - Se hace bastante logico manejar una estructura de datos que soporte bastante bien puede que un mongo lo haga bien.

cheerio = require "cheerio"
request = require "request"

url_corta = "https://es.wikiquote.org/wiki/Alceo_de_Mitilene"
url_larga = 'https://es.wikiquote.org/wiki/Agust%C3%ADn_de_Hipona'



worker = new (require('./worker-spider/wiki-quotes/wiki-quotes-spider'))(cheerio)
scheduler = new (require('./scheduler-spider/scheduler'))(request, worker, url_corta)
scheduler.start()
