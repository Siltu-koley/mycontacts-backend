const asyncHandler = require("express-async-handler");
const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const fs1 = require("fs");


//@route GET /api
//@access public
const webData = asyncHandler(async (req, res) => {
    res.status(200).json({message:"Teat web data api"});
});

//@route POST /api
//@access public
const getdata = asyncHandler(async (req, res) => {
    console.log("The request body is : ", req.body);
    const{ search_data } = req.body;
    if(!search_data) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }

    const browser = await puppeteer.launch({
        headless: true, // Must be true for Ubuntu server
        executablePath: "/usr/bin/chromium-browser",
        args: ["--no-sandbox"],
        ignoreDefaultArgs: ["--enable-automation"],
        // args: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage']
      });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
    const navigationPromise = page.waitForNavigation({ waitUntil: "load" });
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.3904.108 Safari/537.36"
    );
    await page.setDefaultNavigationTimeout(0);

    //Initialise
    await page.goto("https://www.w3schools.com/");
    await delay(getRandomWait()); //Waiting to Fetch the name.
      await page.waitForSelector("#search2");
      await page.type("#search2", `${search_data}`, {
        delay: getRandomValue(),
      });

      await navigationPromise;
      await delay(getRandomWait())

      
      await Promise.all([page.click("#learntocode_searchbtn"), page.waitForNavigation()]);
      
      const profilepagetitle = await page.evaluate(() => document.title);
      console.log(profilepagetitle);
      const emailtext = await page.evaluate(() => {
        const srcs = Array.from(document.querySelectorAll(".w3-sidebar a")).map(
          x => x.textContent
        );
        return srcs;
      });
      console.log(emailtext);
      res.status(200).json({data:emailtext});
});

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

function getRandomValue() {
  let x = Math.floor(Math.random() * 30 + 100);
  return x;
}

function getRandomWait() {
  let y = Math.floor(Math.random() * 1000 + 2000);
  return y;
}

function getRandomLongWait() {
    let y = Math.floor(Math.random() * 4000 + 6000);
    return y;
}

module.exports = { webData,getdata };