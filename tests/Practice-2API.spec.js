const {test, expect,request} = require('@playwright/test');
let token;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.post('https://automationexercise.com/api/verifyLogin', 
        {
       form: {
            email: 'kinaga4227@daugr.com',
            password: '12345678'
        }
    });
    console.log('Response status:', response.status());
    console.log('Response body:', await response.text());
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    token = await responseBody.token;
    console.log('Token:', token);
    await apiContext.dispose();
}
);     

test('Practice-2', async ({ page }) => {
   
    await page.addInitScript(token => {
        window.localStorage.setItem('token', token);
        
    }, token);
     await page.goto('https://automationexercise.com/');
await page.pause();
});