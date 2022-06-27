import { gql } from "@apollo/client";

function Component(props) {
  return <>Archive page</>;
}

const variables = ({ uri }) => {
  return { uri };
};

const query = gql`
  query GetArchivePage($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Category {
        name
      }
    }
  }
`;

export default { Component, variables, query };
