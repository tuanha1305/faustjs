import { setConfig } from 'faust-nx';
import client from './client';
import templates from './wp-templates/index';
import { MyPlugin } from 'plugins/MyPlugin';

export default setConfig({
  client,
  templates,
  plugins: [new MyPlugin()],
});
