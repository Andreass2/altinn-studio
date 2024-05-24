import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditGrid } from './EditGrid';
import { renderWithMockStore, renderHookWithMockStore } from '../../../../testing/mocks';
import { useLayoutSchemaQuery } from '../../../../hooks/queries/useLayoutSchemaQuery';
import { textMock } from '@studio/testing/mocks/i18nMock';
import { component1Mock } from '../../../../testing/layoutMock';

const waitForData = async () => {
  const layoutSchemaResult = renderHookWithMockStore()(() => useLayoutSchemaQuery())
    .renderHookResult.result;
  await waitFor(() => expect(layoutSchemaResult.current[0].isSuccess).toBe(true));
};

const render = async ({ grid = undefined, handleComponentChange = jest.fn() } = {}) => {
  await waitForData();

  return renderWithMockStore()(
    <EditGrid
      handleComponentChange={handleComponentChange}
      component={{ ...component1Mock, grid }}
    />,
  );
};

describe('EditGrid', () => {
  it('should show grid value 4 on slider for mobile tab when xs: "4" is set on grid on component', async () => {
    await render({ grid: { xs: 4 } });

    const mobileTab = screen.getByRole('tab', {
      name: textMock('ux_editor.modal_properties_grid_size_xs'),
    });
    expect(mobileTab).toHaveAttribute('aria-selected', 'true');

    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveValue('4');
  });

  it('should show slider value equals to grid xs: "2" when switching tab from laptop with grid md: "6"', async () => {
    const user = userEvent.setup();
    await render({ grid: { xs: 2, md: 6 } });

    const sliderMobile = screen.getByRole('slider');
    expect(sliderMobile).toHaveValue('2');

    const laptopTab = screen.getByRole('tab', {
      name: textMock('ux_editor.modal_properties_grid_size_md'),
    });
    expect(laptopTab).toBeInTheDocument();
    expect(laptopTab).toHaveAttribute('aria-selected', 'false');
    await user.click(laptopTab);
    expect(laptopTab).toHaveAttribute('aria-selected', 'true');

    const sliderLaptop = screen.getByRole('slider');
    expect(sliderLaptop).toHaveValue('6');
  });

  it('should show mobile tab as selected when by default', async () => {
    await render({ grid: { xs: 3, md: 4 } });

    const laptopTab = screen.getByRole('tab', {
      name: textMock('ux_editor.modal_properties_grid_size_md'),
    });
    expect(laptopTab).toBeInTheDocument();
    expect(laptopTab).toHaveAttribute('aria-selected', 'false');

    const mobileTab = screen.getByRole('tab', {
      name: textMock('ux_editor.modal_properties_grid_size_xs'),
    });
    expect(mobileTab).toBeInTheDocument();
    expect(mobileTab).toHaveAttribute('aria-selected', 'true');
  });

  it('should call handleComponentChange with grid: xs: 12 when switch is disabled', async () => {
    const user = userEvent.setup();
    const handleComponentChange = jest.fn();
    await render({ handleComponentChange });

    const lockIcon = screen.getByRole('img', { name: 'lockIcon' });
    expect(lockIcon).toBeInTheDocument();

    const switchUseDefault = screen.getByRole('checkbox');

    await user.click(switchUseDefault);

    const lockIconAfterSwitchClick = screen.queryByRole('img', { name: 'lockIcon' });
    expect(lockIconAfterSwitchClick).not.toBeInTheDocument();

    expect(handleComponentChange).toHaveBeenCalledWith({
      ...component1Mock,
      grid: {
        xs: 12,
      },
    });
  });

  it('should call handleComponentChange with grid: xs: 3 when slider is changed', async () => {
    const handleComponentChange = jest.fn();
    await render({ grid: { xs: 12 }, handleComponentChange });

    const slider = screen.getByRole('slider');

    fireEvent.change(slider, { target: { value: '3' } });

    expect(handleComponentChange).toHaveBeenCalledWith({
      ...component1Mock,
      grid: {
        xs: 3,
      },
    });
  });

  it('should call handleComponentChange with new value for xs, but remain original value for md, when slider is changed to "4" for mobile', async () => {
    const handleComponentChange = jest.fn();
    await render({
      grid: { xs: 6, md: 3 },
      handleComponentChange,
    });

    const slider = screen.getByRole('slider');

    fireEvent.change(slider, { target: { value: '4' } });

    expect(handleComponentChange).toHaveBeenCalledWith({
      ...component1Mock,
      grid: {
        xs: 4,
        md: 3,
      },
    });
  });

  it('should call handleComponentChange with original value for md and no value for xs when useDefaultSwitch is enabled', async () => {
    const user = userEvent.setup();
    const handleComponentChange = jest.fn();
    await render({
      grid: { xs: 3, md: 3 },
      handleComponentChange,
    });

    const switchUseDefault = screen.getByRole('checkbox');
    await user.click(switchUseDefault);

    expect(handleComponentChange).toHaveBeenCalledWith({
      ...component1Mock,
      grid: {
        md: 3,
      },
    });
  });

  it('should call handleComponentChange with original value for xs and no value for md when useDefaultSwitch is enabled for laptop tab', async () => {
    const user = userEvent.setup();
    const handleComponentChange = jest.fn();
    await render({
      grid: { xs: 3, md: 3 },
      handleComponentChange,
    });

    const laptopTab = screen.getByRole('tab', {
      name: textMock('ux_editor.modal_properties_grid_size_md'),
    });
    await user.click(laptopTab);

    const switchUseDefault = screen.getByRole('checkbox');

    await user.click(switchUseDefault);

    expect(handleComponentChange).toHaveBeenCalledWith({
      ...component1Mock,
      grid: {
        xs: 3,
      },
    });
  });

  it('should call handleComponentChange with original values for innerGrid and labelGrid when useDefaultSwitch is enabled', async () => {
    const user = userEvent.setup();
    const handleComponentChange = jest.fn();
    await render({
      grid: {
        innerGrid: { xs: 3, md: 3 },
        labelGrid: { xs: 6 },
        xs: 10,
      },
      handleComponentChange,
    });

    const switchUseDefault = screen.getByRole('checkbox');

    await user.click(switchUseDefault);

    expect(handleComponentChange).toHaveBeenCalledWith({
      ...component1Mock,
      grid: {
        innerGrid: { xs: 3, md: 3 },
        labelGrid: { xs: 6 },
      },
    });
  });

  it('should call handleComponentChange with no grid-property when useDefaultSwitch is disabled', async () => {
    const user = userEvent.setup();
    const handleComponentChange = jest.fn();
    await render({
      grid: { xs: 3 },
      handleComponentChange,
    });

    const switchUseDefault = screen.getByRole('checkbox');

    await user.click(switchUseDefault);

    expect(handleComponentChange).toHaveBeenCalledWith(component1Mock);
  });
});
