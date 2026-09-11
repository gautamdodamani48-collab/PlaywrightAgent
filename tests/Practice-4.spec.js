const {test, expect,request} = require('@playwright/test');
const { APIUtils } = require('../utils/APIutlis.js');
const { customTest } = require('../utils/fistures.js');

let webContext;

test.beforeAll('login bypass', async ({ browser }) => {
    const apiUtils=new APIUtils(browser);
    webContext=await apiUtils.getToken({browser});
});


customTest('fixture test', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('https://automationexercise.com/');



});