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


