import React from 'react';
import type { CodeListData, CodeListWithMetadata } from '../CodeListPage';
import { Accordion } from '@digdir/designsystemet-react';
import { StudioAlert } from '@studio/components';
import { EditCodeList } from './EditCodeList/EditCodeList';
import { Trans, useTranslation } from 'react-i18next';
import type { CodeListIdSource, CodeListReference } from '../types/CodeListReference';
import classes from './CodeLists.module.css';
import { getCodeListSourcesById, getCodeListUsageCount } from '../utils';
import type { TextResourceWithLanguage } from '../../../../../types/TextResourceWithLanguage';
import type { TextResources } from '../../../../../types/TextResources';

export type CodeListsProps = {
  codeListsData: CodeListData[];
  onDeleteCodeList: (codeListId: string) => void;
  onUpdateCodeListId: (codeListId: string, newCodeListId: string) => void;
  onUpdateCodeList: (updatedCodeList: CodeListWithMetadata) => void;
  onUpdateTextResource?: (textResource: TextResourceWithLanguage) => void;
  codeListInEditMode: string | undefined;
  codeListNames: string[];
  codeListsUsages: CodeListReference[];
  textResources?: TextResources;
};

export function CodeLists({
  codeListsData,
  codeListsUsages,
  ...rest
}: CodeListsProps): React.ReactElement[] {
  return codeListsData.map((codeListData) => {
    const codeListSources = getCodeListSourcesById(codeListsUsages, codeListData.title);
    return (
      <CodeList
        key={codeListData.title}
        codeListData={codeListData}
        {...rest}
        codeListSources={codeListSources}
      />
    );
  });
}

type CodeListProps = Omit<CodeListsProps, 'codeListsData' | 'codeListsUsages'> & {
  codeListData: CodeListData;
  codeListSources: CodeListIdSource[];
};

function CodeList({
  codeListData,
  codeListInEditMode,
  codeListSources,
  ...rest
}: CodeListProps): React.ReactElement {
  return (
    <Accordion border>
      <Accordion.Item defaultOpen={codeListInEditMode === codeListData.title}>
        <CodeListAccordionHeader
          codeListTitle={codeListData.title}
          codeListUsagesCount={getCodeListUsageCount(codeListSources)}
        />
        <CodeListAccordionContent
          codeListData={codeListData}
          codeListSources={codeListSources}
          {...rest}
        />
      </Accordion.Item>
    </Accordion>
  );
}

type CodeListAccordionHeaderProps = {
  codeListTitle: string;
  codeListUsagesCount: number;
};

function CodeListAccordionHeader({
  codeListTitle,
  codeListUsagesCount,
}: CodeListAccordionHeaderProps): React.ReactElement {
  const { t } = useTranslation();

  let codeListUsagesCountTextKey: string =
    'app_content_library.code_lists.code_list_accordion_usage_sub_title_plural';

  switch (codeListUsagesCount) {
    case 0: {
      codeListUsagesCountTextKey = null;
      break;
    }
    case 1: {
      codeListUsagesCountTextKey =
        'app_content_library.code_lists.code_list_accordion_usage_sub_title_single';
      break;
    }
  }

  return (
    <Accordion.Header
      title={t('app_content_library.code_lists.code_list_accordion_title', {
        codeListTitle: codeListTitle,
      })}
      className={classes.codeListTitle}
    >
      {codeListTitle}
      {codeListUsagesCountTextKey && (
        <div className={classes.codeListUsages}>
          {t(codeListUsagesCountTextKey, { codeListUsagesCount })}
        </div>
      )}
    </Accordion.Header>
  );
}

type CodeListAccordionContentProps = Omit<CodeListProps, 'codeListInEditMode'>;

function CodeListAccordionContent({
  codeListData,
  codeListSources,
  ...rest
}: CodeListAccordionContentProps): React.ReactElement {
  return (
    <Accordion.Content>
      {codeListData.hasError ? (
        <InvalidCodeListAlert />
      ) : (
        <EditCodeList
          codeList={codeListData.data}
          codeListTitle={codeListData.title}
          codeListSources={codeListSources}
          {...rest}
        />
      )}
    </Accordion.Content>
  );
}

function InvalidCodeListAlert(): React.ReactElement {
  return (
    <StudioAlert size='small' severity='danger'>
      <span>
        <Trans
          i18nKey='app_content_library.code_lists.format_error'
          components={{ bold: <strong /> }}
        />
      </span>
    </StudioAlert>
  );
}
