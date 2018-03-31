import { compose } from 'recompose';

import { AddPostForm, IAddPostFormProps } from 'Components/elements/AddPostForm';
import { Providers } from 'Providers/Form';

const enhance = compose<IAddPostFormProps, {}>(
    Providers.withAddPostForm,
);

export const AddPostFormContainer = enhance(AddPostForm);
