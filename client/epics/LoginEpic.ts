import { ofType } from 'redux-observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { catchError, delay, filter, flatMap, map, mapTo, mergeMap } from 'rxjs/operators';
import { Utils } from '../Utils';

import { currentUserActionTypes } from 'Data/currentUser/constants';
import { subscriptionActionTypes } from 'Data/subscriptions/constants';
import { Observable } from 'rxjs/Observable';
// import {  } from 'Data/currentUser/actions';

const logAndPass = map((val) => {
    console.log(val);
    return val;
});

const withPayload = ({ payload }) => payload;

export const LoginEpic = (action$) => action$.pipe(
    ofType(currentUserActionTypes.LOG_IN),
    map(withPayload),
    mergeMap((payload) =>
        fromPromise(Utils.loginWithPassword(payload)).pipe(
            map((result) => ({ type: 'LOGIN_SUCCESS', payload: { result } })),
            catchError(({ error, reason }) => of({ type: 'LOGIN_ERROR', payload: { error, reason } })),
        ),
    ),
);

// export const SubscriptionEpic = (action$) => action$.pipe(
//     ofType(subscriptionActionTypes.START_SUBSCRIPTION),
//     map(withPayload),
//     mergeMap((payload) =>
//         Observable.create((observer) => {
//             Meteor.subscribe('messages.private', payload, () => {
//                 Tracker.autorun(() => {
//                     const messages = Messages.find({ chatId }).fetch();
//                     observer.next(messages);
//                 });
//             });
//         }),
//     ),
//     map((result) => ({ type: subscriptionActionTypes.SET_SUBSCRIPTION_READY })),
// );
