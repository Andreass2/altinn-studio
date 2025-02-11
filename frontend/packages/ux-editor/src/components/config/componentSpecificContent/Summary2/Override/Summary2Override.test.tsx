import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { createQueryClientMock } from 'app-shared/mocks/queryClientMock';
import { Summary2Override, type Summary2OverrideProps } from './Summary2Override';
import { QueryKey } from 'app-shared/types/QueryKey';
import { app, org } from '@studio/testing/testids';
import userEvent from '@testing-library/user-event';
import {
  component1IdMock,
  container1IdMock,
  componentWithOptionsMock,
  componentWithMultipleSelectMock,
  layout1NameMock,
  layoutMock,
} from '../../../../../testing/layoutMock';
import { textMock } from '@studio/testing/mocks/i18nMock';
import { layoutSet1NameMock, layoutSetsExtendedMock } from '../../../../../testing/layoutSetsMock';
import { renderWithProviders } from '../../../../../testing/mocks';

const checkBoxId = componentWithOptionsMock.id;
const multipleSelectId = componentWithMultipleSelectMock.id;
const layoutMockWithMultipleSelect = {
  ...layoutMock,
  components: {
    ...layoutMock.components,
    [multipleSelectId]: componentWithMultipleSelectMock,
  },
};

describe('Summary2Override', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to add new override', async () => {
    const user = userEvent.setup();
    render();
    await user.click(addNewOverrideButton());
    expect(defaultProps.onChange).toHaveBeenCalledWith(
      expect.arrayContaining([expect.any(Object)]),
    );
  });

  it('should be able to remove override', async () => {
    render({
      overrides: [{ componentId: '1' }],
    });
    await userEvent.click(overrideCollapsedButton(1));
    await userEvent.click(removeOverrideButton());
    expect(defaultProps.onChange).toHaveBeenCalledWith([]);
  });

  it.each([checkBoxId, multipleSelectId])(
    'should render type options when component is %s',
    async (componentId) => {
      const user = userEvent.setup();
      render({ overrides: [{ componentId }] });

      await user.click(overrideCollapsedButton(1));
      await user.click(overrideTypeSelector());
      expect(renderedTypeOptions()).toBeTruthy();
    },
  );

  it('should not render type selector when component is not multiple select nor checkbox', async () => {
    render({ overrides: [{ componentId: component1IdMock }] });
    await userEvent.click(overrideCollapsedButton(1));

    expect(
      screen.queryByRole('combobox', {
        name: textMock('ux_editor.component_properties.summary.override.display_type'),
      }),
    ).not.toBeInTheDocument();
  });

  it('should be able to change override componentId', async () => {
    const user = userEvent.setup();
    render({ overrides: [{ componentId: '2' }], target: { type: 'layoutSet' } });
    const componentId = component1IdMock;
    await user.click(overrideCollapsedButton(1));
    await user.click(overrideComponentSelect());
    await user.click(
      screen.getByRole('option', {
        name: (content, _) => content.startsWith(componentId),
      }),
    );
    await waitFor(() =>
      expect(defaultProps.onChange).toHaveBeenCalledWith(expect.arrayContaining([{ componentId }])),
    );
  });

  it('should be able to change override hidden', async () => {
    const user = userEvent.setup();
    render({ overrides: [{ componentId: '1', hidden: false }] });
    await user.click(overrideCollapsedButton(1));
    await user.click(
      screen.getByRole('checkbox', {
        name: textMock('ux_editor.component_properties.summary.override.show_component'),
      }),
    );
    await waitFor(() =>
      expect(defaultProps.onChange).toHaveBeenCalledWith(
        expect.arrayContaining([{ componentId: '1', hidden: true }]),
      ),
    );
  });

  it('"isCompact" checkbox should not be checked when isCompact is false', async () => {
    const user = userEvent.setup();
    render({ overrides: [{ componentId: container1IdMock, isCompact: false }] });
    await user.click(overrideCollapsedButton(1));
    const compactCheckbox = screen.getByRole('checkbox', {
      name: textMock('ux_editor.component_properties.summary.override.is_compact'),
    });
    expect(compactCheckbox).toBeInTheDocument();
    expect(compactCheckbox).not.toBeChecked();
    await user.click(compactCheckbox);
    await waitFor(() =>
      expect(defaultProps.onChange).toHaveBeenCalledWith(
        expect.arrayContaining([{ componentId: container1IdMock, isCompact: true }]),
      ),
    );
  });

  it('"isCompact" checkbox should be checked when isCompact is true', async () => {
    const user = userEvent.setup();
    render({ overrides: [{ componentId: container1IdMock, isCompact: true }] });
    await user.click(overrideCollapsedButton(1));
    const compactCheckbox = screen.getByRole('checkbox', {
      name: textMock('ux_editor.component_properties.summary.override.is_compact'),
    });
    expect(compactCheckbox).toBeInTheDocument();
    expect(compactCheckbox).toBeChecked();
    await user.click(compactCheckbox);
    await waitFor(() =>
      expect(defaultProps.onChange).toHaveBeenCalledWith(
        expect.arrayContaining([{ componentId: container1IdMock, isCompact: false }]),
      ),
    );
  });

  it('should be able to override display type when component type is multiple select', async () => {
    const user = userEvent.setup();
    render({ overrides: [{ componentId: multipleSelectId }] });
    await user.click(overrideCollapsedButton(1));
    await user.selectOptions(overrideTypeSelector(), overrideSelectType('string'));

    expect(defaultProps.onChange).toHaveBeenCalledWith(
      expect.arrayContaining([{ componentId: multipleSelectId, displayType: 'string' }]),
    );
  });

  it('should be able to override display type when component type is checkbox', async () => {
    const user = userEvent.setup();
    render({ overrides: [{ componentId: checkBoxId }] });
    await user.click(overrideCollapsedButton(1));
    await user.selectOptions(overrideTypeSelector(), overrideSelectType('string'));

    await waitFor(() =>
      expect(defaultProps.onChange).toHaveBeenCalledWith(
        expect.arrayContaining([{ componentId: checkBoxId, displayType: 'string' }]),
      ),
    );
  });

  it('should collapse and uncollapse override', async () => {
    render({ overrides: [{ componentId: '1' }] });
    await userEvent.click(overrideCollapsedButton(1));
    expect(
      screen.queryByRole('button', {
        name: textMock('ux_editor.component_properties.summary.overrides.nth.*:1}'),
      }),
    ).not.toBeInTheDocument();
    await userEvent.click(overrideCloseButton());
    expect(
      screen.queryByRole('button', {
        name: textMock('ux_editor.component_properties.summary.overrides.nth.*:1}'),
      }),
    ).not.toBeInTheDocument();
  });
});

