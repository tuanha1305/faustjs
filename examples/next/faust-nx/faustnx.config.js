import { setConfig } from 'faust-nx';
import client from './client';
import templates from './wp-templates/index';

export default setConfig({
  client,
  templates,
});
