import { Locator, Page } from "@playwright/test";

export class LoginPage {
 
    private page: Page;
    private usernameInput: Locator;
    private userpasswordInput: Locator;
    private submitButton: Locator;
    private errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.usernameInput = page.locator('[data-test="username"]');
        this.userpasswordInput = page.locator('[data-test="password"]');
        this.submitButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async goTo(): Promise<void>{
        await this.page.goto('/')
    }

    async login(email: string, password: string): Promise<void> {
        await this.usernameInput.fill(email);
        await this.userpasswordInput.fill(password);
        await this.submitButton.click();
    }

    async getErrorMessage(): Promise<string | null> {
        return await this.errorMessage.textContent();
    }
}