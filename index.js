const GoogleNewsScraper = require('./GoogleNewsScraper');

const googleNews = new GoogleNewsScraper();

// Set search parameters
googleNews.setLang("en");
googleNews.setEncode("utf-8");

// Perform an asynchronous search
googleNews.asyncSearch('Apple').then(results => {
    console.log(results);
}).catch(error => {
    console.error(error);
});