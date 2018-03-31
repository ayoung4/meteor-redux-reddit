declare interface IPost {
    _id: string;
    title: string;
    text: string;
    created: Date;
    upVotes: number;
}

declare interface IComment {
    _id: string;
    text: string;
    created: Date;
    postId: string;
}

declare interface IUser {
    _id: string;
    username: string;
    avatar?: IColor;
}

declare interface IColor {
    r: number;
    g: number;
    b: number;
} 

declare interface ICredentials {
    username: string;
    password: string;
}

declare interface IAction<PayloadType=any, MetaType=any> {
    type: string | number;
    payload: PayloadType;
    meta?: MetaType;
    error?: Error;
}

declare type subscriptionArgs = object;

declare interface ISubscriptionProps {
    subscriptions: ISubscriptionMap;
    dispatch: (ISubscriptionAction) => any;
}

declare interface ISubscriptionState {
    isReady: boolean;
    handle: Meteor.SubscriptionHandle;
    computation: Tracker.Computation;
}

declare interface ISubscriptionMap {
    [subName: string]: ISubscriptionState;
}

declare module 'meteor/react-meteor-data' {
    export const withTracker: (autorun: (props: any) => any) => any;
}