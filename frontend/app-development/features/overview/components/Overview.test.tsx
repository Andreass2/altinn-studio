import React from 'react';
import { screen } from '@testing-library/react';
import { Overview } from './Overview';
import { APP_DEVELOPMENT_BASENAME } from 'app-shared/constants';
import { renderWithProviders } from '../../../test/testUtils';
import { queriesMock } from 'app-development/test/mocks';
import { textMock } from '../../../../testing/mocks/i18nMock';
import { privateRepositoryMock, repositoryMock } from '../../../test/repositoryMock';

// Test data
const org = 'org';
const app = 'app';
const title = 'test';

// Mocking console.error due to Tanstack Query removing custom logger between V4 and v5 see issue: #11692
const realConsole = console;

describe('Overview', () => {
  beforeEach(() => {
    global.console = {
      ...console,
      error: jest.fn(),
    };
  });
  afterEach(() => {
    global.console = realConsole;
    jest.clearAllMocks();
  });
  it('renders component', async () => {
    render({
      getEnvironments: jest.fn().mockImplementation(() => Promise.resolve([])),
      getOrgList: jest.fn().mockImplementation(() => Promise.resolve({ orgs: [org] })),
      getAppConfig: jest.fn().mockImplementation(() =>
        Promise.resolve({
          serviceName: title,
        }),
      ),
      getRepoMetadata: jest.fn().mockImplementation(() => Promise.resolve(repositoryMock)),
    });

    expect(await screen.findByRole('heading', { name: title })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: app })).not.toBeInTheDocument();
  });

  it('should display spinner while loading', () => {
    render();
    expect(screen.getByText(textMock('general.loading')));
  });

  it('should display error message if fetching goes wrong', async () => {
    render({
      getAppConfig: () => Promise.reject(),
      getOrgList: () => Promise.reject(),
    });
    expect(await screen.findByText(textMock('overview.fetch_title_error_message')));
  });

  it('should display AppLogs if environments exist', async () => {
    render({
      getOrgList: jest.fn().mockImplementation(() =>
        Promise.resolve({
          orgs: {
            [org]: {
              environments: ['unit', 'test'],
            },
          },
        }),
      ),
      getRepoMetadata: jest.fn().mockImplementation(() => Promise.resolve(repositoryMock)),
      getDeployments: jest.fn().mockImplementation(() =>
        Promise.resolve({
          results: [
            {
              tagName: '1',
              envName: 'test',
              deployedInEnv: true,
              build: {
                id: '1',
                status: 'completed',
                result: 'succeeded',
                started: '2023-10-03T09:57:31.238Z',
                finished: null,
              },
              created: '2023-10-03T11:57:31.072013+02:00',
              createdBy: 'test',
              app,
              org,
            },
          ],
        }),
      ),
      getEnvironments: jest.fn().mockImplementation(() => Promise.resolve([{}])),
    });
    expect(
      await screen.findByRole('heading', { name: textMock('overview.activity') }),
    ).toBeInTheDocument();
  });

  it('should not display AppLogs if environments do not exist for repo owned by org', async () => {
    render({
      getRepoMetadata: jest.fn().mockImplementation(() => Promise.resolve(repositoryMock)),
      getOrgList: jest.fn().mockImplementation(() =>
        Promise.resolve({
          orgs: {
            [org]: {
              environments: [],
            },
          },
        }),
      ),
      getEnvironments: jest.fn().mockImplementation(() => Promise.resolve([])),
    });
    expect(await screen.findByText(textMock('app_publish.no_env_title'))).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: textMock('overview.activity') }),
    ).not.toBeInTheDocument();
  });

  it('should display RepoOwnedByPersonInfo if repo is not owned by an org', async () => {
    render({
      getOrgList: jest.fn().mockImplementation(() =>
        Promise.resolve({
          orgs: {},
        }),
      ),
      getRepoMetadata: jest.fn().mockImplementation(() => Promise.resolve(privateRepositoryMock)),
    });
    expect(await screen.findByText(textMock('app_publish.private_app_owner'))).toBeInTheDocument();
  });
});

const render = (queries = {}) => {
  return renderWithProviders(<Overview />, {
    startUrl: `${APP_DEVELOPMENT_BASENAME}/${org}/${app}`,
    queries: {
      ...queriesMock,
      ...queries,
    },
  });
};
