export class MyPlugin {
  constructor(options) {}

  apply(hooks) {
    hooks.addFilter('template-resolver', 'faustnx', (templates, seedNode) => {
      if (seedNode.uri.includes('testing')) {
        return ['testing', ...templates];
      }

      return templates;
    });
  }
}
