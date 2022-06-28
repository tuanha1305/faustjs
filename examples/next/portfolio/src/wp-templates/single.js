import { gql } from '@apollo/client';
import * as MENUS from 'constants/menus';
import {
  SEO,
  Main,
  EntryHeader,
  ContentWrapper,
  NavigationMenu,
  Header,
  Footer,
} from 'components';
import { pageTitle } from 'utils';
import GeneralSettingsFragment from 'client/fragments/GeneralSettings.graphql';
import FeaturedImageFragment from 'client/fragments/FeaturedImage.graphql';

const Component = (props) => {
  const { title, content, featuredImage } = props?.data?.post ?? { title: ""};
  const generalSettings = props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems.nodes ?? [];

  return (
    <>
    <SEO
        title={pageTitle(
          generalSettings,
          title,
          generalSettings?.title
        )}
        imageUrl={featuredImage?.node?.sourceUrl}
      />

      <Header menuItems={primaryMenu} />

      <Main>
        <EntryHeader title={title} image={featuredImage?.node} />
        <div className="container">
          <ContentWrapper content={content} />
        </div>
      </Main>

      <Footer menuItems={footerMenu} />
    </>
  );
};

const query = gql`
  ${GeneralSettingsFragment}
  ${FeaturedImageFragment}
  ${NavigationMenu.fragments.entry}
  query GetPostData($uri: ID!, $headerLocation: MenuLocationEnum, $footerLocation: MenuLocationEnum) {
    post(id: $uri, idType: URI) {
      title
      content
      ...FeaturedImageFragment
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

const variables = ({ uri }) => {
  return { uri, headerLocation: MENUS.PRIMARY_LOCATION, footerLocation: MENUS.FOOTER_LOCATION};
};

export default { Component, variables, query };
