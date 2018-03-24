export const logger = ({ dispatch, getState }) => (next) => (action) => {
    console.log(action);
    return next(action);
};
