import { Utils } from 'Client/Utils';
import * as _ from 'lodash';
import { reduxForm, SubmissionError } from 'redux-form';
import SimpleSchema from 'simpl-schema';
import { ICredentials } from 'types';

export module Providers {

    const CredentialsSchema = new SimpleSchema({
        password: {
            min: 7,
            type: String,
        },
        username: {
            max: 30,
            min: 5,
            type: String,
        },
    });

    export const withLoginForm = reduxForm<ICredentials, ICredentials>({
        form: 'login',
        onSubmit: async ({ username, password }) => await Utils.loginWithPassword({ username, password }),
        validate: Utils.formValidator(CredentialsSchema),
    });

    const SignUpSchema = CredentialsSchema.extend({
        repeatPassword: {
            min: 7,
            type: String,
        },
    });

    const validateSignUpData = Utils.formValidator(SignUpSchema);

    export interface ISignUpFormData {
        username: string;
        password: string;
        repeatPassword: string;
    }

    export const withSignUpForm = reduxForm<ISignUpFormData, ISignUpFormData>({
        form: 'sign-up',
        onSubmit: async ({ username, password }) => {
            try {
                await Utils.createUser({ username, password });
            } catch (err) {
                throw new SubmissionError(err);
            }
        },
        validate: ({ password, repeatPassword, username }) => {
            const errs = validateSignUpData({ password, repeatPassword, username });
            const hasErrs = _.keys(errs).length > 0;
            if (!hasErrs && password !== repeatPassword) {
                return {
                    repeatPassword: 'passwords don\'t match',
                };
            }
            return errs;
        },
    });

    const AddPostFormSchema = new SimpleSchema({
        text: {
            max: 140,
            min: 5,
            type: String,
        },
        title: {
            max: 40,
            min: 5,
            type: String,
        },
    });

    export interface IAddPostFormData {
        text: string;
        title: string;
    }

    export const withAddPostForm = reduxForm<IAddPostFormData>({
        form: 'add-post',
        onSubmit: ({ text, title }) => new Promise((resolve, reject) => {
            Meteor.call('posts.insert', text, title, (err, resp) => {
                const success = !err && !!resp;
                if (success) {
                    resolve(resp);
                } else {
                    reject(new SubmissionError(err));
                }
            });
        }),
        validate: Utils.formValidator(AddPostFormSchema),
    });

}
