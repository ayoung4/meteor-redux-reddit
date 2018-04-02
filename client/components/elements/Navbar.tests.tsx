// tslint:disable:only-arrow-functions
import * as chai from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { INavbarProps, Navbar, testIds } from './Navbar';

enzyme.configure({ adapter: new Adapter() });

describe('Navbar Presentation', function () {

    it('navbar renders logged in state', function () {

        const props: INavbarProps = {
            currentUser: {
                avatar: {
                    b: 0,
                    g: 0,
                    r: 0,
                },
                isLoggedIn: true,
                username: 'someone',
            },
            location: '/',
        };

        const navbar = enzyme.shallow(<Navbar {...props} />);
        chai.expect(navbar.exists()).to.equal(true);

        const username = navbar.find(`#${testIds.username}`);
        chai.expect(username.exists()).to.equal(true);
        chai.expect(username.text()).to.equal(props.currentUser.username);

    });

});
