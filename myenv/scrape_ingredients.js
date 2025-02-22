let ingred = [];
let nutrition = [];

const puppeteer = require('puppeteer');
const fs = require('fs');

fs.readFile('meal_hrefs.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  
  const mealHref = JSON.parse(data);

  console.log(mealHref);

  
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        for (let i = 0; i < mealHref.length; i++) {
            const url2 = mealHref[i];
    
            console.log('Navigating to item page...');
            await page.goto(url2, { waitUntil: 'networkidle2' });
    
            
            await page.waitForSelector('.nutrition-ingredient-list', { visible: true }).catch(() => {});

            const ingredientsList = await page.evaluate(() => {
                const list = document.querySelector(".nutrition-ingredient-list");
                return list ? list.outerHTML : "null";
            });

            const nutritionFacts = await page.evaluate(() => {
                const table = document.querySelector(".nutrition-table").querySelectorAll(".nutrition-table-row");
                return Array.from(table).map(table => table.outerHTML);
            });

            ingred.push(ingredientsList);

            nutrition.push(nutritionFacts);
    
            //console.log(ingredientsList);

            //console.log(nutritionFacts);
            
            //console.log(url2);
        }

        //console.log(ingred);
        const ing = JSON.stringify(ingred, null, 2); 

        await fs.writeFile('ingredients.txt', ing, (err) => {
            if (err) {
                console.error('Error writing to file', err);
            } else {
                console.log('Meals saved to ingredients.txt');
            }
        });

        //console.log(nutrition);
        const nutr = JSON.stringify(nutrition, null, 2); 

        await fs.writeFile('nutrition.txt', nutr, (err) => {
            if (err) {
                console.error('Error writing to file', err);
            } else {
                console.log('Meals saved to nutrition.txt');
            }
        });

        browser.close();
    } finally {
        await browser.close();
    }
  })();
});