// tslint:disable:only-arrow-functions
import * as puppeteer from 'puppeteer';

interface IPageArgs {
    page: puppeteer.Page;
    browser: puppeteer.Browser;
}

type ElemFinder = () => Promise<puppeteer.ElementHandle>;

export const finderOf = (selector: string) => {
    return async function () {
        await this.page.waitForSelector(selector, { visible: true });
        return await this.page.$(selector);
    };
};

export abstract class Page {

    protected name: string;
    protected path: string;
    private screenshotIndex: number;
    private browser: puppeteer.Browser;
    private page: puppeteer.Page;

    constructor({ page, browser }: IPageArgs) {
        this.page = page;
        this.browser = browser;
        this.path = '/';
        this.name = 'unnamed';
        this.screenshotIndex = 0;
    }

    public async goTo() {
        await this.page.goto(`http://localhost:3000${this.path}`);
        await this.snapshot('page_loaded');
        return this;
    }

    public async snapshot(fileName: string) {
        await this.page.screenshot({
            fullPage: true,
            path: `tests/pages/screenshots/${this.name}_page_${++this.screenshotIndex}_${fileName}.png`,
        });
        return this;
    }

}
