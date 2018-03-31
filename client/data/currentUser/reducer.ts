import { Utils } from 'Client/Utils';
import { LocalStorage } from 'Services/LocalStorage';

import { currentUserActionTypes } from './constants';

const initialState: ICurrentUserState = {
    avatar: LocalStorage.getAvatar(),
    isLoggedIn: false,
    username: 'anonymous',
};

export const currentUserReducer = Utils.reducerOf<ICurrentUserState, currentUserActionTypes>(
    initialState,
    {
        [currentUserActionTypes.SET_CURRENT_USER]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
);
