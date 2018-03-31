import { Utils } from 'Client/Utils';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, FormErrors, reduxForm } from 'redux-form';
import SimpleSchema from 'simpl-schema';

import { IStoreState } from 'Client/Store';
import { ILoginFormData, ILoginFormProps, LoginForm } from './LoginForm';

import * as React from 'react';
import { InputField } from 'react-semantic-redux-form';
import { Button, Dimmer, Form, Loader } from 'semantic-ui-react';

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

const formOptions = {
    form: 'login',
    onSubmit: async ({ username, password }) => await Utils.loginWithPassword({ username, password }),
    validate: Utils.formValidator(formSchema),
};

const enhance = compose<ILoginFormProps, {}>(
    connect(mapStateToProps),
    reduxForm<ILoginFormData, ILoginFormProps>(formOptions),
);

export const LoginFormContainer = enhance(LoginForm);
