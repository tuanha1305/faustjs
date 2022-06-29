import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { WordPressTemplate } from './getWordPressProps';

let config = {};

export interface Config {
  client: ApolloClient<NormalizedCacheObject>;
  templates: { [key: string]: WordPressTemplate };
}

export function setConfig(_config: Config) {
  config = _config;
}

export function getConfig(): Partial<Config> {
  return config;
}
