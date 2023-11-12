# GoogleNewsScraper - NodeJS

GoogleNewsScraper is a Node.js module for scraping Google News search results. It utilizes Axios for making HTTP requests, Cheerio for parsing HTML, and Dateparser for parsing and manipulating dates.

### Installation

```
npm install axios cheerio dateparser
```

### Usage

```
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
```

### Search Apple in Google

```
[
  {
    title: 'Our top Thanksgiving dessert recipes, including pumpkin and apple pies',
    media: 'The Washington Post',
    date: '33 mins ago',
    datetime: 2023-11-12T14:37:42.811Z,
    desc: "We're playing the hits with pumpkin, pecan, apple, sweet potato and \n" +
      'cranberry pies, and serving up tart, cake and mousse dessert options, too.',
    link: 'https://www.washingtonpost.com/food/2023/11/12/thanksgiving-dessert-recipes-pumpkin-apple-pie/',
    img: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  },
  {
    title: 'Apple (AAPL) Plans Ambitious iOS 18 and macOS 15 Updates, Seeks to Squash Bugs',
    media: 'Bloomberg.com',
    date: '1 hour ago',
    datetime: 2023-11-12T14:10:42.812Z,
    desc: "Apple's recent software development delay underscores the need to get \n" +
      "ambitious 2024 updates right. Also: Initial thoughts on Apple's latest \n" +
      'MacBook Pros...',
    link: 'https://www.bloomberg.com/news/newsletters/2023-11-12/apple-aapl-plans-ambitious-ios-18-and-macos-15-updates-seeks-to-squash-bugs-lovjlsf6',
    img: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  },
  {
    title: 'Apple Maps very low 3D performance on Ventura/Sonoma on Intel Macs',
    media: 'MacRumors Forums',
    date: '1 hour ago',
    datetime: 2023-11-12T14:10:42.812Z,
    desc: 'Hi, The 3D performance of Maps in Ventura/Sonoma on Intel Macs is very low! \n' +
      'If you switch to 3D Satelite View (New York for example), dragging, \n' +
      'rotating...',
    link: 'https://forums.macrumors.com/threads/apple-maps-very-low-3d-performance-on-ventura-sonoma-on-intel-macs.2410757/',
    img: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  },
  {
    title: 'Apple enables spatial video recording with iOS 17.2 Beta 2 - GSMArena.com news',
    media: 'GSMArena.com',
    date: '2 hours ago',
    datetime: 2023-11-12T13:10:42.812Z,
    desc: 'Users will be able to view their spatial video recordings on the Apple \n' +
      "Vision Pro headset when it launches next year. This year's iPhone 15 Pro \n" +
      'and 15 Pro.',
    link: 'https://www.gsmarena.com/apple_enables_spatial_video_recording_with_ios_172_beta_2_-news-60553.php',
    img: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  },
  {
    title: 'Puff Pastry Apple Rings',
    media: 'Elavegan',
    date: '2 hours ago',
    datetime: 2023-11-12T13:10:42.812Z,
    desc: 'Puff pastry apple rings (donuts)- a perfect fall treat that tastes like \n' +
      "apple pie! They're vegan, optionally gluten-free, refined sugar-free.",
    link: 'https://elavegan.com/puff-pastry-apple-rings/',
    img: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  },
  {
    title: 'Apple prepares 12.9-inch iPad Air for early 2024 launch',
    media: 'AppleInsider',
    date: '2 hours ago',
    datetime: 2023-11-12T13:10:42.812Z,
    desc: "Apple's 2024 updates to its iPad lineup will include a new model of iPad \n" +
      'Air, claims a prominent Apple analyst, with a new 12.9-inch variant \n' +
      'supposedly on...',
    link: 'https://appleinsider.com/articles/23/11/12/apple-prepares-129-inch-ipad-air-for-early-2024-launch',
    img: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  },
  {
    title: 'Why Washington wants to treat Apple and Google like big banks',
    media: 'Yahoo Finance',
    date: '2 hours ago',
    datetime: 2023-11-12T13:10:42.813Z,
    desc: 'A new federal rule that would mean tougher oversight of Apple Pay and \n' +
      'Google Pay sets up another fight between Washington and Big Tech.',
    link: 'https://finance.yahoo.com/news/why-washington-wants-to-treat-apple-and-google-like-big-banks-124314913.html',
    img: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  },
  {
    title: "Michelle Obama's Apple Cobbler Recipe & Review",
    media: 'Parade',
    date: '2 hours ago',
    datetime: 2023-11-12T13:10:42.813Z,
    desc: 'Michelle Obama is known for many successful things, but rumor has it that \n' +
      'her special Apple Cobbler recipe may be somewhere near the top of that list.',
    link: 'https://parade.com/food/michelle-obamas-apple-cobbler-recipe-review',
    img: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  },
  {
    title: 'Apple CEO Tim Cook shares Diwali greetings with this flying lantern photo shot on iPhone',
    media: 'The Times of India',
    date: '3 hours ago',
    datetime: 2023-11-12T12:10:42.813Z,
    desc: 'Apple CEO Tim Cook has continued his tradition of sharing Diwali greetings \n' +
      'on social media. This year, he shared a photo taken on an iPhone by photogr.',
    link: 'https://timesofindia.indiatimes.com/gadgets-news/apple-ceo-tim-cook-shares-diwali-greetings-with-this-flying-lantern-photo-shot-on-iphone/articleshow/105167769.cms',
    img: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  },
  {
    title: 'Apple CEO Tim Cook tweets stunning pic taken by Indian iPhone user on Diwali',
    media: 'Hindustan Times',
    date: '3 hours ago',
    datetime: 2023-11-12T12:10:42.813Z,
    desc: "An individual reacted to Apple CEO Tim Cook's tweet on Diwali and \n" +
      'expressed, “Beautiful photograph! So cool!” | Trending.',
    link: 'https://www.hindustantimes.com/trending/apple-ceo-tim-cook-tweets-stunning-pic-taken-by-indian-iphone-user-on-diwali-101699788114659.html',
    img: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  }
]
```

### License

GoogleNewsScraper is available as open source under the terms of the [MIT License](https://opensource.org/license/mit/).

### Acknowledgements

- [Axios](https://github.com/axios/axios)
- [Cheerio](https://github.com/cheeriojs/cheerio)
- [Dateparser](https://github.com/HenrikJoreteg/DateParser)
