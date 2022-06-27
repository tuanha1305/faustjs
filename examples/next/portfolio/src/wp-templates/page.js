import { gql } from '@apollo/client';

const Component = (props) => {
  const { title, content } = props?.data?.page;
  return (
    <>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};

const variables = ({ uri }) => {
  return { uri };
};

const query = gql`
  query GetPage($uri: ID!) {
    page(id: $uri, idType: URI) {
      title
      content
    }
  }
`;

export default { Component, variables, query };
