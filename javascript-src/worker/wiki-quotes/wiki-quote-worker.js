/*
  Scrapper for wikiquotes
*/

__ = require("underscore");
Worker = require ("../worker.js");

WikiQuoteWorker = Worker;

WikiQuoteWorker.prototype = {
  extract: function(html_data){
    $ = this.cheerio.load(html_data);
    var quotes = {
      author: this.get_page_info($),
      quotes: this.extract_quotes($)
    }
    return {
      info: {
        author: this.get_page_info($),
        quotes: this.extract_quotes($)
      },
      links: this.get_links($)
    }
  },
  get_links: function($){
    __.map($('#mw-normal-catlinks ul li a'), function(elem){
      return elem.attribs.href;
    });
  },
  get_page_info: function($){
    var categories = $('#mw-normal-catlinks ul li a');
    var title_elem = $("h1#firstHeading");
    var description_elem = $("#mw-content-text p")[0];
    return {
      title: title_elem.text(),
      categories: this.extract_categories(categories),
      description: $(description_elem).text()
    };
  },
  extract_categories: function(elems){
    __.map(elems, function(elem){
        return{
          rel_url: elem.attribs.href,
          category: elem.children[0].data
        }
    });
  },
  filtered_li_elems: function(ul){
    __.filter(ul, function(li){
      return li.name == 'li'
    });
  },
  references: function($, ul){
    __.map(this.filtered_li_elems(ul), function(li){
      return $(li).text();
    });
  },
  has_references: function($, li){
    try{
      return true;
    }
    catch(error){
      return false;
    }
  },
  extract_quotes: function($){
    var body_elems = $("#mw-content-text").children();
    var description = "";
    var context = "";
    var quotes = [];
    __.each(body_elems, function(elem){
      switch(elem.name){
        case 'p':
          description = $(elem).text();
          break;
        case 'ul':
          __.each(filtered_li_elems(elem.children), function(li){
            quote = {};
            if (this.has_references($, li)){
              quote.text = li.data;
              quote.references = this.references($('ul', li));
            }
            else{
              quote.text =  $(li).text();
            }
            if (context){
              quote.context = context;
            }
          });
          break;
        case 'h2':
          title = $(elem.children[0]).text();
          break;
        case 'h3':
          context = $(elem.children[0]).text();
          break;
        default:
          console.log(elem.name);
      }
    });
  }
}

module.exports = WikiQuoteWorker
