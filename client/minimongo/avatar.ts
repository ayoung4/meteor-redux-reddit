import * as _ from 'lodash';

export const avatarFromLocalData = () => {
    const avatar = localStorage.getItem('avatar');
    return !!avatar ? JSON.parse(avatar) : undefined;
};

export const newAvatarInLocalData = () => {
    const randomRgb = {
        b: _.random(255),
        g: _.random(255),
        r: _.random(255),
    };
    localStorage.setItem('avatar', JSON.stringify(randomRgb));
    return randomRgb;
};
