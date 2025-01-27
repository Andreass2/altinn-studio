import { useTranslation } from 'react-i18next';
import type {
  CodeListEditorTexts,
  CodeListItemTextProperty,
  TextResourceInputTexts,
} from '@studio/components';

export function useOptionListEditorTexts(): CodeListEditorTexts {
  const { t } = useTranslation();
  const textResourceTexts = useTextResourceTexts();

  return {
    add: t('code_list_editor.add_option'),
    codeList: t('code_list_editor.legend'),
    delete: t('code_list_editor.column_title_delete'),
    deleteItem: (number: number) => t('code_list_editor.delete_code_list_item', { number }),
    description: t('code_list_editor.column_title_description'),
    emptyCodeList: t('code_list_editor.empty'),
    generalError: t('code_list_editor.general_error'),
    helpText: t('code_list_editor.column_title_help_text'),
    itemDescription: (number: number) => t('code_list_editor.description_item', { number }),
    itemHelpText: (number: number) => t('code_list_editor.help_text_item', { number }),
    itemLabel: (number: number) => t('code_list_editor.label_item', { number }),
    itemValue: (number: number) => t('code_list_editor.value_item', { number }),
    label: t('code_list_editor.column_title_label'),
    textResourceTexts,
    value: t('code_list_editor.column_title_value'),
    valueErrors: {
      duplicateValue: t('code_list_editor.duplicate_values_error'),
    },
  };
}

function useTextResourceTexts(): (
  number: number,
  property: CodeListItemTextProperty,
) => TextResourceInputTexts {
  const { t } = useTranslation();
  const prefix = 'code_list_editor.text_resource';
  return (number: number, property: CodeListItemTextProperty) => ({
    editValue: t(`${prefix}.${property}.edit_mode`, { number }),
    emptyResourceList: t(`${prefix}.empty_list`),
    idLabel: t(`${prefix}.id_label`),
    search: t(`${prefix}.${property}.search_mode`, { number }),
    textResourcePickerLabel: t(`${prefix}.${property}.select`, { number }),
    noTextResourceOptionLabel: t(`${prefix}.no_text_resource_option_label`),
    valueLabel: t(`${prefix}.${property}.value`, { number }),
  });
}
