import { IStoreState } from 'Client/Store';
import { Utils } from 'Client/Utils';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { branch, compose } from 'recompose';
import { Field, FormErrors, reduxForm, SubmissionError } from 'redux-form';
import SimpleSchema from 'simpl-schema';
import { signUp } from './actions';
import { userActionTypes } from './constants';

import { ISignUpFormData, ISignUpFormProps, SignUpForm } from './SignUpForm';

const signUpFormSchema = new SimpleSchema({
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

const validateSchema = Utils.formValidator(signUpFormSchema);

const mapStateToProps = (state: IStoreState) => ({
    isLoggedIn: state.loggedInUser.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: ({ username, password }) => dispatch(
        signUp({
            handleError: (err) => console.log('err', err),
            handleSuccess: (res) => console.log('res', res),
            password,
            username,
        })),
});

const formOptions = {
    form: 'sign-up',
    validate: ({ password, repeatPassword, username }) => {
        const errs = validateSchema({ password, repeatPassword, username });
        const hasErrs = _.keys(errs).length > 0;
        if (!hasErrs && password !== repeatPassword) {
            return {
                password: 'passwords don\'t match',
            };
        }
        return errs;
    },
};

const enhance = compose<ISignUpFormProps, {}>(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm<ISignUpFormData, ISignUpFormProps>(formOptions),
);

export const SignUpFormContainer = enhance(SignUpForm);
