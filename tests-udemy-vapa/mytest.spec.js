const { test, expect } = require('@playwright/test');

// test('Browser context playwright test', async ({ browser, page }) => {

  
//  const context = await browser.newContext();
//   const page = await context.newPage();
//   await page.goto("https://rahulshettyacademy.com/loginpagePractise");
//   console.log("Page Title: "+await page.title());
//   await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

// });

test("login test", async ({ page, browser }) => {
       await page.goto("https://google.com");
   console.log("Page Title: "+await page.title());
   await expect(page).toHaveTitle("Google");
   await page.pause

});

// test('first playwright test', async ({ page }) => {

//   await page.goto("https://google.com");
//   console.log("Page Title: "+await page.title());
//   await expect(page).toHaveTitle("Google");
//await page.pause

// });
