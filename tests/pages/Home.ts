import * as puppeteer from 'puppeteer';

import { finderOf, Page } from './Page';

export class HomePage extends Page {

    private findPosts = finderOf('.post');

    constructor({ page, browser }) {
        super({ page, browser });
        this.path = '/';
        this.name = 'home';
    }

    public async getPosts() {
        const posts = await this.findPosts();
        return posts;
    }

}
