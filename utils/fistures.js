const base = require("@playwright/test");


exports.customTest = base.test.extend(
    {
        authenticatedPage: async ({ browser }, use) => 
            {
                const context = await browser.newContext();
                const page = await context.newPage();
                await page.goto('https://automationexercise.com/login');
                await page.locator('input[data-qa="login-email"]').fill('kinaga4227@daugr.com');
                await page.locator('input[data-qa="login-password"]').fill('12345678');
                await page.getByRole('button', { name: 'Login' }).click();
                await use(page);
               
            },
            createOrder: async ({}, use) => {
        }
   
   }
 );