const overrideCloseButton = () =>
  screen.getByRole('button', {
    name: /general.save/i,
  });

const overrideCollapsedButton = (n: number) =>
  screen.getByRole('button', {
    name: new RegExp(`ux_editor.component_properties.summary.overrides.nth.*:${n}}`),
  });

const addNewOverrideButton = () =>
  screen.getByRole('button', {
    name: textMock('ux_editor.component_properties.summary.add_override'),
  });

const removeOverrideButton = () => screen.getByRole('button', { name: '' });

const overrideComponentSelect = () =>
  screen.getByRole('combobox', {
    name: textMock('ux_editor.component_properties.summary.override.choose_component'),
  });

const overrideTypeSelector = () =>
  screen.getByRole('combobox', {
    name: textMock('ux_editor.component_properties.summary.override.display_type'),
  });

const overrideSelectType = (type: string) =>
  screen.getByRole('option', {
    name: textMock(`ux_editor.component_properties.summary.override.display_type.${type}`),
  });

const renderedTypeOptions = () => {
  const expectedOptions = ['list', 'string'].map((type) =>
    textMock(`ux_editor.component_properties.summary.override.display_type.${type}`),
  );

  const renderedOptions = screen.getAllByRole('option').map((option) => option.textContent);
  return expectedOptions.every((option) => renderedOptions.includes(option));
};

const defaultProps: Summary2OverrideProps = {
  overrides: [],
  target: {},
  onChange: jest.fn(),
};
const render = (props?: Partial<Summary2OverrideProps>) => {
  const queryClient = createQueryClientMock();
  queryClient.setQueryData([QueryKey.FormLayouts, org, app, layoutSet1NameMock], {
    [layout1NameMock]: layoutMockWithMultipleSelect,
  });
  queryClient.setQueryData([QueryKey.LayoutSetsExtended, org, app], layoutSetsExtendedMock);
  renderWithProviders(<Summary2Override {...defaultProps} {...props} />, {
    queryClient,
    appContextProps: {
      selectedFormLayoutSetName: layoutSet1NameMock,
      selectedFormLayoutName: layout1NameMock,
    },
  });
};
