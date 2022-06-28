import { gql } from '@apollo/client';
import * as MENUS from 'constants/menus';
import appConfig from 'app.config';
import React from 'react';
import {
  Posts,
  Header,
  LoadMore,
  EntryHeader,
  NavigationMenu,
  Footer,
  Main,
  SEO,
} from 'components';
import { pageTitle } from 'utils';
import GeneralSettingsFragment from 'client/fragments/GeneralSettings.graphql';
import FeaturedImageFragment from 'client/fragments/FeaturedImage.graphql';

function Component(props) {
  const generalSettings = props?.data?.generalSettings;
  const primaryMenu =
    props?.data?.headerMenuItems?.nodes.filter((n) => !Array.isArray(n)) ?? [];
  const footerMenu =
    props?.data?.footerMenuItems.nodes.filter((n) => !Array.isArray(n)) ?? [];
  const posts = props?.data?.posts.nodes.filter((n) => !Array.isArray(n)) ?? [];
  const pageInfo = props?.data?.posts?.pageInfo;
  return (
    <>
      <SEO title={pageTitle(generalSettings)} />

      <Header menuItems={primaryMenu} />

      <Main>
        <EntryHeader title="Latest Posts" />
        <div className="container">
          <Posts
            posts={posts}
            id="posts-list"
          />
          <LoadMore
            className="text-center"
            endCursor={pageInfo?.endCursor}
            hasNextPage={pageInfo?.hasNextPage}
            isLoading={false}
            fetchMore={() => null}
          />
        </div>
      </Main>

      <Footer menuItems={footerMenu} />
    </>
  );
}

const variables = ({ uri }) => {
  return { uri, first: appConfig.postsPerPage, headerLocation: MENUS.PRIMARY_LOCATION, footerLocation: MENUS.FOOTER_LOCATION};
};

const query = gql`
  ${GeneralSettingsFragment}
  ${FeaturedImageFragment}
  ${NavigationMenu.fragments.entry}
  ${Posts.fragments.entry}
  query GetArchivePage($uri: String!, $first: Int, $headerLocation: MenuLocationEnum, $footerLocation: MenuLocationEnum) {
    nodeByUri(uri: $uri) {
      ... on Category {
        name
      }
    }
    posts(first: $first) {
      nodes {
        ...PostFragment
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
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
