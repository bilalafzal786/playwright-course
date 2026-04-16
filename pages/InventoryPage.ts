import { Locator, Page } from "@playwright/test";

export class InventoryPage {
    private page: Page;
    private inventoryListContainer: Locator;
    private inventoryProduct: Locator;
    constructor(page: Page) {
        this.page = page
        this.inventoryListContainer = page.locator('[data-test="inventory-list"]');
        this.inventoryProduct = page.locator('[data-test="inventory-item"]');
    }

    async getProductCount(): Promise<number>  {
        return await this.inventoryProduct.count();
    }

    async isProductListVisible(): Promise<boolean> {
       return await this.inventoryListContainer.isVisible()
    }

    
}