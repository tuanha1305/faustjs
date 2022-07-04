import {
  Button,
  Footer,
  Header,
  Main,
  SearchInput,
  NavigationMenu,
  SearchResults,
  SEO,
} from 'components';
import * as MENUS from 'constants/menus';
import React, { useState } from 'react';
import styles from 'styles/pages/_Search.module.scss';
import { pageTitle } from 'utils';
import SearchContentNodes from 'client/queries/SearchContentNodes.graphql';
import GeneralSettingsFragment from 'client/fragments/GeneralSettings.graphql';
import { useQuery, gql } from '@apollo/client';
import appConfig from 'app.config';

function Component(props) {
  const [searchQuery, setSearchQuery] = useState('');
  const generalSettings = props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes.filter(n => !Array.isArray(n)) ?? [];
  const footerMenu = props?.data?.footerMenuItems.nodes.filter(n => !Array.isArray(n)) ?? [];

  const { data, error, loading, fetchMore } = useQuery(SearchContentNodes, {
    variables: {
      first: appConfig.postsPerPage,
      after: '',
      skip: searchQuery === '',
      search: searchQuery,
    },
    fetchPolicy: 'network-only',
  });

  return (
    <>
      <SEO title={pageTitle(generalSettings, 'Search')} />

      <Header menuItems={primaryMenu} />

      <Main>
        <div className={styles['search-header-pane']}>
          <div className="container small">
            <h2 className={styles['search-header-text']}>
              {searchQuery && !loading
                ? `Showing results for "${searchQuery}"`
                : `Search`}
            </h2>
            <SearchInput
              value={searchQuery}
              onChange={(newValue) => setSearchQuery(newValue)}
            />
          </div>
        </div>
        <div className="container small">
          {error && (
            <div className="alert-error">
              An error has occurred. Please refresh and try again.
            </div>
          )}

          <SearchResults
            searchResults={data?.contentNodes?.edges?.map(({ node }) => node)}
            isLoading={loading}
          />

          {data?.contentNodes?.pageInfo?.hasNextPage && (
            <div className={styles['load-more']}>
              <Button
                onClick={() => {
                  fetchMore({
                    variables: {
                      after: data?.contentNodes?.pageInfo?.endCursor,
                    },
                  });
                }}
              >
                Load more
              </Button>
            </div>
          )}
        </div>
      </Main>

      <Footer menuItems={footerMenu} />
    </>
  );
}

const variables = ({ uri }) => {
  return { headerLocation: MENUS.PRIMARY_LOCATION, footerLocation: MENUS.FOOTER_LOCATION};
};

const query = gql`
  ${GeneralSettingsFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData($headerLocation: MenuLocationEnum, $footerLocation: MenuLocationEnum) {
    generalSettings {
      ...GeneralSettingsFragment
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

export default { Component, variables, query };
