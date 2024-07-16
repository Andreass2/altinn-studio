import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from 'app-development/test/testUtils';
import { APP_DEVELOPMENT_BASENAME } from 'app-shared/constants';
import { News } from './News';
import type { NewsList } from 'app-shared/types/api/NewsList';
import { textMock } from '@studio/testing/mocks/i18nMock';
import type { ServicesContextProps } from 'app-shared/contexts/ServicesContext';

describe('News', () => {
  it('section title is always rendered', async () => {
    const newsList: NewsList = {
      news: [
        {
          title: 'title',
          content: 'content',
          date: '2021-01-01',
        },
      ],
    };
    await render(newsList);

    await screen.findByText('title');
  });
  it('content is rendered when available', async () => {
    const newsList: NewsList = {
      news: [
        {
          title: 'title',
          content: 'News content',
          date: '2021-01-01',
        },
      ],
    };
    await render(newsList);

    await screen.findByText('News content');
  });

  it('loading spinner is shown while waiting for content', async () => {
    const newsList: NewsList = {
      news: [
        {
          title: 'title',
          content: 'News content',
          date: '2021-01-01',
        },
      ],
    };
    render(newsList);

    await screen.findByText(textMock('overview.fetch_news_loading_message'));
  });

  it('does not list a news if the date in the news is in the future', async () => {
    const newsList: NewsList = {
      news: [
        {
          title: 'title',
          content: 'News content',
          date: '3021-01-01',
        },
      ],
    };

    await render(newsList);

    await waitFor(() => {
      screen.queryByText('News content');
    });

    const news = screen.queryByText('News content');
    expect(news).not.toBeInTheDocument();
  });

  it('error message is shown when content fails to load', async () => {
    const newsList: NewsList = {
      news: [
        {
          title: 'title',
          content: 'News content',
          date: '2021-01-01',
        },
      ],
    };
    await render(newsList, {
      getNewsList: jest.fn().mockImplementation(() => Promise.reject()),
    });

    await screen.findByText(textMock('overview.fetch_news_error_message'));
  });
});

const render = async (newsList: NewsList, queries?: Partial<ServicesContextProps>) => {
  return renderWithProviders(<News />, {
    startUrl: `${APP_DEVELOPMENT_BASENAME}/my-org/my-app`,
    queries: {
      getNewsList: jest.fn().mockImplementation(() => Promise.resolve<NewsList>(newsList)),
      ...queries,
    },
  });
};
