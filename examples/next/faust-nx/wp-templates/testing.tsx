import { gql } from '@apollo/client';

function Component() {
  return <>This page is just for testing</>;
}

const query = gql`
  query {
    generalSettings {
      description
    }
  }
`;

export default { Component, query };
