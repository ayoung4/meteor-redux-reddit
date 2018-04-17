import { Utils } from 'Client/Utils';
import { addPost } from 'Data/collections/actions';
import { login, signup, startlogin } from 'Data/currentUser/actions';
import { transition } from 'Data/router/actions';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import SimpleSchema from 'simpl-schema';

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
        onSubmit: async ({ password, username }, dispatch) => {
            dispatch(startlogin({
                password,
                username,
            }));
            // try {
            //     await 
            // } catch (e) {
            //     throw new SubmissionError({
            //         _error: e.reason || 'Login failed',
            //     });
            // }
        },
        onSubmitSuccess: (result, dispatch) => {
            // dispatch(transition({ pathname: '/' }));
        },
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
        onSubmit: async ({ password, username }: ICredentials, dispatch) => {
            try {
                const a = await dispatch(signup({ password, username }));
                console.log(a);
            } catch (e) {
                throw new SubmissionError({
                    _error: e.reason || 'Login failed',
                });
            }
        },
        // onSubmitSuccess: (result, dispatch) => {
        //     dispatch(transition({ pathname: '/' }));
        // },
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
            max: 280,
            min: 5,
            type: String,
        },
        title: {
            max: 140,
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
        onSubmit: async ({ text, title }, dispatch) => {
            try {
                await dispatch(addPost({ text, title } as { text: string, title: string; }));
            } catch (e) {
                throw new SubmissionError({
                    _error: e.reason || 'Adding Post Failed',
                });
            }
        },
        onSubmitSuccess: (result, dispatch) => {
            dispatch(transition({ pathname: '/' }));
        },
        validate: Utils.formValidator(AddPostFormSchema),
    });

}
