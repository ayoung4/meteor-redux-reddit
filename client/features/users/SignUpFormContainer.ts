import { IStoreState } from 'Client/Store';
import { Utils } from 'Client/Utils';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { branch, compose } from 'recompose';
import { Field, FormErrors, reduxForm, SubmissionError } from 'redux-form';
import SimpleSchema from 'simpl-schema';
import { userActionTypes } from './constants';
import { signUp } from './actions';

import { ISignUpFormData, SignUpForm, ISignUpFormProps } from './SignUpForm';

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
    isLoggedIn: false,
});

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: ({ username, password }) => dispatch(
            signUp({
                username,
                password,
                handleError: (err) => console.log('err', err),
                handleSuccess: (res) => console.log('res', res),
            })),
    };
};

const withForm = reduxForm<ISignUpFormData, ISignUpFormProps>({
    form: 'sign-up',
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

const form = withForm(SignUpForm);

export const withRedux = connect(mapStateToProps, mapDispatchToProps);

export const SignUpFormContainer = withRedux(withForm(SignUpForm));
