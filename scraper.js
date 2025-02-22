const puppeteer = require('puppeteer');
const fs = require('fs').promises;

(async () => {

    // Scraping Earhart
    const url = 'https://dining.purdue.edu/menus/Earhart/';

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        console.log('Navigating to login page...');
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Wait for the page to fully load
        await page.waitForSelector('.mdl-layout__content', { visible: true });
        
        // // Print the entire HTML of the page
        // const pageHTML = await page.content(); // Retrieves the entire HTML content
        // console.log(pageHTML); // Print the HTML

        // await fs.writeFile('page.txt', pageHTML);

        
        // Wait for the meal section and its elements
        await page.waitForSelector('.mdl-layout__content', { visible: true });
        await page.waitForSelector('.meal', { visible: true });

        // Extract the meal content
        const meals = await page.evaluate(() => {
            const mealPage = document.querySelectorAll(".mdl-layout__content .meal .station");
            return Array.from(mealPage).map(mealPage => mealPage.outerHTML);
        });

        //console.log(meals); 
        //await fs.writeFile('meals.txt', meals);
        const mealString = JSON.stringify(meals, null, 2); 

        // Write the mealHref array to a file
        await fs.writeFile('meals.txt', mealString, (err) => {
            if (err) {
                console.error('Error writing to file', err);
            } else {
                console.log('Meals saved to meals.txt');
            }
        });

        const mealHref = await page.evaluate(() => {
            const mealHrefs = document.querySelectorAll(".mdl-layout__content .station-item");
            return Array.from(mealHrefs).map(mealHrefs => mealHrefs.href);
        });

        //console.log(mealHref);
        //await fs.writeFile('meal_hrefs.txt', mealHref);
        const mealHrefString = JSON.stringify(mealHref, null, 2); 

        // Write the mealHref array to a file
        await fs.writeFile('meal_hrefs.txt', mealHrefString, (err) => {
            if (err) {
                console.error('Error writing to file', err);
            } else {
                console.log('Meal Hrefs saved to meal_hrefs.txt');
            }
        });

        const mealDetails = await page.evaluate(() => {
            const mealDet = document.querySelectorAll(".mdl-layout__content .station-item-details");
            return Array.from(mealDet).map(mealDet => mealDet.outerHTML);
        });

        //console.log(mealDetails);
        //await fs.writeFile('meal_details.txt', mealDetails);
        const mealDetailsString = JSON.stringify(mealDetails, null, 2); 

        // Write the mealHref array to a file
        await fs.writeFile('meal_details.txt', mealDetailsString, (err) => {
            if (err) {
                console.error('Error writing to file', err);
            } else {
                console.log('Meal Details saved to meal_details.txt');
            }
        });

    } finally {
        await browser.close();
    }
})();
