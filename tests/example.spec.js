import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

test.describe('Assertions Practice', () => {

  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('check everything about inventory page', async ({ page }) => {
    // page assertions
    await expect(page).toHaveTitle('Swag Labs');
    await expect(page).toHaveURL(/inventory/);

    // element assertions
    await expect(page.locator('.inventory_list')).toBeVisible();
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    await expect(page.locator('.title')).toHaveText('Products');

    // negative assertion
    await expect(page.locator('[data-test="error"]')).not.toBeVisible();

    console.log('✅ All assertions passed!');
  });

});