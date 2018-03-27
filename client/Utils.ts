import * as _ from 'lodash';
import { Accounts } from 'meteor/accounts-base';
import * as Promise from 'promise';
import SimpleSchema from 'simpl-schema';

export module Utils {

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

    interface IAccountsResponse {
        success: boolean;
        message: string;
    }

    export const loginWithPassword = ({ username, password }: ICredentials) =>

        new Promise<IAccountsResponse>((resolve, reject) => {

            Meteor.loginWithPassword(username, password, (err, resp) => {
                const success = !err && !!resp;
                if (success) {
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

}
