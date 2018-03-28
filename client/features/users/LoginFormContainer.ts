import { Utils } from 'Client/Utils';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, FormErrors, reduxForm, SubmissionError } from 'redux-form';
import SimpleSchema from 'simpl-schema';

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
    isLoggedIn: false,
});

const withForm = reduxForm<ILoginFormData>({
    form: 'login',
    onSubmit: async ({ username = '', password = '' }) => {
        const result = await Utils.loginWithPassword({ username, password });
        if (!result.success) {
            throw new SubmissionError({
                password: result.message,
            });
        }
    },
    validate: Utils.formValidator(formSchema),
});

const withLoggedInData = connect(mapStateToProps);

export const LoginFormContainer = withForm(withLoggedInData(LoginForm));

// const enhance = compose(withForm, withLoggedInState);
// export const LoginFormContainer = enhance(LoginForm);
