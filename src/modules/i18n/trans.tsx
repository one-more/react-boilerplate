import * as React from 'react';
import { Trans as GenericTrans } from 'react-i18next';
import { memo } from 'react';
import { i18nKey } from './en';

type TransProps = {
    i18nKey: i18nKey;
};
export const Trans = memo(function Trans(props: TransProps): JSX.Element {
    return <GenericTrans {...props} />;
});
