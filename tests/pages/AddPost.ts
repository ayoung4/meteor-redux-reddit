import * as puppeteer from 'puppeteer';

import { finderOf, Page } from './Page';

export class AddPostPage extends Page {

    private findTitle = finderOf('input[type="text"]');
    private findText = finderOf('textarea');
    private findSubmit = finderOf('button[type="submit"]');

    constructor({ page, browser }) {
        super({ page, browser });
        this.path = '/add/post';
        this.name = 'add_post';
    }

    public async addPost({ title, text }: Partial<IPost>) {

        const titleInput = await this.findTitle();
        const textInput = await this.findText();
        const submit = await this.findSubmit();

        await titleInput.click();
        await titleInput.type(title);
        await this.snapshot('typed_title');
        
        await textInput.click();
        await textInput.type(text);
        await this.snapshot('typed_some_text');

        await submit.click();
        await this.snapshot('clicked_submit');

        return this;
    }

}
