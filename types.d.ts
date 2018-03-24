declare interface IPost {
    _id?: string;
    title: string;
    text: string;
    created: Date;
    upVotes: number;
}

declare interface IComment {
    _id?: string;
    text: string;
    created: Date;
    postId: string;
}

declare interface IAction {
    type: string | number;
    payload: any;
    meta?: object;
    error?: Error;
}