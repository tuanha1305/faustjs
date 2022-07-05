import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { WordPressTemplate } from './getWordPressProps';
import { faustNxHooks } from './hooks';

let config = {};

export interface Config {
  client: ApolloClient<NormalizedCacheObject>;
  templates: { [key: string]: WordPressTemplate };
  plugins: unknown[];
}

export function setConfig(_config: Config) {
  config = _config;

  const { plugins } = _config;

  plugins?.forEach((plugin: any) => {
    plugin.apply(faustNxHooks);
  });
}

export function getConfig(): Partial<Config> {
  return config;
}
