import React from 'react';
import { render as rtlRender, screen, waitForElementToBeRemoved } from '@testing-library/react';
import type { AboutTabProps } from './AboutTab';
import { AboutTab } from './AboutTab';
import { textMock } from '@studio/testing/mocks/i18nMock';
import type { AppConfig } from 'app-shared/types/AppConfig';
import userEvent from '@testing-library/user-event';
import { useAppConfigMutation } from 'app-development/hooks/mutations';
import type { QueryClient, UseMutationResult } from '@tanstack/react-query';
import type { ServicesContextProps } from 'app-shared/contexts/ServicesContext';
import { ServicesContextProvider } from 'app-shared/contexts/ServicesContext';
import { createQueryClientMock } from 'app-shared/mocks/queryClientMock';
import { queriesMock } from 'app-shared/mocks/queriesMock';
import { mockRepository1, mockRepository2 } from '../../../mocks/repositoryMock';
import { mockAppConfig } from '../../../mocks/appConfigMock';
import { formatDateToDateAndTimeString } from 'app-development/utils/dateUtils';
import { MemoryRouter } from 'react-router-dom';
import type { ApplicationMetadata } from 'app-shared/types/ApplicationMetadata';
import { app, org } from '@studio/testing/testids';

const mockNewText: string = 'test';

const mockAppMetadata: ApplicationMetadata = {
  id: `${org}/${app}`,
  org,
  createdBy: 'Test Testesen',
};

jest.mock('../../../../../../hooks/mutations/useAppConfigMutation');
const updateAppConfigMutation = jest.fn();
const mockUpdateAppConfigMutation = useAppConfigMutation as jest.MockedFunction<
  typeof useAppConfigMutation
>;
mockUpdateAppConfigMutation.mockReturnValue({
  mutate: updateAppConfigMutation,
} as unknown as UseMutationResult<void, Error, AppConfig, unknown>);

const getAppConfig = jest.fn().mockImplementation(() => Promise.resolve({}));
const getRepoMetadata = jest.fn().mockImplementation(() => Promise.resolve({}));
const getAppMetadata = jest.fn().mockImplementation(() => Promise.resolve({}));

const defaultProps: AboutTabProps = {
  org,
  app,
};

describe('AboutTab', () => {
  afterEach(jest.clearAllMocks);

  it('initially displays the spinner when loading data', () => {
    render();

    expect(screen.getByTitle(textMock('settings_modal.loading_content'))).toBeInTheDocument();
  });

  it('fetches appConfig on mount', () => {
    render();
    expect(getAppConfig).toHaveBeenCalledTimes(1);
  });

  it('fetches repoMetaData on mount', () => {
    render();
    expect(getRepoMetadata).toHaveBeenCalledTimes(1);
  });

  it('fetches applicationMetadata on mount', () => {
    render();
    expect(getAppMetadata).toHaveBeenCalledTimes(1);
  });

  it.each(['getAppConfig', 'getRepoMetadata', 'getAppMetadata'])(
    'shows an error message if an error occured on the %s query',
    async (queryName) => {
      const errorMessage = 'error-message-test';
      render(defaultProps, {
        [queryName]: () => Promise.reject({ message: errorMessage }),
      });

      await waitForElementToBeRemoved(() =>
        screen.queryByTitle(textMock('settings_modal.loading_content')),
      );

      expect(screen.getByText(textMock('general.fetch_error_message'))).toBeInTheDocument();
      expect(screen.getByText(textMock('general.error_message_with_colon'))).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    },
  );

  it('displays the "repo" input as readonly', async () => {
    await resolveAndWaitForSpinnerToDisappear();

    const repoNameInput = screen.getByLabelText(textMock('settings_modal.about_tab_repo_label'));
    expect(repoNameInput).toHaveValue(mockAppConfig.repositoryName);
    expect(repoNameInput).toHaveAttribute('readonly');
  });

  it('displays correct value in "name" input field, and updates the value on change', async () => {
    const user = userEvent.setup();
    await resolveAndWaitForSpinnerToDisappear();

    const appName = screen.getByLabelText(textMock('settings_modal.about_tab_name_label'));
    expect(appName).toHaveValue(mockAppConfig.serviceName);

    await user.type(appName, mockNewText);

    expect(appName).toHaveValue(`${mockAppConfig.serviceName}${mockNewText}`);
  });

  it('displays correct value in "alternative id" input field, and updates the value on change', async () => {
    const user = userEvent.setup();
    await resolveAndWaitForSpinnerToDisappear();

    const altId = screen.getByLabelText(textMock('settings_modal.about_tab_alt_id_label'));
    expect(altId).toHaveValue(mockAppConfig.serviceId);

    await user.type(altId, mockNewText);

    expect(altId).toHaveValue(`${mockAppConfig.serviceId}${mockNewText}`);
  });

  it('should update app config when saving', async () => {
    const user = userEvent.setup();
    await resolveAndWaitForSpinnerToDisappear();

    const altId = screen.getByLabelText(textMock('settings_modal.about_tab_alt_id_label'));
    await user.type(altId, mockNewText);
    await user.tab();

    expect(updateAppConfigMutation).toHaveBeenCalledTimes(1);
  });

  it('displays owners full name when it is set', async () => {
    await resolveAndWaitForSpinnerToDisappear();

    expect(screen.getByText(mockRepository1.owner.full_name)).toBeInTheDocument();
    expect(screen.queryByText(mockRepository1.owner.login)).not.toBeInTheDocument();
  });

  it('displays owners login name when full name is not set', async () => {
    getRepoMetadata.mockImplementation(() => Promise.resolve(mockRepository2));
    render();
    await waitForElementToBeRemoved(() =>
      screen.queryByTitle(textMock('settings_modal.loading_content')),
    );

    expect(screen.queryByText(mockRepository1.owner.full_name)).not.toBeInTheDocument();
    expect(screen.getByText(mockRepository1.owner.login)).toBeInTheDocument();
  });

  it('displays the created date mapped correctly', async () => {
    await resolveAndWaitForSpinnerToDisappear();

    const formatedDateString: string = formatDateToDateAndTimeString(mockRepository1.created_at);

    expect(
      screen.getByText(
        textMock('settings_modal.about_tab_created_date', { date: formatedDateString }),
      ),
    ).toBeInTheDocument();
  });

  it('displays the user that created the app correctly', async () => {
    await resolveAndWaitForSpinnerToDisappear();

    expect(screen.getByText(mockAppMetadata.createdBy)).toBeInTheDocument();
  });
});

const resolveAndWaitForSpinnerToDisappear = async (props: Partial<AboutTabProps> = {}) => {
  getAppConfig.mockImplementation(() => Promise.resolve(mockAppConfig));
  getRepoMetadata.mockImplementation(() => Promise.resolve(mockRepository1));
  getAppMetadata.mockImplementation(() => Promise.resolve(mockAppMetadata));

  render(props);
  await waitForElementToBeRemoved(() =>
    screen.queryByTitle(textMock('settings_modal.loading_content')),
  );
};

const render = (
  props: Partial<AboutTabProps> = {},
  queries: Partial<ServicesContextProps> = {},
  queryClient: QueryClient = createQueryClientMock(),
) => {
  const allQueries: ServicesContextProps = {
    ...queriesMock,
    getAppConfig,
    getRepoMetadata,
    getAppMetadata,
    ...queries,
  };

  return rtlRender(
    <MemoryRouter>
      <ServicesContextProvider {...allQueries} client={queryClient}>
        <AboutTab {...defaultProps} {...props} />
      </ServicesContextProvider>
    </MemoryRouter>,
  );
};
