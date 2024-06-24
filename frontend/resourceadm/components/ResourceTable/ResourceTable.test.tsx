import React from 'react';
import { render, screen } from '@testing-library/react';
import type { ResourceTableProps } from './ResourceTable';
import { ResourceTable } from './ResourceTable';
import type { ResourceListItem } from 'app-shared/types/ResourceAdm';
import { textMock } from '@studio/testing/mocks/i18nMock';
import userEvent from '@testing-library/user-event';

const resource1Title = 'tittel 1';
const mockResourceListItem1: ResourceListItem = {
  title: { nb: resource1Title, en: '', nn: '' },
  createdBy: 'John Doe',
  lastChanged: new Date('2023-08-28'),
  identifier: 'resource-1',
  environments: ['gitea'],
};
const resource2Title = 'tittel 2';
const mockResourceListItem2: ResourceListItem = {
  title: { nb: resource2Title, en: '', nn: '' },
  createdBy: 'John Doe',
  lastChanged: new Date('2023-08-29'),
  identifier: 'resource-2',
  environments: ['gitea', 'tt02', 'prod'],
};
const resource3Title = 'tittel 3';
const mockResourceListItem3: ResourceListItem = {
  title: { nb: resource3Title, en: '', nn: '' },
  createdBy: 'John Doe',
  lastChanged: null,
  identifier: 'resource-3',
  environments: ['at22'],
};
const mockResourceList: ResourceListItem[] = [
  mockResourceListItem1,
  mockResourceListItem2,
  mockResourceListItem3,
];

describe('ResourceTable', () => {
  const mockOnClickEditResource = jest.fn();
  const mockOnClickImportResource = jest.fn();

  const defaultProps: ResourceTableProps = {
    list: mockResourceList,
    onClickEditResource: mockOnClickEditResource,
    onClickImportResource: mockOnClickImportResource,
  };

  it('toggles sort order when header is clicked', async () => {
    const user = userEvent.setup();
    render(<ResourceTable {...defaultProps} />);

    const listItemsBeforeSort = screen.getAllByRole('row').map((row) => row.textContent);
    const sortButton = screen.getByRole('button', {
      name: textMock('resourceadm.dashboard_table_header_name'),
    });

    expect(sortButton).toBeInTheDocument();

    await user.click(sortButton); // click twice; default sort is same as default order
    await user.click(sortButton);

    const listItemsAfterSort = screen.getAllByRole('row').map((row) => row.textContent);

    expect(listItemsAfterSort).not.toEqual(listItemsBeforeSort);
  });

  it('displays resource title', () => {
    render(<ResourceTable {...defaultProps} />);

    const titleCell = screen.getByText(mockResourceListItem1.title['nb']);
    expect(titleCell).toBeInTheDocument();
  });

  it('displays default resource title when title is missing', () => {
    render(
      <ResourceTable
        {...defaultProps}
        list={[{ ...mockResourceListItem3, title: { nb: '', nn: '', en: '' } }]}
      />,
    );

    const titleCell = screen.getByText(textMock('resourceadm.dashboard_table_row_missing_title'));
    expect(titleCell).toBeInTheDocument();
  });

  it('displays created by', () => {
    render(<ResourceTable {...defaultProps} />);

    const [createdByCell] = screen.getAllByText(mockResourceListItem1.createdBy);
    expect(createdByCell).toBeInTheDocument();
  });

  it('displays last changed date', () => {
    render(<ResourceTable {...defaultProps} />);

    const lastChangedCell = screen.getByText('28.08.2023');
    expect(lastChangedCell).toBeInTheDocument();
  });

  it('displays environments for resource', () => {
    render(<ResourceTable {...defaultProps} />);

    const environmentsTag = screen.getByText('AT22');
    expect(environmentsTag).toBeInTheDocument();
  });

  it('navigates to the clicked resource', async () => {
    const user = userEvent.setup();
    render(<ResourceTable {...defaultProps} />);

    const editButton = screen.getByText(
      textMock('resourceadm.dashboard_table_row_edit', { resourceName: resource1Title }),
    );
    await user.click(editButton);

    expect(mockOnClickEditResource).toHaveBeenCalled();
  });

  it('does not display any action if resource cannot be imported or navigated to', () => {
    render(
      <ResourceTable
        {...defaultProps}
        onClickImportResource={undefined}
        list={[mockResourceListItem3]}
      />,
    );

    const editButton = screen.queryByText(
      textMock('resourceadm.dashboard_table_row_edit', { resourceName: resource3Title }),
    );
    const importButton = screen.queryByText(
      textMock('resourceadm.dashboard_table_row_import', { resourceName: resource3Title }),
    );

    expect(editButton).not.toBeInTheDocument();
    expect(importButton).not.toBeInTheDocument();
  });

  it('triggers import when import button is clicked', async () => {
    const user = userEvent.setup();
    render(<ResourceTable {...defaultProps} />);

    const importButton = screen.getByText(
      textMock('resourceadm.dashboard_table_row_import', { resourceName: resource3Title }),
    );
    await user.click(importButton);

    expect(mockOnClickImportResource).toHaveBeenCalled();
  });

  it('should show spinner when importing resource', () => {
    render(<ResourceTable {...defaultProps} importResourceId={mockResourceListItem3.identifier} />);

    const importSpinner = screen.getByText(textMock('resourceadm.dashboard_table_row_importing'));
    expect(importSpinner).toBeInTheDocument();
  });
});
