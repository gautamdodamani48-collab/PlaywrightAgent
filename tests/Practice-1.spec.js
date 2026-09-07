const {test,expect}=require('@playwright/test');

test.only('Practice-1',async({page})=>{
await page.goto('https://www.saucedemo.com');

await page.locator("#user-name").fill("standard_user");
await page.locator("#password").fill("secret_sauce");
await page.locator(".btn_action").click();
await page.locator(".inventory_item_name").first().waitFor();
const allItems=await page.locator(".inventory_item");
const itemCount=await allItems.count();
for(let i=0;i<itemCount;i++){
   await allItems.nth(i).getByText("Add to cart").click();
};
await page.locator(".shopping_cart_link").click();
await page.locator(".cart_item").first().waitFor();
await page.locator(".cart_item").filter({hasText:"sauce labs backpack"}).getByText("Remove").click();
await page.getByRole('button', { name: 'Checkout' }).click();
await page.locator("#first-name").fill("John");
await page.locator("#last-name").fill("Doe");
await page.locator("#postal-code").fill("12345");
await page.getByRole('button', { name: 'Continue' }).click();
await page.getByRole('button', { name: 'Finish' }).click();
await page.pause();
});