###
  Scraper for wikiquotes page
###
__ = require "underscore"
Worker = require "../worker.coffee"

class WikiQuotesSpider extends Worker
  constructor: (cheerio) ->
    super(cheerio, "wiki-quote-worker")

  extract: (html_data) ->
    $ = @cheerio.load html_data
    quotes =
      author: @get_page_info($)
      quotes: @extract_quotes($)
    data =
      info: quotes
      links: @get_links($)
    return data

  get_links: ($) ->
    __.map $('#mw-normal-catlinks ul li a'), (elem) ->
      elem.attribs.href

  get_page_info: ($) ->
    categories = $('#mw-normal-catlinks ul li a')
    title_elem = $("h1#firstHeading")
    description_elem = $("#mw-content-text p")[0]
    author =
      title: title_elem.text()
      categories: @extract_categories(categories)
      description: $(description_elem).text()
    return author

  extract_categories: (elems) ->
    __.map elems, (elem) ->
        rel_url: elem.attribs.href
        category: elem.children[0].data

  ###
    The structure of the element it's a kind of plain document with a sort of little order:

    There are blocks with a <h3> separation, between every "sub-category" of the quote:

    So the quotes document appears look like this:
    <h2></h2>
    <ul></ul>
    <h3></h3>
    <ul></ul>

    So the work here it's to look for the h3 and h2 elements that the content the context of the quotes metadata, and generate a
    tree like structure and put the quote in the leaf.

    Some quotes come with the refference-

  ###

  filtered_li_elems = (ul) ->
    __.filter ul, (li) ->
      li.name == 'li'

  references = ($,ul) ->
    __.map @filtered_li_elems(ul), (li) ->
      $(li).text()

  has_references = ($, li) ->
    try
      return $('ul',li) > 0
    catch error
      return false




  extract_quotes: ($) ->
    body_elems = $("#mw-content-text").children()
    description = ""
    context = ""
    quotes = []
    __.each body_elems, (elem) ->
      switch elem.name
        when 'p' then description = $(elem).text()
        when 'ul'
          __.each filtered_li_elems(elem.children), (li) ->
            quote = {}
            if has_references($, li)
              quote.text = li.data
              quote.references = references($('ul', li))
            else
              quote.text = $(li).text()
            if context
              quote.context = context
            quotes.push quote
        when 'h2'
          title = $(elem.children[0]).text()
        when 'h3'
          context = $(elem.children[0]).text()
        else console.log elem.name

    return quotes




module.exports = WikiQuotesSpider
