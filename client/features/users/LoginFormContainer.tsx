import * as _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, FormErrors, reduxForm } from 'redux-form';
import SimpleSchema from 'simpl-schema';
import { ILoginFormData, ILoginFormProps, LoginForm } from './LoginForm';

const formSchema = new SimpleSchema({
    password: {
        min: 7,
        type: String,
    },
    username: {
        max: 20,
        min: 5,
        type: String,
    },
});

class ValidationContextError {
    constructor(
        public name: string,
        public value: string,
        public type: string,
    ) { }
}

const formValidator = (schema: SimpleSchema) => (values: object) => {

    const context = formSchema.newContext();
    const cleaned = context.clean(values, { autoConvert: true });
    
    context.validate(cleaned);
    
    if (!context.isValid()) {
        const errors: ValidationContextError[] = context.validationErrors();
        const badFieldNames = _.map(errors, (e) => e.name);
        const badFieldErrors = _.map(errors, (e) => e.type);
        return _.zipObject(badFieldNames, badFieldErrors);
    }
    
    return {};

};

const withForm = reduxForm<ILoginFormData>({
    form: 'login',
    validate: formValidator(formSchema),
});

export const LoginFormContainer = connect(null, {
    onSubmit: ({ username, password }) => Meteor.loginWithPassword(username, password),
})(withForm(LoginForm));
