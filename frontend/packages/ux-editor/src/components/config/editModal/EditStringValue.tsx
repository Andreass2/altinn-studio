import React, { type ReactElement } from 'react';
import type { IGenericEditComponent } from '../componentConfig';
import { useTranslation } from 'react-i18next';
import { FormField } from '../../FormField';
import { Combobox, Textfield } from '@digdir/designsystemet-react';
import { useComponentPropertyLabel } from '../../../hooks/useComponentPropertyLabel';
import { useComponentPropertyEnumValue } from '@altinn/ux-editor/hooks/useComponentPropertyEnumValue';
import { StudioNativeSelect } from '@studio/components';
import { useComponentPropertyHelpText } from '../../../hooks';

const NO_VALUE_SELECTED_IN_NATIVE_SELECT: string = 'NO_VALUE';

export interface EditStringValueProps extends IGenericEditComponent {
  propertyKey: string;
  enumValues?: string[];
  multiple?: boolean;
}

export const EditStringValue = ({
  component,
  handleComponentChange,
  propertyKey,
  enumValues,
  multiple,
}: EditStringValueProps): ReactElement => {
  const { t } = useTranslation();
  const componentPropertyLabel = useComponentPropertyLabel();
  const componentEnumValue = useComponentPropertyEnumValue();
  const componentPropertyHelpText = useComponentPropertyHelpText();

  const handleValueChange = (newValue): void => {
    handleComponentChange({
      ...component,
      [propertyKey]: newValue,
    });
  };

  return (
    <FormField
      id={component.id}
      label={componentPropertyLabel(propertyKey)}
      value={component[propertyKey]}
      onChange={handleValueChange}
      propertyPath={`${component.propertyPath}/properties/${propertyKey}`}
      helpText={componentPropertyHelpText(propertyKey)}
      customValidationMessages={(errorCode: string) => {
        if (errorCode === 'pattern') {
          return t('validation_errors.pattern');
        }
      }}
      renderField={({ fieldProps }) =>
        enumValues ? (
          multiple ? (
            <Combobox
              label={fieldProps.label}
              value={fieldProps.value?.length > 0 ? fieldProps.value : []}
              onValueChange={(values) => fieldProps.onChange(values)}
              id={`component-${propertyKey}-select${component.id}`}
              multiple
              size='sm'
            >
              {enumValues.map((value) => (
                <Combobox.Option key={value} value={value}>
                  {componentEnumValue(value)}
                </Combobox.Option>
              ))}
            </Combobox>
          ) : (
            <StudioNativeSelect
              label={fieldProps.label}
              value={fieldProps?.value}
              onChange={(e) => {
                const newVal = e.target.value;
                fieldProps.onChange(
                  newVal === NO_VALUE_SELECTED_IN_NATIVE_SELECT ? undefined : newVal,
                );
              }}
              id={`component-${propertyKey}-select${component.id}`}
              size='sm'
            >
              <NoValueSelectOption />
              <SelectOptions enumOptionsList={enumValues} componentEnumValue={componentEnumValue} />
            </StudioNativeSelect>
          )
        ) : (
          <Textfield
            {...fieldProps}
            id={`component-id-input${component.id}`}
            onChange={(e) => fieldProps.onChange(e.target.value, e)}
          />
        )
      }
    />
  );
};

const NoValueSelectOption = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <option value={NO_VALUE_SELECTED_IN_NATIVE_SELECT}>
      {t('ux_editor.edit_component.no_value_selected_for_select')}
    </option>
  );
};

type SelectOptionsProps = {
  enumOptionsList: string[];
  componentEnumValue: (value: string) => string;
};
const SelectOptions = ({
  enumOptionsList,
  componentEnumValue,
}: SelectOptionsProps): ReactElement[] => {
  return enumOptionsList.map((value) => (
    <option key={value} value={value}>
      {componentEnumValue(value)}
    </option>
  ));
};
