const {test, expect} = require('@playwright/test');

let webContext;
test.beforeAll('login bypass', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://automationexercise.com/login',{
        waitUntil: 'domcontentloaded',timeout: 60000
    });
    
    
    await page.locator('input[data-qa="login-email"]').fill('kinaga4227@daugr.com');
    await page.locator('input[data-qa="login-password"]').fill('12345678');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await context.storageState({ path: 'auth.json' });
    webContext = await browser.newContext({ storageState: 'auth.json' });
});

test('login', async () => {
    const page = await webContext.newPage();
    await page.goto('https://automationexercise.com/');
    
}   );

test('add to cart', async () => {
    const page = await webContext.newPage();
    await page.goto('https://automationexercise.com/');
    const products =  page.locator('.features_items .single-products');
    
    const productCount = await products.count();
    for (let i = 0; i < productCount; i++) {
        const product=await products.nth(i);
        await product.locator('a.add-to-cart').first().click();
        await page.getByRole('button', { name: 'Continue Shopping' }).click();
    }  
    await page.getByText(' Cart').first().click();
    await page.locator('#cart_info_table').waitFor();
    const cartdelete=await page.locator('.cart_delete');    
    while(await cartdelete.count()>1){
        await cartdelete.nth(0).click();
    }
    await page.pause();
});

test('place order', async () => {
    const page = await webContext.newPage();
    await page.goto('https://automationexercise.com/');
    await page.locator('.features_items').filter({ hasText: 'Men Tshirt' }).locator('a.add-to-cart').first().click();
await page.getByRole('button', { name: 'Continue Shopping' }).click();
await page.getByText(' Cart').first().click();
await page.getByText('Proceed To Checkout').click();
}
);


