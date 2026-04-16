test('user cannot login with wrong password', async ({ page }) => {

  // Step 1: Go to the website
  await page.goto('https://www.saucedemo.com');

  // Step 2: Fill wrong credentials
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'wrong_password');

  // Step 3: Click login
  await page.click('#login-button');

  // Step 4: Check error message appears
  await expect(page.locator('.error-message-container')).toBeVisible();

  console.log('✅ Error message test passed!');

});