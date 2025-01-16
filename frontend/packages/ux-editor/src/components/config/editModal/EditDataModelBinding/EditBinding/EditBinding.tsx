import React from 'react';
import type { FormItem } from '../../../../../types/FormItem';
import classes from './EditBinding.module.css';
import { Fieldset } from '@digdir/designsystemet-react';
import { SelectDataModelBinding } from './SelectDataModelBinding';
import { SelectDataFieldBinding } from './SelectDataFieldBinding';
import {
  getMaxOccursFromDataModelFields,
  getMinOccursFromDataModelFields,
  getXsdDataTypeFromDataModelFields,
  type InternalBindingFormat,
} from '@altinn/ux-editor/utils/dataModelUtils';
import { useAppContext } from '@altinn/ux-editor/hooks';
import type { UpdateFormMutateOptions } from '@altinn/ux-editor/containers/FormItemContext';
import { EditBindingButtons } from './EditBindingButtons';
import { useValidDataModels } from '@altinn/ux-editor/hooks/useValidDataModels';
import { StudioSpinner } from '@studio/components';
import { useTranslation } from 'react-i18next';
import { formItemConfigs } from '@altinn/ux-editor/data/formItemConfig';

export type EditBindingProps = {
  bindingKey: string;
  component: FormItem;
  helpText: string;
  label: string;
  handleComponentChange: (component: FormItem, mutateOptions?: UpdateFormMutateOptions) => void;
  onSetDataModelSelectVisible: (visible: boolean) => void;
  internalBindingFormat: InternalBindingFormat;
};

export const EditBinding = ({
  bindingKey,
  component,
  helpText,
  label,
  handleComponentChange,
  onSetDataModelSelectVisible,
  internalBindingFormat,
}: EditBindingProps) => {
  const { t } = useTranslation();
  const { selectedFormLayoutSetName, updateLayoutsForPreview } = useAppContext();
  const { dataModelMetadata, isLoadingDataModels } = useValidDataModels(
    internalBindingFormat.dataType,
  );

  const handleBindingChange = (updatedBinding?: InternalBindingFormat) => {
    const selectedDataFieldElement = updatedBinding?.field;

    const value =
      updatedBinding ??
      formItemConfigs[component.type]?.defaultProperties?.['dataModelBindings']?.[bindingKey];

    const dataModelBindings = { ...component.dataModelBindings };
    if (value === undefined || value === null) {
      delete dataModelBindings[bindingKey];
    } else {
      dataModelBindings[bindingKey] = value;
    }

    handleComponentChange(
      {
        ...component,
        dataModelBindings: Object.keys(dataModelBindings).length ? dataModelBindings : undefined,
        required: getMinOccursFromDataModelFields(selectedDataFieldElement, dataModelMetadata),
        timeStamp: getXsdDataTypeFromDataModelFields(
          component.type,
          selectedDataFieldElement,
          dataModelMetadata,
        ),
        maxCount: getMaxOccursFromDataModelFields(
          component.type,
          selectedDataFieldElement,
          dataModelMetadata,
        ),
      } as FormItem,
      {
        onSuccess: async () => {
          await updateLayoutsForPreview(selectedFormLayoutSetName, true);
        },
      },
    );
  };

  return (
    <Fieldset legend={label} className={classes.editBinding} size='small'>
      {isLoadingDataModels ? (
        <StudioSpinner
          showSpinnerTitle={false}
          spinnerTitle={t('ux_editor.modal_properties_loading')}
        />
      ) : (
        <>
          <SelectDataModelBinding
            currentDataModel={internalBindingFormat.dataType}
            handleBindingChange={handleBindingChange}
            bindingKey={bindingKey}
          />
          <SelectDataFieldBinding
            internalBindingFormat={internalBindingFormat}
            handleBindingChange={handleBindingChange}
            bindingKey={bindingKey}
            helpText={helpText}
            componentType={component.type}
          />
          <EditBindingButtons
            handleBindingChange={handleBindingChange}
            onSetDataModelSelectVisible={onSetDataModelSelectVisible}
          />
        </>
      )}
    </Fieldset>
  );
};
