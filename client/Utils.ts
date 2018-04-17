import * as _ from 'lodash';
import { Accounts } from 'meteor/accounts-base';
import { Reducer } from 'redux';
import SimpleSchema from 'simpl-schema';

export module Utils {

    // Validator Factory 

    interface IValidationContextError {
        name: string;
        value: string;
        type: string;
    }

    export const formValidator = (schema: SimpleSchema) => (values: object) => {

        const context = schema.newContext();
        const cleaned = context.clean(values, { autoConvert: true });

        context.validate(cleaned);

        if (!context.isValid()) {
            const errors: IValidationContextError[] = context.validationErrors();
            const badFieldNames = _.map(errors, (e) => e.name);
            const badFieldErrors = _.map(errors, (e) => e.type);
            return _.zipObject(badFieldNames, badFieldErrors);
        }

        return {};

    };

    // Promisified accounts services

    interface IAccountsResponse {
        success: boolean;
        message: string;
    }

    export const loginWithPassword = ({ username, password }: ICredentials) =>

        new Promise<IAccountsResponse>((resolve, reject) => {

            Meteor.loginWithPassword(username, password, (err, resp) => {
                if (!err) {
                    resolve(resp);
                }
                reject(err);
            });

        });

    export const createUser = ({ username, password }: ICredentials) =>

        new Promise<IAccountsResponse>((resolve, reject) => {

            Accounts.createUser({ username, password }, (err: Error, resp) => {
                const success = !err && !!resp;
                if (success) {
                    resolve(resp);
                }
                reject(err);
            });

        });

    // Reducer Factory

    interface IActionHandlerMap<S, A> {
        [name: string]: (state: S, action) => S;
    }

    type reducerFactory = <S, A>(initialState: S, actionMap: IActionHandlerMap<S, A>) => Reducer<S>;

    export const reducerOf: reducerFactory = (initialState, actionMap) => (state = initialState, action) =>
        (typeof actionMap[action.type] === 'function')
            ? actionMap[action.type](state, action)
            : state;

}
