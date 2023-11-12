const axios = require('axios');
const cheerio = require('cheerio');
const dateparser = require('dateparser');

class GoogleNewsScraper {
    constructor(lang = "en", period = "", start = "", end = "", encode = "utf-8", region = null) {
        this.lang = lang;
        this.period = period;
        this.start = start;
        this.end = end;
        this.encode = encode;
        this.region = region;
        this.texts = [];
        this.links = [];
        this.results = [];
        this.totalcount = 0;
        this.user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
        this.headers = { 'User-Agent': this.user_agent };

        if (region) {
            this.headers['Accept-Language'] = `${lang}-${region},${lang};q=0.9`;
        }
    }

    setLang(lang) {
        this.lang = lang;
    }

    setPeriod(period) {
        this.period = period;
    }

    setTimeRange(start, end) {
        this.start = start;
        this.end = end;
    }

    setEncode(encode) {
        this.encode = encode;
    }

    setjQuery(dollar) {
        this.dollar = dollar;
    }

    setResults(results) {
        this.results = results;
    }

    async asyncSearch(key) {
        this.key = encodeURIComponent(key.split(" ").join("+"));
        return await this.getPage();
    }

    async getPage(page = 1) {
        return new Promise(async (resolve, reject) => {
          try {
            await this.pageAt(page);

            // Resolve the promise with the results
            resolve(this.results);
          } catch (error) {
            reject(error);
          }
        });
    }

    async buildResponse() {
        const url = this.url.replace("search?", `search?hl=${this.lang}&gl=${this.lang}&`);

        try {
            // Add a short delay before making the request
            // await new Promise(resolve => setTimeout(resolve, 1000));

            const response = await axios.get(url, { headers: this.headers });
            const $ = cheerio.load(response.data);

            this.setjQuery($);

            const stats = $('#result-stats');
            if (stats.length > 0) {
                const count = stats.text().match(/[\d,]+/);
                this.totalcount = count ? parseInt(count[0].replaceAll(',', '')) : 0;
            } else {
                return;
            }

            return $('a[data-ved]');
        } catch (error) {
            console.error(error);
        }
    }

    async pageAt(page = 1) {
        try {
            if (this.start !== "" && this.end !== "") {
                this.url = `https://www.google.com/search?q=${this.key}&lr=lang_${this.lang}&biw=1920&bih=976&source=lnt&&tbs=lr:lang_1${this.lang},cdr:1,cd_min:${this.start},cd_max:${this.end},sbd:1&tbm=nws&start=${10 * (page - 1)}`;
            } else if (this.period !== "") {
                this.url = `https://www.google.com/search?q=${this.key}&lr=lang_${this.lang}&biw=1920&bih=976&source=lnt&&tbs=lr:lang_1${this.lang},qdr:${this.period},,sbd:1&tbm=nws&start=${10 * (page - 1)}`;
            } else {
                this.url = `https://www.google.com/search?q=${this.key}&lr=lang_${this.lang}&biw=1920&bih=976&source=lnt&&tbs=lr:lang_1${this.lang},sbd:1&tbm=nws&start=${10 * (page - 1)}`;
            }
        } catch (error) {
            console.error(error);
            throw new Error("You need to run a search() before using getPage().");
        }

        const result = await this.buildResponse();
        const results = [];
        if (result) {
          result.each((_, item) => {
              try {
                  const tmpText = this.dollar(item).find('div[role="heading"]').text().replace("\n", "");
                  const tmpLink = this.dollar(item).attr('href');
                  const tmpMedia = this.dollar(item).find('g-img').parent().text();
                  const tmpDate = this.dollar(item).find('div[role="heading"]').next().next().next().text();
                  const [tmpDateValue, _] = this.lexicalDateParser(tmpDate);
                  const tmpDesc = this.dollar(item).find('div[role="heading"]').next().text();
                  const tmpImg = this.dollar(item).find('g-img img').attr('src');

                  this.texts.push(tmpText);
                  this.links.push(tmpLink);
                  if (tmpText == '') return

                  results.push({
                      title: tmpText,
                      media: tmpMedia,
                      date: tmpDateValue,
                      datetime: this.defineDate(tmpDateValue),
                      desc: tmpDesc,
                      link: tmpLink,
                      img: tmpImg
                  });
              } catch (error) {
                  console.error(error);
              }
          });
        } else {
          console.error("No results found.");
        }

        this.setResults(results)
    }

    lexicalDateParser(dateToCheck) {
        if (dateToCheck == '') return ['', null];

        let datetimeTmp = null;
        let dateTmp = dateToCheck;

        try {
            dateTmp = dateTmp.substring(dateTmp.lastIndexOf('..') + 2);
            datetimeTmp = dateparser.parse(dateTmp);
        } catch (error) {
            dateTmp = null;
            datetimeTmp = null;
        }

        if (datetimeTmp === null) {
            dateTmp = dateToCheck;
        } else {
            datetimeTmp = datetimeTmp.replace();
        }

        if (dateTmp[0] === ' ') {
            dateTmp = dateTmp.substring(1);
        }

        return [dateTmp, datetimeTmp];
    }

    defineDate(date) {
        const months = { 'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12 };
        try {
            if (date.toLowerCase().includes(' ago')) {
                const q = parseInt(date.split(' ')[0]);
                if (date.toLowerCase().includes('minutes') || date.toLowerCase().includes('mins')) {
                    return new Date(Date.now() - q * 60000);
                } else if (date.toLowerCase().includes('hour')) {
                    return new Date(Date.now() - q * 3600000);
                } else if (date.toLowerCase().includes('day')) {
                    return new Date(Date.now() - q * 86400000);
                } else if (date.toLowerCase().includes('week')) {
                    return new Date(Date.now() - q * 7 * 86400000);
                } else if (date.toLowerCase().includes('month')) {
                    return new Date(Date.now() - q * 30.44 * 86400000);
                }
            } else if (date.toLowerCase().includes('yesterday')) {
                return new Date(Date.now() - 86400000);
            } else {
                for (const month in months) {
                    if (date.toLowerCase().includes(month + ' ')) {
                        const dateList = date.replace(',', '').split(' ').slice(-3);
                        return new Date(dateList[2], months[month] - 1, dateList[1]);
                    }
                }
            }
        } catch (error) {
            console.error(error);
            return NaN;
        }
    }
}

module.exports = GoogleNewsScraper;