import { IStoreState } from 'Client/Store';
import { Utils } from 'Client/Utils';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { branch, compose } from 'recompose';
import { Field, FormErrors, reduxForm, SubmissionError } from 'redux-form';
import SimpleSchema from 'simpl-schema';

import { ISignUpFormData, SignUpForm } from './SignUpForm';

const formSchema = new SimpleSchema({
    password: {
        min: 7,
        type: String,
    },
    repeatPassword: {
        min: 7,
        type: String,
    },
    username: {
        max: 20,
        min: 5,
        type: String,
    },
});

const validateSchema = Utils.formValidator(formSchema);

const mapStateToProps = (state: IStoreState) => ({
    isLoggedIn: true,
});

const withForm = reduxForm<ISignUpFormData>({
    form: 'sign-up',
    onSubmit: async ({ username = '', password = '' }) => {
        const result = await Utils.createUser({ username, password });
        if (!result.success) {
            throw new SubmissionError({
                username: result.message,
            });
        }
    },
    validate: ({ password, repeatPassword, username }) => {
        const errs = validateSchema({ password, repeatPassword, username });
        if (!!password && !!repeatPassword && password !== repeatPassword) {
            return _.extend(errs, {
                password: 'passwords don\'t match',
            });
        }
        return errs;
    },
});

const withLoggedInData = connect(mapStateToProps);

export const SignUpFormContainer = withForm(withLoggedInData(SignUpForm));
