import React from 'react';
import type { IGenericEditComponent } from '../../../../../componentConfig';
import type { SelectionComponentType } from '../../../../../../../types/FormComponent';
import { useOptionListIdsQuery } from '../../../../../../../hooks/queries/useOptionListIdsQuery';
import { useAddOptionListMutation } from 'app-shared/hooks/mutations';
import { useTranslation } from 'react-i18next';
import { StudioFileUploader } from '@studio/components';
import { useStudioEnvironmentParams } from 'app-shared/hooks/useStudioEnvironmentParams';
import { FileNameErrorResult, FileNameUtils } from '@studio/pure-functions';
import type { AxiosError } from 'axios';
import type { ApiError } from 'app-shared/types/api/ApiError';
import { toast } from 'react-toastify';
import { isErrorUnknown } from 'app-shared/utils/ApiErrorUtils';

type EditOptionListProps<T extends SelectionComponentType> = {
  setComponentHasOptionList: (value: boolean) => void;
} & Pick<IGenericEditComponent<T>, 'component' | 'handleComponentChange'>;

export function OptionListUploader<T extends SelectionComponentType>({
  setComponentHasOptionList,
  component,
  handleComponentChange,
}: EditOptionListProps<T>) {
  const { t } = useTranslation();
  const { org, app } = useStudioEnvironmentParams();
  const { data: optionListIds } = useOptionListIdsQuery(org, app);
  const { mutate: uploadOptionList } = useAddOptionListMutation(org, app, {
    hideDefaultError: (error: AxiosError<ApiError>) => isErrorUnknown(error),
  });

  const handleOptionsIdChange = (optionsId: string) => {
    if (component.options) {
      delete component.options;
    }

    handleComponentChange({
      ...component,
      optionsId,
    });

    setComponentHasOptionList(true);
  };

  const onSubmit = (file: File) => {
    const fileNameError = FileNameUtils.findFileNameError(
      FileNameUtils.removeExtension(file.name),
      optionListIds,
    );
    if (fileNameError) {
      handleInvalidFileName(fileNameError);
    } else {
      handleUpload(file);
    }
  };

  const handleUpload = (file: File) => {
    uploadOptionList(file, {
      onSuccess: () => {
        handleOptionsIdChange(FileNameUtils.removeExtension(file.name));
        toast.success(t('ux_editor.modal_properties_code_list_upload_success'));
      },
      onError: (error: AxiosError<ApiError>) => {
        if (isErrorUnknown(error)) {
          toast.error(t('ux_editor.modal_properties_code_list_upload_generic_error'));
        }
      },
    });
  };

  const handleInvalidFileName = (fileNameError: FileNameErrorResult) => {
    switch (fileNameError) {
      case FileNameErrorResult.NoRegExMatch:
        return toast.error(t('validation_errors.file_name_invalid'));
      case FileNameErrorResult.FileExists:
        return toast.error(t('validation_errors.upload_file_name_occupied'));
    }
  };

  return (
    <StudioFileUploader
      accept='.json'
      variant={'tertiary'}
      uploaderButtonText={t('ux_editor.options.upload_title')}
      onSubmit={onSubmit}
    />
  );
}
