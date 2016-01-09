# spider-funny-scrapper
Personal project to do scraping over different kinds of webs.

> Disclaimer: I'm a chilean guy with a little english problems so you are welcome to make corrections about lexical o sintactical error my english.

This project is maid in coffee script using the "extends" and classes things to make better all the things, I currently working over WikiQuotes, but you can extend the base classes to make yours own scrapper.

The project count with three main classes:
1. *The worker-spider:* The spider thats look over the webpage and process, an return a JSON object.
2. *The scheduler-spider:* The brain of the operation, this spider schedule and must know where the workers spider are.
3. *The stocker-spider:* The happy spider that stores the information that the workers process.
