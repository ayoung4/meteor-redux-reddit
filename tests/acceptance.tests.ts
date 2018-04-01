// tslint:disable:only-arrow-functions
import * as faker from 'faker'; 
import * as puppeteer from 'puppeteer';
import { AddPostPage } from './pages/AddPost';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';

describe('Acceptance Tests', async function () {

    let browser: puppeteer.Browser;
    let page: puppeteer.Page;

    beforeEach(async function () {

        browser = await puppeteer.launch({
            // headless: false,
            slowMo: 25,
        });
        [page] = await browser.pages();

    });

    afterEach(async function () {

        await browser.close();

    });

    this.timeout(30000);

    describe('Login page', async function () {

        it('can log in', async function () {

            const loginPage = new LoginPage({ page, browser });

            await loginPage.goTo();
            await loginPage.login({
                password: 'password',
                username: 'admin',
            });

        });

    });

    describe('Add Post page', async function () {

        it('can add post', async function () {

            const addPostPage = new AddPostPage({ page, browser });

            await addPostPage.goTo();
            await addPostPage.addPost({
                text: faker.lorem.sentences(4),
                title: faker.lorem.sentence(),
            });

        });

    });

    describe('Home page', async function () {

        it('can display posts', async function () {

            const homePage = new HomePage({ page, browser });

            await homePage.goTo();

        });

    });

});
