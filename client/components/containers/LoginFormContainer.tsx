import { connect } from 'react-redux';
import { compose } from 'recompose';

import { Providers as CurrentUserProviders } from 'Providers/CurrentUser';
import { Providers as FormProviders } from 'Providers/Form';

import { ILoginFormProps, LoginForm } from 'Components/elements/LoginForm';

const enhance = compose<ILoginFormProps, {}>(
    CurrentUserProviders.withIsLoggedIn,
    FormProviders.withLoginForm,
);

export const LoginFormContainer = enhance(LoginForm);
