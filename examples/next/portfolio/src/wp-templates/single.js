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
  const { title, content, featuredImage } = props.data.post;
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

const query = gql`
  ${GeneralSettingsFragment}
  ${FeaturedImageFragment}
  query GetPostData($uri: ID!, $asPreview: Boolean) {
    post(id: $uri, idType: URI, asPreview: $asPreview) {
      title
      content
      ...FeaturedImageFragment
    }
    generalSettings {
      ...GeneralSettingsFragment
    }
  }
`;

const variables = (seedQuery) => {
  console.log(seedQuery);

  return {
    uri: seedQuery.uri,
  };
};

export default { Component, variables, query };
