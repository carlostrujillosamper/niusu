const puppeteer = require("puppeteer");
const chalk = require("chalk");
let fs = require("fs");

// MY OCD of colorful console.logs for debugging... IT HELPS
const error = chalk.bold.red;
const success = chalk.keyword("green");

(async () => {
  try {
    // open the headless browser
    let browser = await puppeteer.launch({ headless: true });
    // open a new page
    let page = await browser.newPage();
    // enter url in page
    await page.goto(`https://www.elpais.com/`);
    await page.waitForSelector("h2.headline");

    let news = await page.evaluate(() => {
      let headLine = document.querySelector(`h2.headline`);
      headlineLink = document.querySelector('h2.headline a')
      let description = document.querySelector(`p.description`);
      let allNews = []
      let frontPage = {}

      frontPage.headline = headLine.innerText.trim()
      frontPage.headlineLink = headlineLink.getAttribute('href')
      frontPage.description = description.innerText.trim()
      allNews.push(frontPage)
      
      return allNews;
    });
    // console.log(news);
    await browser.close();
    // Writing the news inside a json file
    fs.writeFile("news.json", JSON.stringify(news), function(err) {
      if (err) throw err;
      console.log("Saved!");
    });
    console.log(success("Browser Closed"));
  } catch (err) {
    // Catch and display errors
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
})();