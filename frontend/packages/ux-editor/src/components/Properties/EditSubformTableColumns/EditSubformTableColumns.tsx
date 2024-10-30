import React, { type ReactElement, type ReactNode } from 'react';
import classes from './EditSubformTableColumns.module.css';
import { StudioButton, StudioHeading } from '@studio/components';
import { useTranslation } from 'react-i18next';
import { type IGenericEditComponent } from '../../config/componentConfig';
import { type ComponentType } from 'app-shared/types/ComponentType';
import { type TableColumn } from './types/TableColumn';
import { filterOutTableColumn, updateComponentWithSubform } from './utils';
import { useUniqueKeys } from '@studio/hooks';
import { ColumnElement } from './ColumnElement';
import { useSubformLayoutValidation } from './hooks/useSubformLayoutValidation';
import { SubformMissingContentWarning } from './SubformMissingContentWarning/SubformMissingContentWarning';

export type EditSubformTableColumnsProps = IGenericEditComponent<ComponentType.Subform>;

export const EditSubformTableColumns = ({
  component,
  handleComponentChange,
}: EditSubformTableColumnsProps): ReactElement => {
  const { t } = useTranslation();
  var subformLayoutIsConfigured = useSubformLayoutValidation(component.layoutSet);

  const tableColumns: TableColumn[] = component?.tableColumns ?? [];
  const { getUniqueKey, addUniqueKey, removeUniqueKey } = useUniqueKeys({
    numberOfKeys: tableColumns.length,
  });

  const handleAddColumn = () => {
    addUniqueKey();
    const updatedComponent = updateComponentWithSubform(component, [
      { headerContent: '', cellContent: { query: '', default: '' } },
    ]);
    handleComponentChange(updatedComponent);
  };

  const deleteColumn = (tableColumnToRemove: TableColumn, index: number) => {
    const updatedColumns: TableColumn[] = filterOutTableColumn(tableColumns, tableColumnToRemove);
    removeUniqueKey(index);
    handleComponentChange({ ...component, tableColumns: updatedColumns });
  };

  const editColumn = (tableColumn: TableColumn, position: number) => {
    const updatedColumns = [...tableColumns];
    updatedColumns[position] = tableColumn;
    handleComponentChange({ ...component, tableColumns: updatedColumns });
  };

  if (subformLayoutIsConfigured === false) {
    return (
      <EditSubformTableColumnsWrapper>
        <SubformMissingContentWarning subformLayoutSetName={component.layoutSet} />
      </EditSubformTableColumnsWrapper>
    );
  }

  return (
    <EditSubformTableColumnsWrapper>
      {tableColumns.length > 0 &&
        tableColumns.map((tableColum: TableColumn, index: number) => (
          <ColumnElement
            key={getUniqueKey(index)}
            tableColumn={tableColum}
            columnNumber={index + 1}
            onDeleteColumn={() => deleteColumn(tableColum, index)}
            onEdit={(updatedTableColumn: TableColumn) => editColumn(updatedTableColumn, index)}
          />
        ))}
      <StudioButton color='second' className={classes.addColumnButton} onClick={handleAddColumn}>
        {t('ux_editor.properties_panel.subform_table_columns.add_column')}
      </StudioButton>
    </EditSubformTableColumnsWrapper>
  );
};

type EditSubformTableColumnsWrapperProps = {
  children: ReactNode;
};

const EditSubformTableColumnsWrapper = ({ children }: EditSubformTableColumnsWrapperProps) => {
  const { t } = useTranslation();
  return (
    <div className={classes.wrapper}>
      <StudioHeading size='2xs' level={2}>
        {t('ux_editor.properties_panel.subform_table_columns.heading')}
      </StudioHeading>
      <div className={classes.contentWrapper}>{children}</div>
    </div>
  );
};
