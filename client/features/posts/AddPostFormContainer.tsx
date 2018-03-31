import { IStoreState } from 'Client/Store';
import { Utils } from 'Client/Utils';
import { Posts } from 'Lib/Posts';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { branch, compose } from 'recompose';
import { Field, FormErrors, reduxForm, SubmissionError } from 'redux-form';
import SimpleSchema from 'simpl-schema';

import { AddPostForm, IAddPostFormData, IAddPostFormProps } from './AddPostForm';

const addPostFormSchema = new SimpleSchema({
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

const formOptions = {
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
    validate: Utils.formValidator(addPostFormSchema),
};

const enhance = compose<IAddPostFormProps, {}>(
    reduxForm(formOptions),
);

export const AddPostFormContainer = enhance(AddPostForm);
