import { Utils } from 'Client/Utils';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, FormErrors, reduxForm, SubmissionError } from 'redux-form';
import SimpleSchema from 'simpl-schema';
import { logIn } from './actions';

import { IStoreState } from 'Client/Store';
import { ILoginFormData, ILoginFormProps, LoginForm } from './LoginForm';

const formSchema = new SimpleSchema({
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

const mapStateToProps = (state: IStoreState) => ({
    isLoggedIn: state.loggedInUser.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: ({ username, password }) => dispatch(
        logIn({
            handleError: (err) => console.log('err', err),
            handleSuccess: (res) => console.log('res', res),
            password,
            username,
        })),
});

const formOptions = {
    form: 'login',
    validate: Utils.formValidator(formSchema),
};

const enhance = compose<ILoginFormProps, {}>(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm<ILoginFormData>(formOptions),
);

export const LoginFormContainer = enhance(LoginForm);
