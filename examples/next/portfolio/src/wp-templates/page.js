import { gql } from '@apollo/client';
import {
  SEO,
  Main,
  EntryHeader,
  ContentWrapper
} from 'components';
import { pageTitle } from 'utils';
import GeneralSettingsFragment from 'client/fragments/GeneralSettings.graphql';
import FeaturedImageFragment from 'client/fragments/FeaturedImage.graphql';

const Component = (props) => {
  const { title, content, featuredImage } = props.data.page;
  const generalSettings = props.data.generalSettings;

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

      <Main>
        <EntryHeader title={title} image={featuredImage?.node} />
        <div className="container">
          <ContentWrapper content={content} />
        </div>
      </Main>
    </>
  );
};

const variables = ({ uri }) => {
  return { uri };
};


const query = gql`
  ${GeneralSettingsFragment}
  ${FeaturedImageFragment}
  query GetPageData($uri: ID!, $asPreview: Boolean) {
    page(id: $uri, idType: URI, asPreview: $asPreview) {
      title
      content
      ...FeaturedImageFragment
    }
    generalSettings {
      ...GeneralSettingsFragment
    }
  }
`;

export default { Component, variables, query };
