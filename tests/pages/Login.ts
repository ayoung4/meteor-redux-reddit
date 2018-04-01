import * as puppeteer from 'puppeteer';

import { finderOf, Page } from './Page';

export class LoginPage extends Page {

    private findPassword = finderOf('input[type="password"]');
    private findSubmit = finderOf('button[type="submit"]');
    private findUsername = finderOf('input[type="text"]');

    constructor({ page, browser }) {
        super({ page, browser });
        this.path = '/login';
        this.name = 'login';
    }

    public async login({ username, password }: ICredentials) {

        const usernameInput = await this.findUsername();
        const passwordInput = await this.findPassword();
        const submit = await this.findSubmit();

        await usernameInput.click();
        await usernameInput.type(username);
        await this.snapshot('typed_username');

        await passwordInput.click();
        await passwordInput.type(password);
        await this.snapshot('typed_password');

        await submit.click();
        await this.snapshot('clicked_submit');

        return this;
    }

}
