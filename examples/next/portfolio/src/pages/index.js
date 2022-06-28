import { getWordPressProps, WordPressTemplate } from 'faust-nx';
import templates from 'wp-templates';
import client from 'client';

export default function Page(props) {
  return <WordPressTemplate templates={templates} {...props} />;
}

export function getStaticProps(ctx) {
  return getWordPressProps({ client, templates, ctx });
}
