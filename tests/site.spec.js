import { test, expect } from '@playwright/test';
test('homepage solution tabs switch the visible solution', async ({page}) => {
  await page.goto('./');
  await page.waitForFunction(() => window.runjianReady);
  const tabs = page.locator('.hyf_li');
  await tabs.nth(1).click();
  await expect(tabs.nth(1)).toHaveClass(/cur/);
  await expect(page.locator('.hyLi').nth(1)).toHaveClass(/cur/);
  await expect(page.locator('.hyLi').first()).not.toHaveClass(/cur/);
});
test('mobile navigation opens and closes', async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto('./');
  await page.waitForFunction(() => window.runjianReady);
  await page.locator('.nav-button').click();
  await expect(page.locator('.header .topNav')).toHaveClass(/active/);
  await page.keyboard.press('Escape');
  await expect(page.locator('.header .topNav')).not.toHaveClass(/active/);
});
test('search returns local product and news links', async ({page}) => {
  await page.goto('./globalSearch.html?keywords=Energy');
  await expect(page.locator('.local-search-results h1')).toHaveText('Search results for “Energy”');
  const results=page.locator('.local-search-results article a');
  await expect(results.first()).toBeVisible();
  const href=await results.first().getAttribute('href');
  expect(new URL(href).origin).toBe(new URL(page.url()).origin);
  await results.first().click();
  await page.waitForFunction(() => window.runjianReady);
});
test('contact form never claims an unconfigured enquiry was sent', async ({page}) => {
  await page.goto('./');
  await page.waitForFunction(() => window.runjianReady);
  await page.locator('.tc_but').first().click();
  const form=page.locator('form:visible').first();
  for(const field of await form.locator('input:not([type=hidden]),textarea').all()) await field.fill('Test enquiry');
  await form.locator('[class*="formBtn"]').click();
  await expect(form.locator('[role=status]')).toContainText('has not been sent');
});
test('nested product page initializes without script errors', async ({page}) => {
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto('./energy/1.html');
  expect(response.status()).toBe(200);
  await page.waitForFunction(()=>window.runjianReady);
  await page.waitForTimeout(250);
  expect(errors).toEqual([]);
});
