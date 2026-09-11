class APIUtils
{
    constructor(browser)
    {
        this.browser=browser;
    }

    async getToken({browser})
    {
        const context = await this.browser.newContext();
    const page = await context.newPage();
    await page.goto('https://automationexercise.com/login',{
        waitUntil: 'domcontentloaded',timeout: 60000
    });
    
    
    await page.locator('input[data-qa="login-email"]').fill('kinaga4227@daugr.com');
    await page.locator('input[data-qa="login-password"]').fill('12345678');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await context.storageState({ path: 'auth.json' });
    let webContext = await this.browser.newContext({ storageState: 'auth.json' });
    return webContext;
    }
    


}
module.exports={APIUtils};