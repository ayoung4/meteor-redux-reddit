import * as _ from 'lodash';
import { IColor } from 'types';

export module LocalStorage {

    export const getAvatar = () => {
        const avatar = localStorage.getItem('avatar');
        if (!!avatar) {
            return JSON.parse(avatar) as IColor;
        } else {
            const newAvatar = {
                b: _.random(255),
                g: _.random(255),
                r: _.random(255),
            };
            localStorage.setItem('avatar', JSON.stringify(newAvatar));
            return newAvatar;
        }
    };

}
