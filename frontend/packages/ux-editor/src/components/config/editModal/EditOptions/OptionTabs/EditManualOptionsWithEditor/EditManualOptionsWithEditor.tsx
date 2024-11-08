import React, { useRef } from 'react';
import classes from '../../EditOptions.module.css';
import { StudioCodeListEditor, StudioModal, StudioProperty } from '@studio/components';
import type { Option } from 'app-shared/types/Option';
import { useTranslation } from 'react-i18next';
import { useCodeListButtonValue, useCodeListEditorTexts } from '../hooks';
import type { EditManualOptionsProps } from '../EditManualOptions';

export function EditManualOptionsWithEditor({
  component,
  handleComponentChange,
}: EditManualOptionsProps) {
  const { t } = useTranslation();
  const manualOptionsModalRef = useRef<HTMLDialogElement>(null);
  const buttonValue = useCodeListButtonValue(component.options);
  const editorTexts = useCodeListEditorTexts();

  const handleOptionsChange = (options: Option[]) => {
    if (component.optionsId) {
      delete component.optionsId;
    }

    handleComponentChange({
      ...component,
      options,
    });
  };

  return (
    <>
      <StudioProperty.Button
        onClick={() => manualOptionsModalRef.current.showModal()}
        property={t('ux_editor.modal_properties_code_list_custom_list')}
        value={buttonValue}
      />
      <StudioModal.Dialog
        ref={manualOptionsModalRef}
        className={classes.manualTabDialog}
        closeButtonTitle={t('general.close')}
        heading={t('ux_editor.modal_add_options_codelist')}
      >
        <StudioCodeListEditor
          codeList={component.options ?? []}
          onChange={(codeList) => handleOptionsChange(codeList)}
          texts={editorTexts}
        />
      </StudioModal.Dialog>
    </>
  );
}
