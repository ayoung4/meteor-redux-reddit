import { compose } from 'recompose';

import { Providers as CurrentUserProviders } from 'Providers/CurrentUser';
import { Providers as FormProviders } from 'Providers/Form';

import { ISignUpFormData, ISignUpFormProps, SignUpForm } from 'Components/elements/SignUpForm';

const enhance = compose<ISignUpFormProps, {}>(
    CurrentUserProviders.withIsLoggedIn,
    FormProviders.withSignUpForm,
);

export const SignUpFormContainer = enhance(SignUpForm);
