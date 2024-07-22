import React from 'react';
import { StudioProperty, StudioSpinner } from '@studio/components';
import { LinkIcon } from '@studio/icons';
import classes from './DefinedBinding.module.css';
import { useTranslation } from 'react-i18next';
import {
  getDataModelFields,
  validateSelectedDataField,
  type InternalBindingFormat,
} from '@altinn/ux-editor/utils/dataModelUtils';
import type { ComponentType } from 'app-shared/types/ComponentType';
import { useValidDataModels } from '@altinn/ux-editor/hooks/useValidDataModels';

export type DefinedBindingProps = {
  onClick: () => void;
  label: string;
  internalBindingFormat: InternalBindingFormat;
  componentType: ComponentType;
  bindingKey: string;
};

export const DefinedBinding = ({
  onClick,
  label,
  internalBindingFormat,
  componentType,
  bindingKey,
}: DefinedBindingProps) => {
  const { t } = useTranslation();
  const title = t('right_menu.data_model_bindings_edit', { binding: label });
  const { field: currentDataModelField, dataType: currentDataModel } = internalBindingFormat;
  const { dataModelMetadata, isDataModelValid, isLoadingDataModels } =
    useValidDataModels(currentDataModel);

  if (isLoadingDataModels) {
    return (
      <StudioSpinner
        showSpinnerTitle={false}
        spinnerTitle={t('ux_editor.modal_properties_loading')}
      />
    );
  }

  const dataModelFields = getDataModelFields({ componentType, bindingKey, dataModelMetadata });
  const isFieldValid = validateSelectedDataField(currentDataModelField, dataModelFields);

  const isBindingError = !isFieldValid || !isDataModelValid;

  const value = (
    <span className={classes.selectedOption}>
      <LinkIcon /> <span className={classes.currentLinkedDataModel}>{currentDataModelField}</span>
    </span>
  );

  return (
    <StudioProperty.Button
      className={`${isBindingError ? classes.error : ''}`}
      aria-label={title}
      onClick={onClick}
      property={label}
      title={title}
      value={value}
    />
  );
};
