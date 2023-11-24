import React from 'react';
import { Textfield, TextfieldProps } from '@digdir/design-system-react';
import { useTranslation } from 'react-i18next';

type RepoNameInputProps = {
  repoName?: string;
  errorMessage?: string;
} & TextfieldProps;

export const RepoNameInput = ({ repoName, errorMessage, name }: RepoNameInputProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <Textfield
        name={name}
        id='service-saved-name'
        label={t('general.service_name')}
        defaultValue={repoName}
        error={errorMessage}
      />
      <p>
        {t('dashboard.service_saved_name_description')}{' '}
        <strong style={{ fontWeight: '500' }}>
          {t('dashboard.service_saved_name_description_cannot_be_changed')}
        </strong>
      </p>
    </div>
  );
};
