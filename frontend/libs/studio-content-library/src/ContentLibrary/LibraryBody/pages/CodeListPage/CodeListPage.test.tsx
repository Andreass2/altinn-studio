import React from 'react';
import type { RenderResult } from '@testing-library/react';
import { render, screen, within } from '@testing-library/react';
import type { CodeListData, CodeListPageProps } from './CodeListPage';
import { CodeListPage } from './CodeListPage';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event';
import { textMock } from '@studio/testing/mocks/i18nMock';
import {
  codeList1Data,
  codeList2Data,
  codeListDataList,
} from '../../../../test-data/codeListDataList';
import { ArrayUtils } from '@studio/pure-functions';

const onDeleteCodeList = jest.fn();
const onUpdateCodeListId = jest.fn();
const onUpdateCodeList = jest.fn();
const onUploadCodeList = jest.fn();
const defaultCodeListPageProps: CodeListPageProps = {
  codeListsData: codeListDataList,
  onDeleteCodeList,
  onUpdateCodeListId,
  onUpdateCodeList,
  onUploadCodeList,
  codeListsUsages: [],
};

describe('CodeListPage', () => {
  afterEach(jest.clearAllMocks);

  it('renders the codeList heading', () => {
    renderCodeListPage();
    const codeListHeading = screen.getByRole('heading', {
      name: textMock('app_content_library.code_lists.page_name'),
    });
    expect(codeListHeading).toBeInTheDocument();
  });

  it('renders a code list counter message', () => {
    renderCodeListPage();
    const codeListCounterMessage = screen.getByText(
      textMock('app_content_library.code_lists.code_lists_count_info_plural'),
    );
    expect(codeListCounterMessage).toBeInTheDocument();
  });

  it('renders code list actions', () => {
    renderCodeListPage();
    const codeListSearchField = screen.getByRole('searchbox');
    const codeListCreatButton = screen.getByRole('button', {
      name: textMock('app_content_library.code_lists.create_new_code_list'),
    });
    const codeListUploadButton = screen.getByRole('button', {
      name: textMock('app_content_library.code_lists.upload_code_list'),
    });
    expect(codeListSearchField).toBeInTheDocument();
    expect(codeListCreatButton).toBeInTheDocument();
    expect(codeListUploadButton).toBeInTheDocument();
  });

  it('renders the code list as a clickable element', () => {
    renderCodeListPage();
    const codeListAccordion = screen.getByRole('button', { name: codeList1Data.title });
    expect(codeListAccordion).toBeInTheDocument();
  });

  it('renders the code list accordion', () => {
    renderCodeListPage();
    const codeListAccordion = getCodeListHeading(codeList1Data.title);
    expect(codeListAccordion).toBeInTheDocument();
  });

  it('renders all code lists when search param matches all lists', async () => {
    const user = userEvent.setup();
    const codeListsSearchParam = 'code';
    renderCodeListPage();
    const searchInput = screen.getByRole('searchbox');
    await user.type(searchInput, codeListsSearchParam);
    ArrayUtils.mapByKey(codeListDataList, 'title').forEach((codeListTitle) => {
      expect(getCodeListHeading(codeListTitle)).toBeInTheDocument();
    });
  });

  it('renders the matching code lists when search param limits result', async () => {
    const user = userEvent.setup();
    const codeListsSearchParam = '2';
    renderCodeListPage();
    const searchInput = screen.getByRole('searchbox');
    await user.type(searchInput, codeListsSearchParam);
    expect(getCodeListHeading(codeList2Data.title)).toBeInTheDocument();
    expect(queryCodeListHeading(codeList1Data.title)).not.toBeInTheDocument();
  });

  it('opens the new code list accordion when the user has uploaded a code list', async () => {
    const user = userEvent.setup();
    const { rerender } = renderCodeListPage();
    const newCodeListData: CodeListData = {
      title: 'newCodeList',
      data: [{ value: 'value', label: 'label' }],
    };
    const newCodeListDataList: CodeListData[] = [
      ...defaultCodeListPageProps.codeListsData,
      newCodeListData,
    ];

    await uploadCodeList(user, newCodeListData.title);
    rerender(<CodeListPage {...defaultCodeListPageProps} codeListsData={newCodeListDataList} />);

    const openItem = screen.getByRole('button', { name: newCodeListData.title, expanded: true });
    expect(openItem).toBeInTheDocument();
  });

  it('calls onUpdateCodeListId when Id is changed', async () => {
    const user = userEvent.setup();
    renderCodeListPage();
    const additionalChars = 'abc';
    const idToChange = codeList1Data.title;

    const accordion = getCodeListAccordion(idToChange);
    const idButtonLabel = textMock('app_content_library.code_lists.code_list_edit_id_label');
    const codeListIdButton = within(accordion).getByRole('button', { name: idButtonLabel });
    await user.click(codeListIdButton);
    await user.keyboard(additionalChars);
    await user.tab();

    const expectedNewId = idToChange + additionalChars;
    expect(onUpdateCodeListId).toHaveBeenCalledTimes(1);
    expect(onUpdateCodeListId).toHaveBeenCalledWith(idToChange, expectedNewId);
  });

  it('calls onUpdateCodeList with new code list when code list is changed', async () => {
    const user = userEvent.setup();
    const newValueText = 'newValueText';
    renderCodeListPage();
    const accordion = getCodeListAccordion(codeList1Data.title);
    const codeListFirstItemValue = within(accordion).getByRole('textbox', {
      name: textMock('code_list_editor.value_item', { number: 1 }),
    });

    await user.type(codeListFirstItemValue, newValueText);
    await user.tab();

    expect(onUpdateCodeList).toHaveBeenCalledTimes(1);
    expect(onUpdateCodeList).toHaveBeenLastCalledWith({
      codeList: expect.arrayContaining([expect.objectContaining({ value: newValueText })]),
      title: codeList1Data.title,
    });
  });

  it('calls onUploadCodeList with the new code list when the user uploads a code list', async () => {
    const user = userEvent.setup();
    renderCodeListPage();
    await uploadCodeList(user, 'test');
    expect(onUploadCodeList).toHaveBeenCalledTimes(1);
    expect(onUploadCodeList).toHaveBeenCalledWith(expect.any(Object));
  });
});

const uploadCodeList = async (user: UserEvent, fileName: string): Promise<void> => {
  const fileUploaderButton = screen.getByLabelText(
    textMock('app_content_library.code_lists.upload_code_list'),
  );
  const file = new File(['test'], `${fileName}.json`, { type: 'application/json' });
  await user.upload(fileUploaderButton, file);
};

const getCodeListAccordion = (codeListTitle: string): HTMLElement =>
  // The following code accesses a node directly with parentElement. This is not recommended, hence the Eslint rule, but there is no other way to access the accordion element.
  // Todo: When we upgrade The Design System, we should use the new `Details` component with `getByRole('group')` instead. https://github.com/Altinn/altinn-studio/issues/14577
  getCodeListHeading(codeListTitle).parentElement; // eslint-disable-line testing-library/no-node-access

const getCodeListHeading = (codeListTitle: string): HTMLElement =>
  screen.getByRole('heading', { name: codeListTitle });

const queryCodeListHeading = (codeListTitle: string): HTMLElement =>
  screen.queryByRole('heading', { name: codeListTitle });

const renderCodeListPage = (props: Partial<CodeListPageProps> = {}): RenderResult =>
  render(<CodeListPage {...defaultCodeListPageProps} {...props} />);
